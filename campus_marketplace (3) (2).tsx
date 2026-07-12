import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, ShoppingBag, Heart, MessageCircle, User, LogOut, Plus, 
  Trash2, Filter, Bell, ShieldAlert, Tag, Clock, Menu, CreditCard,
  ShoppingCart, Check, X, BookOpen, Smartphone, HardDrive, CheckCircle, Edit2, MapPin
} from 'lucide-react';

const CATEGORIES = ['All', 'Textbooks', 'Handwritten Notes', 'Electronics', 'Stationery', 'Papers'];

const INITIAL_PRODUCTS = [
  // --- Textbooks (All ₹125) ---
  { 
    id: 't1', 
    title: 'Database Management Systems (DBMS) - Korth', 
    price: 125, 
    category: 'Textbooks', 
    condition: 'Like New', 
    description: 'Essential textbook for Database Management Systems. Covers ER diagrams, normalization, SQL, and indexing schemes.', 
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u2',
    sellerAddress: 'Satpura Hostel, Room 304',
    status: 'active',
    createdAt: new Date(Date.now() - 36000000).toISOString()
  },
  { 
    id: 't2', 
    title: 'Java: The Complete Reference (11th Edition)', 
    price: 125, 
    category: 'Textbooks', 
    condition: 'Good', 
    description: 'Perfect for learning object-oriented programming concepts in Java. Includes multithreading, collections framework, and OOPs basics.', 
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  { 
    id: 't3', 
    title: 'C Programming Language - Brian Kernighan', 
    price: 125, 
    category: 'Textbooks', 
    condition: 'New', 
    description: 'The definitive guide to ANSI standard C programming. Recommended for first-year fundamentals classes.', 
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u3',
    sellerAddress: 'Karakoram Hostel, Room 102',
    status: 'active',
    createdAt: new Date(Date.now() - 120000000).toISOString()
  },
  { 
    id: 't4', 
    title: 'C++ Object Oriented Programming - E. Balagurusamy', 
    price: 125, 
    category: 'Textbooks', 
    condition: 'Good', 
    description: 'Excellent text for mastering object-oriented paradigms in C++. Covers classes, polymorphism, inheritance, and templates.', 
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u2',
    sellerAddress: 'Satpura Hostel, Room 304',
    status: 'active',
    createdAt: new Date(Date.now() - 200000000).toISOString()
  },
  { 
    id: 't5', 
    title: 'Software Engineering: A Practitioner\'s Approach', 
    price: 125, 
    category: 'Textbooks', 
    condition: 'Like New', 
    description: 'Covers agile methodologies, SDLC lifecycles, project scheduling, software testing, and quality assurance frameworks.', 
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u4',
    sellerAddress: 'Nilgiri Girls Hostel, Annex 3',
    status: 'active',
    createdAt: new Date(Date.now() - 150000000).toISOString()
  },
  { 
    id: 't6', 
    title: 'Engineering Mathematics - I (Calculus & Matrices)', 
    price: 125, 
    category: 'Textbooks', 
    condition: 'Fair', 
    description: 'First year core syllabus book covering vector calculus, matrices, differential equations, and multiple integrals.', 
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date(Date.now() - 300000000).toISOString()
  },
  { 
    id: 't7', 
    title: 'Advanced Discrete Mathematics (4th Year Syllabus)', 
    price: 125, 
    category: 'Textbooks', 
    condition: 'Good', 
    description: 'Essential for final year analysis. Topics include graph theory, algebraic structures, combinatorics, and logic systems.', 
    image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u3',
    sellerAddress: 'Karakoram Hostel, Room 102',
    status: 'active',
    createdAt: new Date(Date.now() - 400000000).toISOString()
  },

  // --- Handwritten Notes (All ₹100) ---
  { 
    id: 'n1', 
    title: 'DBMS Handwritten Running Notes', 
    price: 100, 
    category: 'Handwritten Notes', 
    condition: 'Good', 
    description: 'Clean, handwritten lecture notes with illustrated SQL query syntax, transaction schedules, and normalization shortcuts.', 
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  { 
    id: 'n2', 
    title: 'Java Programming Classroom Notes', 
    price: 100, 
    category: 'Handwritten Notes', 
    condition: 'Like New', 
    description: 'Scribbled conceptual flows, memory allocation layout diagram (heap vs stack), exception hierarchies, and solved test papers.', 
    image: 'https://images.unsplash.com/photo-1585862705423-f3c5520891d4?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1585862705423-f3c5520891d4?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u2',
    sellerAddress: 'Satpura Hostel, Room 304',
    status: 'active',
    createdAt: new Date(Date.now() - 18000000).toISOString()
  },
  { 
    id: 'n3', 
    title: 'C Basics Handwritten Reference Notes', 
    price: 100, 
    category: 'Handwritten Notes', 
    condition: 'Good', 
    description: 'Point-by-point summary of pointers, structures, unions, dynamic memory allocation, and common code-tracing exam problems.', 
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u3',
    sellerAddress: 'Karakoram Hostel, Room 102',
    status: 'active',
    createdAt: new Date(Date.now() - 24000000).toISOString()
  },
  { 
    id: 'n4', 
    title: 'C++ Object Oriented Notes (With Examples)', 
    price: 100, 
    category: 'Handwritten Notes', 
    condition: 'Good', 
    description: 'Simplified explanations of runtime polymorphism, virtual functions, abstract classes, and constructor chaining.', 
    image: 'https://images.unsplash.com/photo-1522881451255-f59a836f1b12?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1522881451255-f59a836f1b12?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u4',
    sellerAddress: 'Nilgiri Girls Hostel, Annex 3',
    status: 'active',
    createdAt: new Date(Date.now() - 72000000).toISOString()
  },
  { 
    id: 'n5', 
    title: 'Software Engineering Model Running Notes', 
    price: 100, 
    category: 'Handwritten Notes', 
    condition: 'Like New', 
    description: 'Diagrams of UML Use-Cases, Sequence diagrams, and brief summaries of design patterns for rapid exam revisions.', 
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u2',
    sellerAddress: 'Satpura Hostel, Room 304',
    status: 'active',
    createdAt: new Date(Date.now() - 90000000).toISOString()
  },
  { 
    id: 'n6', 
    title: 'Engineering Mathematics Hand-Solved Papers', 
    price: 100, 
    category: 'Handwritten Notes', 
    condition: 'Good', 
    description: 'Step-by-step solutions to last 5 years semester examinations. Includes Laplace transformations and Fourier series.', 
    image: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date(Date.now() - 100000000).toISOString()
  },
  { 
    id: 'n7', 
    title: 'Advanced Discrete Structures Quick-Revision Notes', 
    price: 100, 
    category: 'Handwritten Notes', 
    condition: 'New', 
    description: 'Condensed 40-page notes detailing group code mechanisms, recurrence relations, and graph isomorphism theorems.', 
    image: 'https://images.unsplash.com/photo-1509228627154-ffe9f939e623?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1509228627154-ffe9f939e623?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u3',
    sellerAddress: 'Karakoram Hostel, Room 102',
    status: 'active',
    createdAt: new Date(Date.now() - 140000000).toISOString()
  },

  // --- Electronics (Standardized to ₹200 average, mouse to ₹155) ---
  { 
    id: 'e1', 
    title: 'Casio fx-991EX ClassWiz Scientific Calculator', 
    price: 200, 
    category: 'Electronics', 
    condition: 'Like New', 
    description: 'Original Casio scientific calculator with 552 functions. Solar + Battery backup, recommended for engineers.', 
    image: 'Screenshot 2026-07-12 162749.jpg', // References user file verbatim
    images: [
      'Screenshot 2026-07-12 162749.jpg'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date(Date.now() - 40000000).toISOString()
  },
  { 
    id: 'e2', 
    title: 'Logitech Pebble Silent Wireless Mouse', 
    price: 155, // Configured to exactly ₹155
    category: 'Electronics', 
    condition: 'New', 
    description: 'Sleek, lightweight bluetooth mouse. Low power consumption, completely noiseless buttons.', 
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u2',
    sellerAddress: 'Satpura Hostel, Room 304',
    status: 'active',
    createdAt: new Date(Date.now() - 60000000).toISOString()
  },
  { 
    id: 'e3', 
    title: 'Boat Rockerz 450 On-Ear Headphones', 
    price: 200, // Reduced to ₹200
    category: 'Electronics', 
    condition: 'Good', 
    description: 'Superb sound with 15 hours battery backup. Minor scratch on the head adjustment band.', 
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u3',
    sellerAddress: 'Karakoram Hostel, Room 102',
    status: 'active',
    createdAt: new Date(Date.now() - 95000000).toISOString()
  },
  { 
    id: 'e4', 
    title: 'Sandisk 64GB OTG Dual Drive Type-C', 
    price: 200, // Reduced to ₹200
    category: 'Electronics', 
    condition: 'Like New', 
    description: 'Transfer code files seamlessly between phone and laptop with dual USB and Type-C interfaces.', 
    image: 'https://images.unsplash.com/photo-1618420177247-49f390d402ce?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1618420177247-49f390d402ce?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date(Date.now() - 110000000).toISOString()
  },
  { 
    id: 'e5', 
    title: 'Heatsink Laptop Cooling Pad with Multi-LEDs', 
    price: 200, // Reduced to ₹200
    category: 'Electronics', 
    condition: 'Fair', 
    description: 'Keeps intense programming & compiling sessions stable. Built-in dual USB loop and 4 speed fans.', 
    image: 'https://images.unsplash.com/photo-1628003666324-42b78b61cff9?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1628003666324-42b78b61cff9?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u4',
    sellerAddress: 'Nilgiri Girls Hostel, Annex 3',
    status: 'active',
    createdAt: new Date(Date.now() - 150000000).toISOString()
  },

  // --- Stationery (pens, pencils, painting colours, sketches, A4sheets, files) ---
  { 
    id: 's1', 
    title: 'Classmate Octane Quick-Dry Gel Pens (Pack of 10)', 
    price: 90, 
    category: 'Stationery', 
    condition: 'New', 
    description: 'Unmatched smooth writing with waterproof ink technology. Includes 5 blue and 5 black gel pens.', 
    image: 'https://images.unsplash.com/photo-1585336139080-b019d77a339b?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1585336139080-b019d77a339b?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u2',
    sellerAddress: 'Satpura Hostel, Room 304',
    status: 'active',
    createdAt: new Date(Date.now() - 40000000).toISOString()
  },
  { 
    id: 's2', 
    title: 'Apsara Platinum Extra Dark Writing Pencils (Pack of 10)', 
    price: 45, 
    category: 'Stationery', 
    condition: 'New', 
    description: 'Strong break-resistant graphite core. Comes with an eraser and high-carbon sharpener block.', 
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u4',
    sellerAddress: 'Nilgiri Girls Hostel, Annex 3',
    status: 'active',
    createdAt: new Date(Date.now() - 50000000).toISOString()
  },
  { 
    id: 's3', 
    title: 'Camel Artists Acrylic Painting Colours (Set of 12)', 
    price: 240, 
    category: 'Stationery', 
    condition: 'New', 
    description: 'Premium quick dry artistic acrylic color tubes. Offers rich pigments and great coverage on canvas & boards.', 
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date(Date.now() - 60000000).toISOString()
  },
  { 
    id: 's4', 
    title: 'Faber-Castell Connector Sketch Pens (25 Shades)', 
    price: 110, 
    category: 'Stationery', 
    condition: 'Like New', 
    description: 'Bright coloring markers featuring unique connector caps. Completely washable food-grade ink.', 
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u3',
    sellerAddress: 'Karakoram Hostel, Room 102',
    status: 'active',
    createdAt: new Date(Date.now() - 75000000).toISOString()
  },
  { 
    id: 's5', 
    title: 'JK Copier Premium A4 sheets Bundle (500 sheets)', 
    price: 299, 
    category: 'Stationery', 
    condition: 'New', 
    description: 'Premium quality 75 GSM paper designed for high speed dual side photocopying & semester draft projects.', 
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date(Date.now() - 95000000).toISOString()
  },
  { 
    id: 's6', 
    title: 'Solo Polypropylene Ring Binder Presentation Files', 
    price: 120, 
    category: 'Stationery', 
    condition: 'Good', 
    description: 'Strong O-ring mechanics with clear inside folders. Keeps assignment drafts and labs organized safely.', 
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u4',
    sellerAddress: 'Nilgiri Girls Hostel, Annex 3',
    status: 'active',
    createdAt: new Date(Date.now() - 110000000).toISOString()
  },

  // --- Papers (All ₹150; Previous Exam papers & Research papers) ---
  { 
    id: 'pa1', 
    title: 'Previous Sem Exam Papers: Physics (1st-4th Year Set)', 
    price: 150, 
    category: 'Papers', 
    condition: 'Good', 
    description: 'Bound set of terminal and mid-semester college exam papers for first-year, second-year, third-year, and fourth-year Physics courses.', 
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u2',
    sellerAddress: 'Satpura Hostel, Room 304',
    status: 'active',
    createdAt: new Date(Date.now() - 12000000).toISOString()
  },
  { 
    id: 'pa2', 
    title: 'Previous Sem Exam Papers: Chemistry (1st-4th Year Set)', 
    price: 150, 
    category: 'Papers', 
    condition: 'Like New', 
    description: 'Subject-wise chemistry terminal semester question bank papers spanning four academic cycles. Includes lab assessment trends.', 
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date(Date.now() - 18000000).toISOString()
  },
  { 
    id: 'pa3', 
    title: 'Previous Sem Exam Papers: Mathematics (1st-4th Year Set)', 
    price: 150, 
    category: 'Papers', 
    condition: 'Good', 
    description: 'All 8 semesters of advanced calculus, linear algebra, vector calculus, and stats solutions papers compiled by batch toppers.', 
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u3',
    sellerAddress: 'Karakoram Hostel, Room 102',
    status: 'active',
    createdAt: new Date(Date.now() - 32000000).toISOString()
  },
  { 
    id: 'pa4', 
    title: 'DBMS & Data Mining Previous Sem Papers', 
    price: 150, 
    category: 'Papers', 
    condition: 'Like New', 
    description: 'Exhaustive SQL injection, indexing schemes, data warehousing, and decision tree exam keys from the past 5 academic batches.', 
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u4',
    sellerAddress: 'Nilgiri Girls Hostel, Annex 3',
    status: 'active',
    createdAt: new Date(Date.now() - 48000000).toISOString()
  },
  { 
    id: 'pa5', 
    title: 'DLDCO & Software Engineering Exam Papers', 
    price: 150, 
    category: 'Papers', 
    condition: 'Good', 
    description: 'Digital Logic Design & Computer Organization paired with Agile software engineering questions papers and answer outlines.', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u2',
    sellerAddress: 'Satpura Hostel, Room 304',
    status: 'active',
    createdAt: new Date(Date.now() - 65000000).toISOString()
  },
  { 
    id: 'pa6', 
    title: 'C, C++ & Java Coding Exam Previous Papers', 
    price: 150, 
    category: 'Papers', 
    condition: 'New', 
    description: 'Compilation of system design programming prompts, traces, compilation error debugging sheets used in previous midterms.', 
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u1',
    sellerAddress: 'Aravali Hostel, Block B-12',
    status: 'active',
    createdAt: new Date(Date.now() - 85000000).toISOString()
  },
  { 
    id: 'pa7', 
    title: 'Advanced Java Semester Question Compilation', 
    price: 150, 
    category: 'Papers', 
    condition: 'New', 
    description: 'Spring framework, Hibernate ORM, JSP Servlets and REST API structures previous exams. Highly rated for final year placements.', 
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u3',
    sellerAddress: 'Karakoram Hostel, Room 102',
    status: 'active',
    createdAt: new Date(Date.now() - 105000000).toISOString()
  },
  { 
    id: 'pa8', 
    title: 'IEEE Blockchain Consensus Protocols Research Paper', 
    price: 150, 
    category: 'Papers', 
    condition: 'New', 
    description: 'An authoritative study printed copy detailing latency trade-offs in distributed ledger architectures. Ideal reference for minor projects.', 
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'u4',
    sellerAddress: 'Nilgiri Girls Hostel, Annex 3',
    status: 'active',
    createdAt: new Date(Date.now() - 120000000).toISOString()
  }
];

const INITIAL_USERS = [
  { id: 'u1', name: 'Alex Patel', email: 'alex@college.edu', password: 'password123', role: 'student', department: 'Computer Science', year: '3rd Year', phone: '+91 9876543210', address: 'Aravali Hostel, Block B-12', blocked: false },
  { id: 'u2', name: 'Sarah Sharma', email: 'sarah@college.edu', password: 'password123', role: 'seller', department: 'Electronics', year: '4th Year', phone: '+91 9123456789', address: 'Satpura Hostel, Room 304', blocked: false },
  { id: 'u3', name: 'Rohan Gupta', email: 'rohan@college.edu', password: 'password123', role: 'student', department: 'Mechanical', year: '2nd Year', phone: '+91 8887776665', address: 'Karakoram Hostel, Room 102', blocked: false },
  { id: 'u4', name: 'Divya Iyer', email: 'divya@college.edu', password: 'password123', role: 'seller', department: 'Civil Engineering', year: '3rd Year', phone: '+91 7776665554', address: 'Nilgiri Girls Hostel, Annex 3', blocked: false },
  { id: 'admin1', name: 'Prof. Sharma (Admin)', email: 'admin@college.edu', password: 'admin', role: 'admin', department: 'Administration', year: 'N/A', phone: 'N/A', address: 'Staff Quarters Block D-1', blocked: false },
];

const INITIAL_CHATS = [
  { id: 'c1', participants: ['u1', 'u2'], productId: 't1', messages: [
    { senderId: 'u1', text: 'Hey, is the DBMS textbook still available at ₹125?', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { senderId: 'u2', text: 'Yes, it is! Let\'s meet in front of the Central Library during lunchtime.', timestamp: new Date(Date.now() - 1800000).toISOString() }
  ]}
];

const INITIAL_NOTIFICATIONS = [
  { id: 'notif1', text: 'Rohan Gupta marked interest in your Java Reference Book!', read: false, time: '10m ago' },
  { id: 'notif2', text: 'Your listing "DBMS Handwritten Running Notes" has been approved.', read: false, time: '1h ago' },
  { id: 'notif3', text: 'New login detected from a Chrome Browser.', read: true, time: '1d ago' }
];

export default function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  // Defaulting to null so user MUST log in first to access the platform.
  const [currentUser, setCurrentUser] = useState(null); 
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [wishlist, setWishlist] = useState(['t2', 'e1']);
  const [cart, setCart] = useState([]);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Separation state: Buyer Option / Seller Option separately
  const [activeMode, setActiveMode] = useState('buyer'); // 'buyer' or 'seller'

  // Navigation & Details
  const [currentPage, setCurrentPage] = useState('auth'); 
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  
  // Filters & Search
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState(6000); 

  // Checkout inputs
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [checkoutData, setCheckoutData] = useState({ upi: '', name: '', cardNum: '', expiry: '', cvv: '', buyerMeetupAddress: '' });
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Gallery Active Image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Custom alert/confirmation state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [modalConfirm, setModalConfirm] = useState({ show: false, title: '', message: '', onConfirm: null });

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const showConfirmModal = (title, message, onConfirm) => {
    setModalConfirm({ show: true, title, message, onConfirm });
  };

  const closeConfirmModal = () => {
    setModalConfirm({ show: false, title: '', message: '', onConfirm: null });
  };

  // Helper getters
  const getUser = (id) => users.find(u => u.id === id);
  const getProduct = (id) => products.find(p => p.id === id);

  const navigate = (page, params = {}) => {
    // Auth gate check
    if (!currentUser && page !== 'auth') {
      setCurrentPage('auth');
      triggerToast('Please log in or register to access the marketplace!', 'warning');
      return;
    }

    if (params.productId) {
      setSelectedProductId(params.productId);
      setActiveImageIndex(0); 
    }
    if (params.chatId) setSelectedChatId(params.chatId);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate('auth');
      return;
    }
    if (product.status === 'sold') {
      triggerToast('This item has been sold!', 'warning');
      return;
    }
    if (!cart.some(item => item.id === product.id)) {
      setCart([...cart, product]);
      triggerToast(`"${product.title}" added to cart!`, 'success');
    } else {
      triggerToast('Item is already in your cart!', 'info');
    }
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate('auth');
      return;
    }
    if (product.status === 'sold') {
      triggerToast('This item has been sold!', 'warning');
      return;
    }
    if (!cart.some(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
    setCheckoutData(prev => ({ ...prev, buyerMeetupAddress: currentUser.address || '' }));
    navigate('checkout');
  };

  const handleToggleWishlist = (e, productId) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate('auth');
      return;
    }
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      triggerToast('Removed from Watchlist.', 'info');
    } else {
      setWishlist([...wishlist, productId]);
      const targetP = getProduct(productId);
      const newNotif = {
        id: 'notif-' + Date.now(),
        text: `You bookmarked: "${targetP?.title}"!`,
        read: false,
        time: 'Just now'
      };
      setNotifications([newNotif, ...notifications]);
      triggerToast('Saved to your Watchlist!', 'success');
    }
  };

  // --- FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (search) {
      result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    }
    
    if (categoryFilter !== 'All') {
      result = result.filter(p => p.category === categoryFilter);
    }

    result = result.filter(p => p.price <= priceRange);
    
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [products, search, categoryFilter, sortBy, priceRange]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    const toggleReadNotifs = () => {
      setShowNotifications(!showNotifications);
      if (!showNotifications) {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
      }
    };

    return (
      <nav className="bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate(currentUser ? 'market' : 'auth')}>
              <ShoppingBag className="h-8 w-8 mr-2 text-yellow-400" />
              <span className="font-extrabold text-2xl tracking-tight">CampusMart</span>
            </div>

            {/* SEPARATE BUYER & SELLER GLOBAL OPTIONS */}
            {currentUser && (
              <div className="hidden lg:flex items-center bg-blue-900/40 rounded-xl p-1 my-2 mx-4 border border-blue-600/40">
                <button 
                  onClick={() => {
                    setActiveMode('buyer');
                    triggerToast('Switched to Buyer Mode!', 'info');
                    navigate('market');
                  }}
                  className={`px-4 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeMode === 'buyer' ? 'bg-yellow-400 text-blue-950 shadow' : 'text-blue-100 hover:text-white'}`}
                >
                  <ShoppingCart className="h-3.5 w-3.5" /> Buyer Option
                </button>
                <button 
                  onClick={() => {
                    setActiveMode('seller');
                    triggerToast('Switched to Seller Mode!', 'info');
                    navigate('listings');
                  }}
                  className={`px-4 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeMode === 'seller' ? 'bg-indigo-600 text-white shadow' : 'text-blue-100 hover:text-white'}`}
                >
                  <Tag className="h-3.5 w-3.5" /> Seller Option
                </button>
              </div>
            )}
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 font-medium">
              {currentUser ? (
                <>
                  {activeMode === 'buyer' ? (
                    <>
                      <button onClick={() => navigate('market')} className="hover:text-yellow-300 transition text-sm">Marketplace</button>
                      <button onClick={() => navigate('wishlist')} className="relative hover:text-yellow-300 transition">
                        <Heart className="h-5 w-5" />
                        {wishlist.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{wishlist.length}</span>
                        )}
                      </button>
                      <button onClick={() => navigate('chat')} className="hover:text-yellow-300 transition">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                      <button onClick={() => navigate('cart')} className="relative hover:text-yellow-300 transition flex items-center gap-1 bg-blue-900/40 px-3 py-1.5 rounded-lg">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="text-sm font-bold">₹{cartTotal}</span>
                        {cart.length > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-blue-900 text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-extrabold">{cart.length}</span>
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => navigate('listings')} className="hover:text-yellow-300 transition text-sm">My Listings</button>
                      <button onClick={() => navigate('add')} className="flex items-center bg-green-600 hover:bg-green-500 px-3 py-1.5 rounded-lg transition text-sm">
                        <Plus className="h-4 w-4 mr-1" /> Post New Resource
                      </button>
                    </>
                  )}
                  
                  {/* Notifications Bell */}
                  <div className="relative">
                    <button onClick={toggleReadNotifs} className="relative p-1.5 hover:text-yellow-300 transition">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold font-sans">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50">
                        <div className="flex justify-between items-center px-4 py-2 border-b">
                          <span className="font-extrabold text-sm text-gray-900">Notifications</span>
                          <button onClick={() => setNotifications([])} className="text-xs text-red-500 hover:underline">Clear All</button>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <p className="text-center text-xs text-gray-400 py-6">No new notifications</p>
                          ) : (
                            notifications.map(notif => (
                              <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex justify-between items-start">
                                <p className="text-xs text-gray-700 leading-tight pr-2">{notif.text}</p>
                                <span className="text-[10px] text-gray-400 shrink-0">{notif.time}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {currentUser.role === 'admin' && (
                    <button onClick={() => navigate('admin')} className="text-red-300 hover:text-red-100 transition flex items-center gap-1 text-sm bg-red-950/40 px-2 py-1 rounded">
                      <ShieldAlert className="h-4 w-4" /> Admin
                    </button>
                  )}
                  <div className="flex items-center space-x-2 bg-blue-900/60 px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-950 transition" onClick={() => navigate('profile')}>
                    <User className="h-4 w-4 text-yellow-300" />
                    <span className="text-sm font-semibold">{currentUser.name.split(' ')[0]}</span>
                  </div>
                </>
              ) : (
                <button onClick={() => navigate('auth')} className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 px-4 py-1.5 rounded-lg font-bold transition">Sign In</button>
              )}
            </div>

            {/* Mobile menu icon */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 hover:text-yellow-300">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        {mobileOpen && (
          <div className="md:hidden bg-blue-900 px-4 pt-2 pb-4 space-y-2 border-t border-blue-800">
            {currentUser && (
              <div className="flex justify-around bg-blue-950/40 p-2 rounded-lg my-1">
                <button 
                  onClick={() => { setActiveMode('buyer'); navigate('market'); setMobileOpen(false); }}
                  className={`px-3 py-1 rounded text-xs font-bold ${activeMode === 'buyer' ? 'bg-yellow-400 text-blue-950' : 'text-white'}`}
                >
                  Buyer Mode
                </button>
                <button 
                  onClick={() => { setActiveMode('seller'); navigate('listings'); setMobileOpen(false); }}
                  className={`px-3 py-1 rounded text-xs font-bold ${activeMode === 'seller' ? 'bg-indigo-600 text-white' : 'text-white'}`}
                >
                  Seller Mode
                </button>
              </div>
            )}
            {currentUser ? (
              <>
                <button onClick={() => { navigate('market'); setMobileOpen(false); }} className="block w-full text-left py-2 hover:text-yellow-300">Marketplace</button>
                <button onClick={() => { navigate('add'); setMobileOpen(false); }} className="block w-full text-left py-2 hover:text-yellow-300">Sell Item</button>
                <button onClick={() => { navigate('wishlist'); setMobileOpen(false); }} className="block w-full text-left py-2 hover:text-yellow-300">My Wishlist ({wishlist.length})</button>
                <button onClick={() => { navigate('chat'); setMobileOpen(false); }} className="block w-full text-left py-2 hover:text-yellow-300">Messages</button>
                <button onClick={() => { navigate('cart'); setMobileOpen(false); }} className="block w-full text-left py-2 hover:text-yellow-300">My Cart ({cart.length}) - ₹{cartTotal}</button>
                <button onClick={() => { navigate('profile'); setMobileOpen(false); }} className="block w-full text-left py-2 hover:text-yellow-300">Profile & Listings</button>
                {currentUser.role === 'admin' && (
                  <button onClick={() => { navigate('admin'); setMobileOpen(false); }} className="block w-full text-left py-2 text-red-300">Admin Panel</button>
                )}
                <button onClick={() => { setCurrentUser(null); navigate('auth'); setMobileOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">Logout</button>
              </>
            ) : (
              <button onClick={() => { navigate('auth'); setMobileOpen(false); }} className="block w-full text-left py-2 bg-yellow-500 text-blue-950 font-bold rounded-lg text-center font-bold">Login / Register</button>
            )}
          </div>
        )}
      </nav>
    );
  };

  const Toast = () => {
    if (!toast.show) return null;
    const bgColors = {
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-500 text-slate-900',
      error: 'bg-red-600 text-white',
      info: 'bg-blue-600 text-white'
    };
    return (
      <div className="fixed bottom-5 right-5 z-50 flex items-center p-4 rounded-xl shadow-2xl transition-all duration-300 max-w-sm">
        <div className={`flex items-center space-x-3 rounded-xl p-3 shadow-lg ${bgColors[toast.type] || bgColors.success}`}>
          <span className="text-sm font-bold">{toast.message}</span>
          <button onClick={() => setToast(prev => ({ ...prev, show: false }))}>
            <X className="h-4 w-4 hover:scale-110" />
          </button>
        </div>
      </div>
    );
  };

  const ConfirmModal = () => {
    if (!modalConfirm.show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
        <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full border border-gray-100">
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">{modalConfirm.title}</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{modalConfirm.message}</p>
          <div className="flex gap-3 justify-end">
            <button 
              onClick={closeConfirmModal}
              className="px-4 py-2 text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                modalConfirm.onConfirm();
                closeConfirmModal();
              }}
              className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition shadow"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('Computer Science');
    const [year, setYear] = useState('3rd Year');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState(''); 

    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (isLogin) {
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (found) {
          if (found.blocked) {
            triggerToast('Your account is blocked by the college admin!', 'error');
            return;
          }
          setCurrentUser(found);
          triggerToast(`Welcome back, ${found.name}!`, 'success');
          // Automatically set active option based on account roles or choice
          setActiveMode(found.role === 'seller' ? 'seller' : 'buyer');
          navigate('market');
        } else {
          triggerToast('Invalid credentials! Try Demo: alex@college.edu / password123', 'error');
        }
      } else {
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          triggerToast('This email is already registered!', 'warning');
          return;
        }

        const newUser = { 
          id: 'u' + (users.length + 1), 
          name, 
          email, 
          password, 
          role, 
          department, 
          year, 
          phone: phone || '+91 9876543210', 
          address: address || 'Main Campus Hostel, Block C',
          blocked: false 
        };
        
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        setActiveMode(role === 'seller' ? 'seller' : 'buyer');
        triggerToast(`Account created successfully! Welcome ${name}.`, 'success');
        navigate('market');
      }
    };

    const loadDemoAccount = (demoEmail, demoPass) => {
      setEmail(demoEmail);
      setPassword(demoPass);
      triggerToast('Demo account autofilled! Click Sign In.', 'info');
    };

    return (
      <div className="max-w-4xl mx-auto my-12 px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-sans">
        {/* Intro Banner */}
        <div className="md:col-span-5 space-y-6 text-slate-800">
          <div className="bg-blue-600/10 p-6 rounded-3xl border border-blue-100">
            <span className="bg-blue-600 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-full">College Specific</span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-3 leading-tight font-serif">Exclusively for Campus Exchanges</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Verify your college credentials to buy and sell textbooks at fixed ₹125 rates, running study notes at ₹100, exam/research papers at ₹150, and other electronics inside hostels.
            </p>
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Quick Access Demo Accounts</h4>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => loadDemoAccount('alex@college.edu', 'password123')}
                className="bg-white border text-xs text-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition"
              >
                Alex (Student)
              </button>
              <button 
                onClick={() => loadDemoAccount('sarah@college.edu', 'password123')}
                className="bg-white border text-xs text-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition"
              >
                Sarah (Seller)
              </button>
              <button 
                onClick={() => loadDemoAccount('admin@college.edu', 'admin')}
                className="bg-red-50 border border-red-100 text-xs text-red-700 px-3 py-1.5 rounded-xl hover:bg-red-100/50 transition font-bold"
              >
                College Admin
              </button>
            </div>
          </div>
        </div>

        {/* Auth form */}
        <div className="md:col-span-7 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-blue-700 text-white p-6 text-center">
            <h2 className="text-2xl font-black">
              {isLogin ? 'Sign In to CampusMart' : 'Create Campus Account'}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {isLogin ? 'Enter your college credential profile' : 'Set up your student profile and meetup address'}
            </p>
          </div>
          
          <form onSubmit={handleFormSubmit} className="p-8 space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Student Name</label>
                    <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Alex Patel" className="w-full border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Phone</label>
                    <input required type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
                    <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full border rounded-xl p-2.5 outline-none text-sm">
                      <option>Computer Science</option>
                      <option>Electronics</option>
                      <option>Mechanical</option>
                      <option>Civil Engineering</option>
                      <option>Information Tech</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Academic Year</label>
                    <select value={year} onChange={e => setYear(e.target.value)} className="w-full border rounded-xl p-2.5 outline-none text-sm">
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>PostGrad</option>
                    </select>
                  </div>
                </div>

                {/* Meetup/Delivery Address field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-500" /> Default Meetup / Delivery Address
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={address} 
                    onChange={e => setAddress(e.target.value)} 
                    placeholder="e.g. Satpura Hostel, Room 304 or Girls Hostel B-Block, Room 12" 
                    className="w-full border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  />
                  <span className="text-[10px] text-gray-400">This serves as your main exchange point for peer-to-peer delivery meetups.</span>
                </div>

                {/* Buyer / Seller separate signup options */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Account Focus</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button type="button" onClick={() => setRole('student')} className={`py-2 rounded-xl border font-bold text-xs ${role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200'}`}>Buyer Option</button>
                    <button type="button" onClick={() => setRole('seller')} className={`py-2 rounded-xl border font-bold text-xs ${role === 'seller' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200'}`}>Seller Option</button>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">College Email Address</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="yourname@college.edu" className="w-full border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Account Secret Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>

            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-3.5 rounded-2xl transition mt-4 shadow-md">
              {isLogin ? 'Sign In Instantly' : 'Verify & Register Profile'}
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              {isLogin ? "Need a college trader account?" : "Already verified with college directory?"} {' '}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-700 font-bold hover:underline">
                {isLogin ? 'Register Here' : 'Login Here'}
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  };

  const Marketplace = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-blue-950 to-indigo-900 rounded-3xl text-white p-8 md:p-12 mb-8 shadow-md relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight font-serif">Verified Campus Depot</h1>
            <p className="text-blue-100 text-sm md:text-base mb-6">Trade textbooks at ₹125, handwritten notes at ₹100, previous terminal sem/research papers at ₹150, and tools directly with campus mates inside hostels.</p>
            <div className="flex gap-4">
              <button onClick={() => setCategoryFilter('Textbooks')} className="bg-yellow-400 text-blue-950 hover:bg-yellow-300 font-bold px-6 py-2.5 rounded-full transition text-sm">Browse Textbooks</button>
              <button onClick={() => setCategoryFilter('Handwritten Notes')} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-full border border-white/20 transition text-sm">Handwritten Notes</button>
            </div>
          </div>
          <div className="hidden lg:block absolute right-12 bottom-0 top-0 w-96 opacity-10">
            <ShoppingBag className="w-full h-full text-white" />
          </div>
        </div>

        {/* Filters and Search Header */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          {/* Search bar */}
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search Subject name (DBMS, Java, Physics, Casio...) or hostels..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="absolute left-3.5 top-3.5 text-gray-400 h-5 w-5" />
          </div>

          {/* Dynamic Price Range Slider */}
          <div className="flex-1 min-w-[200px] flex flex-col justify-center px-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Max Budget: <b>₹{priceRange}</b></span>
              <span>₹6,000 Cap</span>
            </div>
            <input 
              type="range" 
              min="40" 
              max="6000" 
              step="10"
              value={priceRange} 
              onChange={e => setPriceRange(Number(e.target.value))}
              className="w-full accent-blue-700 cursor-pointer"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 flex items-center gap-1"><Filter className="h-4 w-4"/> Sort</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border rounded-xl p-3 bg-white outline-none text-sm">
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategoryFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition whitespace-nowrap ${categoryFilter === cat ? 'bg-blue-700 text-white shadow-sm' : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-55'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(p => {
            const isNote = p.category === 'Handwritten Notes';
            const isBook = p.category === 'Textbooks';
            const isPaper = p.category === 'Papers';
            const isSold = p.status === 'sold';
            const sellerInfo = getUser(p.sellerId);
            
            return (
              <div 
                key={p.id} 
                onClick={() => navigate('product', { productId: p.id })}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between relative"
              >
                {/* Sold Overlay Banner */}
                {isSold && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <span className="bg-red-600 text-white font-extrabold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transform -rotate-12 shadow">
                      Sold Out
                    </span>
                  </div>
                )}

                {/* Product Image Panel */}
                <div className="relative h-48 bg-gray-50 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Category badging */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-blue-800 uppercase shadow-sm">
                    {p.category}
                  </div>

                  {/* Wishlist toggle */}
                  <button 
                    onClick={(e) => handleToggleWishlist(e, p.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition z-20"
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(p.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                  </button>

                  {/* Fixed Pricing Highlights */}
                  {isBook && (
                    <div className="absolute bottom-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Fixed Textbook Price
                    </div>
                  )}
                  {isNote && (
                    <div className="absolute bottom-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Fixed Notes Price
                    </div>
                  )}
                  {isPaper && (
                    <div className="absolute bottom-3 right-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Fixed Paper Price
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition line-clamp-2 h-10 text-[14px]">{p.title}</h3>
                    
                    {/* Seller Address Pickup Preview */}
                    <div className="flex items-center text-[11px] text-gray-500 mt-2 gap-1 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span className="truncate">Pickup: <b>{p.sellerAddress || sellerInfo?.address || 'Main Campus'}</b></span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        Condition: {p.condition}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-50">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-xl font-extrabold text-gray-900">₹{p.price}</span>
                      {isBook && <span className="text-[10px] text-gray-400 font-sans">Fixed ₹125</span>}
                      {isNote && <span className="text-[10px] text-gray-400 font-sans">Fixed ₹100</span>}
                      {isPaper && <span className="text-[10px] text-gray-400 font-sans">Fixed ₹150</span>}
                    </div>

                    {/* Quick Add/Buy Controls */}
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        disabled={isSold}
                        onClick={(e) => handleAddToCart(e, p)}
                        className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-blue-950 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" /> Cart
                      </button>
                      <button 
                        disabled={isSold}
                        onClick={(e) => handleBuyNow(e, p)}
                        className="bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white py-2 rounded-xl text-xs font-bold transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state view */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm mt-6">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800">No matching items found</h3>
            <p className="text-gray-500 mt-1 max-w-sm mx-auto text-xs">We couldn't find anything matching your filters or search keywords. Try adjusting the budget or checking the spelling.</p>
          </div>
        )}
      </div>
    );
  };

  const ProductDetails = () => {
    const product = getProduct(selectedProductId);
    if (!product) return <div className="p-8 text-center text-red-500">Product not found.</div>;

    const seller = getUser(product.sellerId);
    const isOwner = currentUser?.id === product.sellerId;
    const isNote = product.category === 'Handwritten Notes';
    const isBook = product.category === 'Textbooks';
    const isPaper = product.category === 'Papers';
    const isSold = product.status === 'sold';

    const imagesList = product.images || [product.image];

    const handleMessageClick = () => {
      // Find or create chat
      let exist = chats.find(c => c.productId === product.id && c.participants.includes(currentUser.id));
      if (!exist) {
        const newChat = {
          id: 'c' + Date.now(),
          participants: [currentUser.id, product.sellerId],
          productId: product.id,
          messages: [{ senderId: currentUser.id, text: `Hello! Is this "${product.title}" still available to pick up from your address "${product.sellerAddress || seller?.address}"?`, timestamp: new Date().toISOString() }]
        };
        setChats([...chats, newChat]);
        navigate('chat', { chatId: newChat.id });
        triggerToast('Initiated negotiation chat with seller!', 'info');
      } else {
        navigate('chat', { chatId: exist.id });
      }
    };

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
        <button onClick={() => navigate('market')} className="text-blue-700 font-bold hover:underline mb-6 inline-flex items-center gap-1 text-sm">&larr; Back to Marketplace</button>
        
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Image Switcher Gallery */}
          <div className="relative bg-gray-50 flex flex-col items-center justify-between p-6">
            <div className="w-full flex justify-center items-center h-80 relative">
              <img src={imagesList[activeImageIndex]} alt={product.title} className="max-h-full max-w-full object-contain rounded-2xl shadow" />
              {isSold && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
                  <span className="bg-red-600 text-white font-extrabold px-6 py-2 rounded-full text-lg uppercase tracking-widest shadow">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Gallery Thumbnail Row */}
            {imagesList.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto py-2">
                {imagesList.map((imgUrl, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImageIndex(idx)} 
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${activeImageIndex === idx ? 'border-blue-700 ring-2 ring-blue-100' : 'border-transparent'}`}
                  >
                    <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
            
            <div className="absolute top-4 left-4 bg-blue-700 text-white font-extrabold px-3 py-1.5 rounded-full text-xs uppercase tracking-wider">
              {product.category}
            </div>
          </div>

          {/* Right: Content details */}
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight font-serif">{product.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">Condition: {product.condition}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3"/> Posted {new Date(product.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>

              <div className="text-3xl font-black text-gray-900 flex items-center gap-2">
                ₹{product.price}
                {isBook && <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded font-normal font-sans">Fixed Textbook Rate</span>}
                {isNote && <span className="text-xs bg-green-100 text-green-800 px-2.5 py-0.5 rounded font-normal font-sans">Standard Note Rate</span>}
                {isPaper && <span className="text-xs bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded font-normal font-sans">Fixed Paper Rate</span>}
              </div>

              {/* SELLER PICKUP ADDRESS DISPLAY */}
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Seller Meetup Address</h4>
                  <p className="text-sm text-slate-900 font-semibold mt-0.5">{product.sellerAddress || seller?.address || 'Main Campus'}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Meet the seller at this designated location for inspection and physical exchange.</p>
                </div>
              </div>

              <div className="border-t pt-3">
                <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-1">Product Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>

              {/* Seller profile overview */}
              {seller && (
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-blue-700 text-white font-black rounded-full flex items-center justify-center shadow">
                      {seller.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{seller.name}</p>
                      <p className="text-[10px] text-gray-500">{seller.department} • {seller.year}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">Verified Student</span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-3 mt-6">
              {!isOwner ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      disabled={isSold}
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-40 text-blue-950 font-bold py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow"
                    >
                      <ShoppingCart className="h-5 w-5" /> Add to Cart
                    </button>
                    <button 
                      disabled={isSold}
                      onClick={(e) => handleBuyNow(e, product)}
                      className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white font-bold py-3.5 rounded-2xl transition shadow"
                    >
                      Buy Now
                    </button>
                  </div>
                  
                  <button 
                    disabled={isSold}
                    onClick={handleMessageClick}
                    className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-55 disabled:opacity-40 font-bold py-3 rounded-2xl transition flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="h-4.5 w-4.5 text-blue-700" /> Chat & Coordinate Meetup
                  </button>
                </>
              ) : (
                <div className="bg-yellow-50 border border-yellow-100 p-3.5 rounded-xl text-yellow-800 text-xs text-center">
                  <p className="mb-2">This is your listing.</p>
                  <button onClick={() => navigate('listings')} className="bg-yellow-500 text-yellow-950 font-bold text-xs px-4 py-1.5 rounded hover:bg-yellow-400 transition">
                    Manage from listings dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartPage = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
        <h1 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2 font-serif"><ShoppingCart className="text-yellow-500" /> Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <ShoppingCart className="h-14 w-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800">Your Cart is empty</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto text-xs">Explore textbooks, handwritten running notes, or tools and add items to your cart to checkout securely.</p>
            <button onClick={() => navigate('market')} className="mt-6 bg-blue-700 text-white font-bold px-6 py-2 rounded-full transition text-sm">Browse Items</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart list panel */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl border" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs line-clamp-1">{item.title}</h3>
                      <p className="text-[10px] text-blue-600 font-bold">{item.category}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Seller: {getUser(item.sellerId)?.name || 'Campus Student'}</p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-0.5 mt-0.5">
                        <MapPin className="h-3 w-3 text-red-500" /> {item.sellerAddress || 'Satpura Hostel'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-base text-gray-900">₹{item.price}</span>
                    <button 
                      onClick={() => {
                        setCart(cart.filter(c => c.id !== item.id));
                        triggerToast('Item removed from cart.', 'info');
                      }} 
                      className="p-2 text-red-500 hover:bg-red-55 rounded-xl transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary calculations card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md h-fit">
              <h3 className="font-bold text-base text-gray-900 mb-4 pb-2 border-b">Order Summary</h3>
              
              <div className="space-y-3 text-xs text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Total Items ({cart.length})</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Escrow Fee</span>
                  <span className="text-green-600 font-bold">₹0 (Free)</span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 pt-3 border-t">
                  <span>Total Payable</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setCheckoutData(prev => ({ ...prev, buyerMeetupAddress: currentUser?.address || '' }));
                  navigate('checkout');
                }}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-2xl transition flex items-center justify-center gap-2 shadow text-sm"
              >
                <CreditCard className="h-4 w-4" /> Proceed to Pay
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CheckoutPage = () => {
    const handlePaySubmit = (e) => {
      e.preventDefault();
      if (!checkoutData.buyerMeetupAddress.trim()) {
        triggerToast('Please provide your Delivery Meetup Address!', 'warning');
        return;
      }
      setOrderSuccess(true);
      triggerToast('Simulated campus escrow transaction successfully verified!', 'success');
    };

    if (orderSuccess) {
      return (
        <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-gray-100 p-8 shadow-xl text-center font-sans">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 animate-pulse">
            <Check className="h-10 w-10 stroke-[3]" />
          </div>
          <h2 className="text-xl font-black text-gray-900 font-serif">Payment Succeeded!</h2>
          <p className="text-gray-500 text-xs mt-2">
            Your secure deposit of <span className="font-bold text-gray-800">₹{cartTotal}</span> was verified. The seller has been alerted of your physical transaction request.
          </p>
          
          <div className="bg-slate-50 p-4 rounded-2xl my-6 text-left text-xs space-y-2 text-gray-600 border">
            <p><span className="font-semibold text-gray-800">Order Ref:</span> CM-TX-{Date.now()}</p>
            <p><span className="font-semibold text-gray-800">Escrow Status:</span> Funds Locked Safe</p>
            <p className="flex items-start gap-1">
              <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
              <span>
                <span className="font-semibold text-gray-800">Delivery Meetup Address:</span><br/>
                {checkoutData.buyerMeetupAddress || currentUser?.address || 'Main Campus Lobby'}
              </span>
            </p>
            <p className="text-[10px] text-blue-600 mt-2 font-medium">Please meet up with corresponding sellers inside their hostel rooms or the campus library to complete the physical resource exchange.</p>
          </div>

          <button 
            onClick={() => {
              setCart([]);
              setOrderSuccess(false);
              navigate('market');
            }}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-2xl transition text-sm"
          >
            Continue Browsing
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-xl mx-auto px-4 py-8 font-sans">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2 font-serif"><CreditCard className="text-blue-700" /> Secure Escrow Payment</h2>
          
          <div className="bg-blue-50 p-4 rounded-2xl mb-6">
            <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase">Order Value</span>
            <div className="text-2xl font-black text-blue-900 mt-0.5">₹{cartTotal}</div>
            <p className="text-[10px] text-blue-700 mt-1">Funds are protected securely inside student escrow contracts and are only released upon physical hand-over verification.</p>
          </div>

          <form onSubmit={handlePaySubmit} className="space-y-4">
            {/* BUYER MEETING DELIVERY ADDRESS IN CHECKOUT */}
            <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl">
              <label className="block text-xs font-bold text-amber-900 uppercase mb-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-red-500" /> Confirm Delivery Meetup Address
              </label>
              <input 
                required 
                type="text" 
                placeholder="Confirm hostel room, library desk, or campus spot..." 
                value={checkoutData.buyerMeetupAddress}
                onChange={e => setCheckoutData({...checkoutData, buyerMeetupAddress: e.target.value})}
                className="w-full border border-amber-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              />
              <p className="text-[10px] text-amber-700 mt-1">Specify precisely where the physical pickup or meeting should take place (defaults to your registered address).</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 ${paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-55'}`}
                >
                  BHIM / UPI Apps
                </button>
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-55'}`}
                >
                  Credit / Debit Card
                </button>
              </div>
            </div>

            {paymentMethod === 'upi' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">UPI Address (VPA)</label>
                <input 
                  required 
                  type="text" 
                  placeholder="yourname@upi" 
                  value={checkoutData.upi}
                  onChange={e => setCheckoutData({...checkoutData, upi: e.target.value})}
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <p className="text-[10px] text-gray-400 mt-1">Supports GPay, PhonePe, Paytm, and BHIM accounts.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Card Holder Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Alex Patel" 
                    value={checkoutData.name}
                    onChange={e => setCheckoutData({...checkoutData, name: e.target.value})}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Card Number</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="4321 0987 6543 2109" 
                    value={checkoutData.cardNum}
                    onChange={e => setCheckoutData({...checkoutData, cardNum: e.target.value})}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expiry Date</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="MM/YY" 
                      value={checkoutData.expiry}
                      onChange={e => setCheckoutData({...checkoutData, expiry: e.target.value})}
                      className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">CVV Security Code</label>
                    <input 
                      required 
                      type="password" 
                      placeholder="•••" 
                      maxLength="3"
                      value={checkoutData.cvv}
                      onChange={e => setCheckoutData({...checkoutData, cvv: e.target.value})}
                      className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3.5 rounded-2xl transition mt-4 shadow-md text-sm">
              Lock Escrow Payment (₹{cartTotal})
            </button>
          </form>
        </div>
      </div>
    );
  };

  const AddProductPage = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Textbooks');
    const [condition, setCondition] = useState('Good');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [sellerAddress, setSellerAddress] = useState(currentUser?.address || ''); 

    const handleImgChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const r = new FileReader();
        r.onloadend = () => setImageLink(r.result);
        r.readAsDataURL(file);
      }
    };

    const handlePostSubmit = (e) => {
      e.preventDefault();
      
      let actualPrice = Number(price);
      if (category === 'Textbooks') {
        actualPrice = 125;
      } else if (category === 'Handwritten Notes') {
        actualPrice = 100;
      } else if (category === 'Papers') {
        actualPrice = 150;
      }

      const newP = {
        id: 'p' + Date.now(),
        title,
        price: actualPrice,
        category,
        condition,
        description,
        image: imageLink || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
        images: [imageLink || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'],
        sellerId: currentUser.id,
        sellerAddress: sellerAddress || currentUser.address || 'Main Campus Lobby',
        status: 'active',
        createdAt: new Date().toISOString()
      };

      setProducts([newP, ...products]);
      triggerToast(`Successfully listed! Price regulated to ₹${actualPrice} for Category: ${category}`, 'success');
      navigate('listings');
    };

    return (
      <div className="max-w-xl mx-auto px-4 py-8 font-sans">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 font-serif">List Your College Resource</h2>
          
          <form onSubmit={handlePostSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Category</label>
              <select value={category} onChange={e => {
                setCategory(e.target.value);
                // Pre-populate forced prices
                if (e.target.value === 'Textbooks') setPrice('125');
                else if (e.target.value === 'Handwritten Notes') setPrice('100');
                else if (e.target.value === 'Papers') setPrice('150');
              }} className="w-full border rounded-xl p-3 outline-none text-sm">
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Product Title / Subject Name</label>
              <input required type="text" placeholder="e.g. DBMS Textbook - Korth (5th Edition)" value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price (INR)</label>
              <input 
                required 
                type="number" 
                value={category === 'Textbooks' ? '125' : category === 'Handwritten Notes' ? '100' : category === 'Papers' ? '150' : price} 
                disabled={category === 'Textbooks' || category === 'Handwritten Notes' || category === 'Papers'}
                onChange={e => setPrice(e.target.value)}
                className="w-full border rounded-xl p-3 outline-none bg-gray-50 disabled:bg-gray-100 cursor-not-allowed font-extrabold text-blue-900 text-sm" 
              />
              <span className="text-[10px] text-gray-400 mt-1 block font-sans">
                {category === 'Textbooks' ? 'Locked at fixed standard price of ₹125' : category === 'Handwritten Notes' ? 'Locked at fixed standard price of ₹100' : category === 'Papers' ? 'Locked at fixed standard price of ₹150' : 'Set custom price in INR'}
              </span>
            </div>

            {/* SELLER MEETUP ADDRESS FIELD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-red-500" /> Preferred Pickup/Seller Address
              </label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Satpura Hostel, Room 304 or CSE Lab Annex" 
                value={sellerAddress} 
                onChange={e => setSellerAddress(e.target.value)} 
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
              />
              <span className="text-[10px] text-gray-400">Specify exactly where buyers can meet you to inspect and pick up the item.</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Condition Status</label>
                <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full border rounded-xl p-3 outline-none text-sm">
                  <option>New</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Attach Product Image</label>
                <input type="file" accept="image/*" onChange={handleImgChange} className="w-full border rounded-xl p-2 text-xs" />
              </div>
            </div>

            {imageLink && (
              <div className="border rounded-xl p-2 bg-gray-50 flex items-center justify-center">
                <img src={imageLink} alt="Upload preview" className="max-h-32 rounded-lg" />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description & Meetup Preferences</label>
              <textarea required rows="3" placeholder="List details such as chapter coverage, author details, or preferred hostel meeting times..." value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"></textarea>
            </div>

            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-3.5 rounded-2xl transition shadow-md text-sm">
              Publish Listing Instantly
            </button>
          </form>
        </div>
      </div>
    );
  };

  const ChatPage = () => {
    const myChats = chats.filter(c => c.participants.includes(currentUser?.id));
    const active = myChats.find(c => c.id === selectedChatId) || myChats[0];
    const [msgTxt, setMsgTxt] = useState('');

    const sendMsg = (e) => {
      e.preventDefault();
      if (!msgTxt.trim() || !active) return;
      const updated = {
        ...active,
        messages: [...active.messages, { senderId: currentUser.id, text: msgTxt, timestamp: new Date().toISOString() }]
      };
      setChats(chats.map(c => c.id === active.id ? updated : c));
      setMsgTxt('');
    };

    if (myChats.length === 0) {
      return (
        <div className="max-w-2xl mx-auto py-16 text-center font-sans">
          <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700">No active student negotiations</h2>
          <p className="text-gray-500 mt-2 text-xs">Chat threads are initiated when you contact product sellers.</p>
        </div>
      );
    }

    const otherUser = getUser(active?.participants.find(id => id !== currentUser.id));
    const linkedP = getProduct(active?.productId);

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-140px)] flex gap-4 font-sans">
        {/* Chat sidebar threads */}
        <div className="w-1/3 bg-white border rounded-2xl overflow-y-auto hidden md:block">
          <h3 className="p-4 font-extrabold border-b text-gray-800 bg-gray-50 text-sm">Active Threads</h3>
          {myChats.map(c => {
            const op = getUser(c.participants.find(id => id !== currentUser.id));
            const lp = getProduct(c.productId);
            return (
              <div key={c.id} onClick={() => setSelectedChatId(c.id)} className={`p-4 border-b cursor-pointer transition ${active?.id === c.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <p className="font-bold text-xs text-slate-800">{op?.name}</p>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">{lp?.title}</p>
              </div>
            );
          })}
        </div>

        {/* Message Panel */}
        <div className="flex-1 bg-white border rounded-2xl flex flex-col justify-between overflow-hidden">
          {active && (
            <>
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{otherUser?.name}</h4>
                  <p className="text-[11px] text-blue-700 font-semibold cursor-pointer" onClick={() => navigate('product', { productId: linkedP?.id })}>Linked: {linkedP?.title}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="h-3 w-3 text-red-500" />
                  <span className="font-semibold text-[10px] bg-slate-200/60 px-2 py-0.5 rounded-full">{otherUser?.address || 'Campus Hostel'}</span>
                </div>
              </div>

              {/* Chat Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50 font-sans">
                {active.messages.map((m, i) => {
                  const isMe = m.senderId === currentUser.id;
                  return (
                    <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 max-w-[70%] rounded-2xl ${isMe ? 'bg-blue-700 text-white rounded-tr-none' : 'bg-white border text-gray-800 rounded-tl-none'}`}>
                        <p className="text-xs leading-relaxed">{m.text}</p>
                        <span className="text-[9px] opacity-60 block text-right mt-1">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input field */}
              <form onSubmit={sendMsg} className="p-4 border-t flex gap-2 bg-white">
                <input required type="text" placeholder="Agree on hostel pickup room or study area meetup..." value={msgTxt} onChange={e => setMsgTxt(e.target.value)} className="flex-1 border rounded-xl px-4 py-2 outline-none text-xs" />
                <button type="submit" className="bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-xs">Send</button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  };

  const ProfilePage = () => {
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState(currentUser?.name || '');
    const [editedDept, setEditedDept] = useState(currentUser?.department || '');
    const [editedYear, setEditedYear] = useState(currentUser?.year || '');
    const [editedPhone, setEditedPhone] = useState(currentUser?.phone || '');
    const [editedAddress, setEditedAddress] = useState(currentUser?.address || ''); 

    const saveProfileInfo = (e) => {
      e.preventDefault();
      const updatedUserList = users.map(u => u.id === currentUser.id ? {
        ...u,
        name: editedName,
        department: editedDept,
        year: editedYear,
        phone: editedPhone,
        address: editedAddress
      } : u);
      
      setUsers(updatedUserList);
      setCurrentUser({
        ...currentUser,
        name: editedName,
        department: editedDept,
        year: editedYear,
        phone: editedPhone,
        address: editedAddress
      });
      setEditMode(false);
      triggerToast('College profile and meetup address successfully updated!', 'success');
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
        <div className="bg-white rounded-3xl border border-gray-100 shadow p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-700 text-white font-black text-2xl rounded-full flex items-center justify-center shadow-md">
                {currentUser?.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 font-serif">{currentUser?.name}</h2>
                <p className="text-gray-500 text-sm">{currentUser?.email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded font-semibold border">{currentUser?.department}</span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded font-semibold">{currentUser?.year}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditMode(!editMode)} className="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-xl text-sm transition flex items-center gap-1.5 hover:bg-blue-100">
                <Edit2 className="h-4 w-4" /> Edit Profile
              </button>
              <button 
                onClick={() => {
                  showConfirmModal(
                    'Confirm Logout',
                    'Are you sure you want to log out of the Campus Marketplace?',
                    () => {
                      setCurrentUser(null);
                      navigate('auth');
                      triggerToast('Successfully logged out.', 'info');
                    }
                  );
                }} 
                className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2 rounded-xl text-sm transition flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>

          {editMode ? (
            <form onSubmit={saveProfileInfo} className="mt-6 space-y-4 max-w-lg">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-slate-700">Edit College Credentials & Pickup</h3>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Full Student Name</label>
                <input required type="text" value={editedName} onChange={e => setEditedName(e.target.value)} className="w-full border rounded-xl p-2 text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Department Branch</label>
                  <input required type="text" value={editedDept} onChange={e => setEditedDept(e.target.value)} className="w-full border rounded-xl p-2 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Current Academic Year</label>
                  <input required type="text" value={editedYear} onChange={e => setEditedYear(e.target.value)} className="w-full border rounded-xl p-2 text-sm outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Mobile Number (Meetups)</label>
                <input required type="text" value={editedPhone} onChange={e => setEditedPhone(e.target.value)} className="w-full border rounded-xl p-2 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-red-500" /> Default Meetup / Delivery Address
                </label>
                <input required type="text" value={editedAddress} onChange={e => setEditedAddress(e.target.value)} className="w-full border rounded-xl p-2 text-sm outline-none" />
              </div>
              <div className="flex gap-2.5 pt-2">
                <button type="submit" className="bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-800 transition">Save Updates</button>
                <button type="button" onClick={() => setEditMode(false)} className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="mt-6 bg-slate-50 border border-slate-100 p-5 rounded-2xl max-w-xl space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Student Identity Card</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
                <p><b>Verified Phone:</b> {currentUser?.phone || '+91 XXXXX XXXXX'}</p>
                <p><b>College Code ID:</b> CMS-{currentUser?.id.toUpperCase()}-2026</p>
                <p className="flex items-start gap-1 col-span-2">
                  <MapPin className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                  <span><b>Registered Hostel Pickup/Delivery Spot:</b> {currentUser?.address || 'Aravali Hostel Block B'}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Manager Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div onClick={() => navigate('listings')} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow transition">
            <h3 className="font-bold text-sm mb-1 uppercase tracking-wider text-slate-700">My Selling Submissions</h3>
            <p className="text-gray-500 text-xs">Review performance, pickup addresses, and live statuses of your listings.</p>
          </div>
          <div onClick={() => navigate('wishlist')} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow transition">
            <h3 className="font-bold text-sm mb-1 uppercase tracking-wider text-slate-700">My Watchlist Items</h3>
            <p className="text-gray-500 text-xs">Quick shortcuts to textbooks or running note threads you plan to get.</p>
          </div>
        </div>
      </div>
    );
  };

  const ListingsPage = () => {
    const myProducts = products.filter(p => p.sellerId === currentUser?.id);

    const markAsSold = (id) => {
      setProducts(products.map(p => p.id === id ? { ...p, status: 'sold' } : p));
      triggerToast('Item marked as sold out!', 'success');
    };

    const deleteProduct = (id) => {
      showConfirmModal(
        'Delete Listing',
        'Are you sure you want to permanently delete this listing from the database?',
        () => {
          setProducts(products.filter(p => p.id !== id));
          triggerToast('Listing successfully deleted.', 'info');
        }
      );
    };

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 font-serif">My Selling Dashboard</h1>
        
        {myProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 mb-4">You haven\'t listed any items yet.</p>
            <button onClick={() => navigate('add')} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Sell an Item</button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myProducts.map(product => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          <div className="text-sm text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 max-w-[200px] truncate">
                      {product.sellerAddress || 'Main Campus Lobby'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold font-sans">₹{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {product.status === 'active' && (
                        <button onClick={() => markAsSold(product.id)} className="text-blue-600 hover:text-blue-950 font-bold text-xs bg-blue-50 px-2.5 py-1 rounded-lg">Mark Sold</button>
                      )}
                      <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-950 p-1 bg-red-50 rounded-lg inline-flex"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const WishlistPage = () => {
    const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center font-serif">
          <Heart className="h-6 w-6 mr-2 text-red-500" /> My Watchlist
        </h1>
        {wishlistedProducts.length === 0 ? (
           <p className="text-gray-500">Your watchlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistedProducts.map(product => (
               <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <img src={product.image} className="h-40 w-full object-cover cursor-pointer" onClick={() => navigate('product', { productId: product.id })} alt={product.title} />
                    <div className="p-4 flex-1">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{product.title}</h3>
                      <p className="text-blue-600 font-bold mt-1 text-sm font-sans">₹{product.price}</p>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex gap-2">
                     <button onClick={() => navigate('product', { productId: product.id })} className="flex-1 bg-blue-600 text-white py-1.5 rounded text-xs font-medium">View details</button>
                     <button onClick={() => {
                       setWishlist(wishlist.filter(id => id !== product.id));
                       triggerToast('Removed from Watchlist.', 'info');
                     }} className="px-3 bg-gray-100 text-gray-600 rounded hover:bg-gray-250">
                       <Trash2 className="h-4 w-4" />
                     </button>
                  </div>
               </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const AdminPage = () => {
    const blockUser = (userId) => {
      setUsers(users.map(u => u.id === userId ? { ...u, blocked: !u.blocked } : u));
      triggerToast('Student directory access updated.', 'info');
    };

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2 font-serif">
            <ShieldAlert className="text-red-600" /> Admin Moderation Panel
          </h1>
          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">College Staff Escrow Security</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 border-b pb-2 mb-4 text-xs uppercase tracking-wider">College Directory ({users.length})</h3>
            <div className="space-y-3">
              {users.map(u => (
                <div key={u.id} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-bold text-slate-800">{u.name} {u.blocked && <span className="text-[10px] text-red-500">(Blocked)</span>}</p>
                    <p className="text-[10px] text-gray-400">{u.email}</p>
                    <p className="text-[9px] text-slate-500 italic">{u.address || 'No Address'}</p>
                  </div>
                  {u.id !== currentUser?.id && (
                    <button 
                      onClick={() => blockUser(u.id)} 
                      className={`text-[9px] font-bold px-2 py-1 rounded uppercase transition ${u.blocked ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {u.blocked ? 'Unblock' : 'Block'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-5 shadow-sm lg:col-span-2">
            <h3 className="font-bold text-gray-800 border-b pb-2 mb-4 text-xs uppercase tracking-wider">Moderate Platform Listings ({products.length})</h3>
            <div className="space-y-3">
              {products.map(p => (
                <div key={p.id} className="flex justify-between items-center text-xs p-3 border rounded-xl bg-white">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-10 h-10 object-cover rounded-lg" alt={p.title} />
                    <div>
                      <p className="font-bold line-clamp-1">{p.title}</p>
                      <p className="text-[10px] text-blue-700 font-extrabold font-sans">₹{p.price} • {p.category}</p>
                      <p className="text-[9px] text-slate-400">Pickup: {p.sellerAddress}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      showConfirmModal(
                        'Force Remove Listing',
                        `Are you sure you want to moderate and permanently delete "${p.title}" from the marketplace database?`,
                        () => {
                          setProducts(products.filter(item => item.id !== p.id));
                          triggerToast('Listing successfully deleted by college administrator!', 'success');
                        }
                      );
                    }} 
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'market': return <Marketplace />;
      case 'product': return <ProductDetails />;
      case 'add': return <AddProductPage />;
      case 'listings': return <ListingsPage />;
      case 'wishlist': return <WishlistPage />;
      case 'cart': return <CartPage />;
      case 'checkout': return <CheckoutPage />;
      case 'chat': return <ChatPage />;
      case 'profile': return <ProfilePage />;
      case 'admin': return <AdminPage />;
      case 'auth': return <AuthPage />;
      default: return <AuthPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-grow">
        {renderCurrentView()}
      </main>
      
      {/* Global Alerts & custom popups */}
      <Toast />
      <ConfirmModal />
      
      {/* Footer */}
      <footer className="bg-white border-t py-8 text-center text-xs text-gray-400 mt-12 font-sans">
        <p className="font-semibold text-gray-500 mb-1">© 2026 CampusMart. Secure College Marketplace.</p>
        <p>Exclusively designed for students. Standardized rates apply: textbooks ₹125, handwritten notes ₹100, exam/research papers ₹150.</p>
      </footer>
    </div>
  );
}