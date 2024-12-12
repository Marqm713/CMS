const express = require('express');
const router = express.Router();
const db = require('../database'); // Import the database connection from database.js
const Student = require('../models/Student'); // Import the Student model

// Root route for students
router.get('/', (req, res) => {
    res.send('Welcome to the Students page');
});

// Retrieve all students
router.get('/list-students', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const username = req.session.user.username;

    Student.getAllStudents((err, students) => {
        if (err) {
            console.error('Error fetching students:', err.message);
            return res.status(500).send('Failed to load students');
        }
        res.render('students/list-students', { students, username });
    });
});

// Add a new student - view
router.get('/new', (req, res) => {
    res.render('students/add-students'); // Render the add-students view
});

// Add a new student - post to DB
router.post('/new', (req, res) => {
    const { first_name, last_name, email } = req.body;
    const newStudent = new Student(null, first_name, last_name, email);

    newStudent.addStudent((err, results) => {
        if (err) {
            console.error('Error adding a student:', err.message);
            return res.status(500).send('Failed to add the student');
        }
        res.redirect('/students/list-students'); // Redirect to the list of students
    });
});

// Edit a student - get student and render it on the view
router.get('/edit/:id', (req, res) => {
    const studentId = req.params.id;

    Student.getStudentById(studentId, (err, student) => {
        if (err) {
            console.error('Error fetching the student:', err.message);
            return res.status(500).send('Failed to fetch the student');
        }
        res.render('students/edit-students', { student }); // Render the edit-students view
    });
});

// Update an existing student - post updated data to the database
router.post('/update/:id', (req, res) => {
    const studentId = req.params.id;
    const { first_name, last_name, email } = req.body;
    const updatedStudent = new Student(studentId, first_name, last_name, email);

    updatedStudent.editStudent((err, results) => {
        if (err) {
            console.error('Error updating the student:', err.message);
            return res.status(500).send('Failed to update the student');
        }
        res.redirect('/students/list-students'); // Redirect to the list of students
    });
});

// Delete a student
router.get('/delete/:id', (req, res) => {
    const studentId = req.params.id;

    // Fetch the student before deleting
    Student.getStudentById(studentId, (err, student) => {
        if (err) {
            console.error('Error fetching the student before deletion:', err.message);
            return res.status(500).send('Failed to fetch the student for deletion');
        }

        // Proceed to delete the student
        Student.deleteStudent(studentId, (deleteErr, results) => {
            if (deleteErr) {
                console.error('Error deleting the student:', deleteErr.message);
                return res.status(500).send('Failed to delete the student');
            }

            // Render the delete-student confirmation page
            res.render('students/delete-students', {
                student_id: student.student_id,
                first_name: student.first_name,
                last_name: student.last_name,
            });
        });
    });
});

// Export the router
module.exports = router;
