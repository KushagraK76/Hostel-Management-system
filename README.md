# 🏠 Hostel Allotment System — DSA Project

A **menu-driven Hostel Allotment System** built using **Node.js & Express** with a clean web UI. This project demonstrates clear use of fundamental **Data Structures & Algorithms** with well-commented, modular code — designed to be viva-friendly.

---

## ✨ Features

### Student Portal
- **Apply** for hostel accommodation (registration form)
- **Check Status** (PENDING / APPROVED / REJECTED / WAITLISTED)
- **View Allotment** (hostel, room number, bed number)
- Search by Registration Number

### Warden Portal
- **Pending Queue** — view & process applications in FIFO order
- **Approve / Reject** — next-in-queue or specific student
- **Auto-Allotment** — gender-based hostel selection + load balancing + first available bed
- **Occupancy View** — visual room-wise bed status grid
- **Sorted Student List** — alphabetically sorted using Merge Sort
- **Search** — by ID (HashMap O(1)) or by Name (Binary Search O(log n))
- **Remove Student** — checkout and free bed

### System Features
- **4 Hostels**: BH1, BH2 (Boys), GH1, GH2 (Girls) — 100 seats each
- **50 rooms × 2 beds** per hostel = 100 capacity
- **Load Balancing** — allots to hostel with more empty beds
- **File Persistence** — data saved to JSON files, survives restarts

---

## 🧠 DSA Concepts Used

| # | DSA Concept | File | Purpose | Time Complexity |
|---|-------------|------|---------|-----------------|
| 1 | **HashMap** (Custom) | `dsa/HashMap.js` | Student ID → Record lookup | **O(1)** avg insert/search/delete |
| 2 | **Queue** (Linked List) | `dsa/Queue.js` | FIFO pending application processing | **O(1)** enqueue/dequeue |
| 3 | **Merge Sort** (Manual) | `dsa/MergeSort.js` | Sort students alphabetically by name | **O(n log n)** |
| 4 | **Binary Search** | `dsa/BinarySearch.js` | Search by name in sorted array | **O(log n)** |
| 5 | **2D Array** | `models/Hostel.js` | `rooms[50][2]` room-bed occupancy matrix | **O(100)** scan per hostel |

### Why Each DSA Was Chosen

1. **HashMap** — Provides constant-time O(1) student lookup by ID instead of O(n) linear search.
2. **Queue** — Ensures fairness with FIFO processing of hostel applications.
3. **Merge Sort** — Guarantees O(n log n) in all cases (unlike Quick Sort's O(n²) worst case). Stable sort.
4. **Binary Search** — After sorting, search by name is O(log n) instead of O(n).
5. **2D Array** — Naturally models the room-bed layout with direct O(1) index access.

---

## ⏱️ Complexity Summary

| Operation | Algorithm | Time | Space |
|-----------|-----------|------|-------|
| Search by ID | HashMap | O(1) | O(n) |
| Add application | HashMap + Queue | O(1) | O(1) |
| Process queue | Queue dequeue | O(1) | O(1) |
| Allot bed scan | 2D Array traversal | O(rooms × beds) = O(100) | O(1) |
| Sort students | Merge Sort | O(n log n) | O(n) |
| Search by name | Binary Search | O(log n) | O(1) |
| Load all students | HashMap values | O(n) | O(n) |

---

## 🚀 How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the server
node server.js

# 3. Open in browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
Hostel allotment/
├── server.js                 # Express server entry point
├── package.json
├── data/                     # Persisted data (auto-created)
│   ├── students.json
│   └── hostels.json
├── dsa/                      # DSA implementations (well-commented)
│   ├── HashMap.js            # Custom hash map with chaining
│   ├── Queue.js              # FIFO queue using linked list
│   ├── MergeSort.js          # Manual merge sort (divide & conquer)
│   └── BinarySearch.js       # Binary search (exact + prefix)
├── models/                   # Domain models
│   ├── Student.js            # Student data model
│   ├── Hostel.js             # Hostel with 2D room-bed matrix
│   └── AllotmentManager.js   # Core allotment logic controller
├── routes/                   # Express API routes
│   ├── studentRoutes.js      # Student endpoints
│   └── wardenRoutes.js       # Warden/admin endpoints
├── public/                   # Frontend (static files)
│   ├── index.html            # Landing page
│   ├── student.html          # Student portal
│   ├── warden.html           # Warden portal
│   ├── css/style.css         # Styling
│   └── js/
│       ├── student.js        # Student page logic
│       └── warden.js         # Warden page logic
└── README.md
```

---

## 🎤 Viva Q&A (10 Questions & Answers)

### Q1: What is a HashMap and why did you use it?
**A:** A HashMap stores key-value pairs where the key is hashed to an index in a bucket array. I used it to map `studentId → StudentRecord` for O(1) average-time lookup, insert, and delete. Without it, searching by ID would take O(n).

### Q2: How does your HashMap handle collisions?
**A:** Using **chaining** — each bucket stores a list (array) of [key, value] pairs. When two keys hash to the same index, they're both stored in that bucket's list. On lookup, we scan the short chain (usually 1-2 items).

### Q3: Why did you use a Queue for applications?
**A:** To ensure **fairness** — applications are processed in First-In-First-Out (FIFO) order, meaning the student who applied first gets processed first. I implemented it using a singly linked list for O(1) enqueue and dequeue.

### Q4: What is the difference between Array.shift() and your Queue implementation?
**A:** `Array.shift()` is O(n) because every element must be shifted one position forward. My linked-list Queue gives **O(1)** dequeue by simply moving the head pointer.

### Q5: Explain how Merge Sort works.
**A:** Merge Sort uses **Divide and Conquer**:
1. **Divide**: Split the array into two halves at the midpoint.
2. **Conquer**: Recursively sort each half (base case: arrays of size ≤ 1).
3. **Merge**: Combine two sorted halves by comparing elements one by one.
- Time: O(n log n) in all cases. Recurrence: T(n) = 2T(n/2) + O(n).

### Q6: Why Merge Sort instead of Quick Sort?
**A:** Merge Sort guarantees O(n log n) in **all cases** (best, average, worst). Quick Sort can degrade to O(n²) in the worst case (e.g., already sorted input with bad pivot). Also, Merge Sort is **stable** — equal elements keep their original order.

### Q7: How does Binary Search work?
**A:** Binary Search requires a **sorted** array. It compares the target with the middle element:
- If equal → found.
- If target < middle → search left half.
- If target > middle → search right half.
Each step halves the search space, giving O(log n) time.

### Q8: What is the 2D Array used for?
**A:** Each hostel has a `rooms[50][2]` matrix. `rooms[i][j]` stores `null` (empty) or a `studentId` (occupied), where `i` = room index and `j` = bed index. This gives O(1) access to any specific room-bed, and O(100) to scan for the first available bed.

### Q9: How does the allotment (load balancing) work?
**A:** When a student is approved:
1. **Gender** decides the hostel group (Male → BH1/BH2, Female → GH1/GH2).
2. **Load balancing**: Count empty beds in both hostels; pick the one with **more** empty beds.
3. **First available bed**: Scan the 2D matrix from room 1 to 50, bed 1 to 2; assign the first empty slot.

### Q10: What is the time complexity of the entire allotment process?
**A:** Dequeue from Queue: O(1) + HashMap lookup: O(1) + Count empty beds: O(100) × 2 hostels + Find first bed: O(100) + Assign bed: O(1) = **O(200)** ≈ **O(1)** constant since hostel size is fixed.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Persistence**: JSON file storage (no database)
- **DSA**: All implemented manually in JavaScript

---

*Built as a DSA Project — focus on clean, modular, well-commented code with clear algorithmic thinking.*
