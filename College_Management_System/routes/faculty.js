const express = require('express');
const Faculty = require('../models/Faculty'); // Adjust path as needed
const router = express.Router();

// Get all faculty members and render the list view
router.get('/list', (req, res) => {
    Faculty.getAllFaculty((err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('faculty/list-faculty', { faculty: results || [] });
    });
});

// Render the form to add a new faculty member
router.get('/new', (req, res) => {
    res.render('faculty/add-faculty'); // Ensure 'add-faculty.ejs' exists
});

// Handle adding a new faculty member
router.post('/new', (req, res) => {
    const { first_name, last_name, email } = req.body;
    const newFaculty = new Faculty(null, first_name, last_name, email);

    newFaculty.addFaculty((err, results) => {
        if (err) {
            console.error('Error adding faculty:', err);
            return res.status(500).send('Error adding new faculty member');
        }
        res.redirect('/faculty/list');
    });
});

// Render the edit faculty form
router.get('/edit/:id', (req, res) => {
    const faculty_id = req.params.id;
    Faculty.getFacultyById(faculty_id, (err, faculty) => {
        if (err || !faculty) {
            console.error('Error fetching faculty member:', err);
            return res.status(404).send('Faculty member not found');
        }
        res.render('faculty/edit-faculty', { faculty }); // Pass faculty to the template
    });
});

// Handle faculty update
router.post('/update/:id', (req, res) => {
    const faculty_id = req.params.id;
    const { first_name, last_name, email } = req.body;
    const updatedFaculty = new Faculty(faculty_id, first_name, last_name, email);

    updatedFaculty.editFaculty((err, results) => {
        if (err) {
            console.error('Error updating faculty member:', err);
            return res.status(500).send('Error updating faculty member');
        }
        res.redirect('/faculty/list'); // Redirect to the faculty list after editing
    });
});


// Render delete confirmation page and delete the faculty member
router.get('/delete/:id', (req, res) => {
    const faculty_id = req.params.id;

    // Fetch the faculty details before deletion
    Faculty.getFacultyById(faculty_id, (err, faculty) => {
        if (err || !faculty) {
            console.error('Error fetching the faculty before deletion:', err ? err.message : 'Faculty not found');
            return res.status(404).send('Faculty member not found');
        }

        // Proceed to delete the faculty member
        Faculty.deleteFaculty(faculty_id, (deleteErr, results) => {
            if (deleteErr) {
                console.error('Error deleting the faculty member:', deleteErr.message);
                return res.status(500).send('Failed to delete the faculty member');
            }

            // Render the delete-faculty confirmation page
            res.render('faculty/delete-faculty', {
                faculty_id: faculty.faculty_id,
                first_name: faculty.first_name,
                last_name: faculty.last_name,
            });
        });
    });
});


// API endpoint to get a faculty member by ID (if needed)
router.get('/:id', (req, res) => {
    const faculty_id = req.params.id;

    Faculty.getFacultyById(faculty_id, (err, results) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
