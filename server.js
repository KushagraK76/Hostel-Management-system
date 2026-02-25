/**
 * ============================================================
 *  SERVER: Express Application Entry Point
 * ============================================================
 *
 *  - Serves static frontend files from /public
 *  - Mounts student and warden API routes
 *  - Creates a single AllotmentManager instance (shared state)
 *
 *  To start: node server.js
 *  Server runs on: http://localhost:3000
 * ============================================================
 */

const express = require('express');
const path = require('path');

// Domain model — single instance manages all state
const AllotmentManager = require('./models/AllotmentManager');
const manager = new AllotmentManager();

// Route factories
const studentRoutes = require('./routes/studentRoutes');
const wardenRoutes = require('./routes/wardenRoutes');

const app = express();
const PORT = 3000;

// ---- MIDDLEWARE ----
app.use(express.json());                                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));            // Parse form data
app.use(express.static(path.join(__dirname, 'public')));    // Serve static files

// ---- API ROUTES ----
app.use('/api/student', studentRoutes(manager));
app.use('/api/warden', wardenRoutes(manager));

// ---- FALLBACK: serve index.html for root ----
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- START SERVER ----
app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`  Hostel Allotment System`);
    console.log(`  Server running on http://localhost:${PORT}`);
    console.log(`========================================\n`);
});
