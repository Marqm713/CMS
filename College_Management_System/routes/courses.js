const express = require('express');
const router = express.Router();
const db = require('../database'); // Import the database connection from database.js
const Course = require('../models/Course'); // Import the Course model

// Root route for courses
router.get('/', (req, res) => {
    res.send('Welcome to the Courses page');
});

// Retrieve all courses
router.get('/list-courses', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const username = req.session.user.username;

    Course.getAllCourses((err, courses) => {
        if (err) {
            console.error('Error fetching courses:', err.message);
            return res.status(500).send('Failed to load courses');
        }
        res.render('courses/list-courses', { courses, username });
    });
});

// Add a new course - view
router.get('/new', (req, res) => {
    res.render('courses/add-courses'); // Render the add-courses view
});

// Add a new course - post to DB
router.post('/new', (req, res) => {
    const { course_name, credits } = req.body;
    const newCourse = new Course(null, course_name, credits);

    newCourse.addCourse((err, results) => {
        if (err) {
            console.error('Error adding a course:', err.message);
            return res.status(500).send('Failed to add the course');
        }
        res.redirect('/courses/list-courses'); // Redirect to the list of courses
    });
});

// Edit a course - get course and render it on the view
router.get('/edit/:id', (req, res) => {
    const courseId = req.params.id;

    Course.getCourseById(courseId, (err, course) => {
        if (err) {
            console.error('Error fetching the course:', err.message);
            return res.status(500).send('Failed to fetch the course');
        }
        res.render('courses/edit-courses', { course }); // Render the edit-courses view
    });
});

// Update an existing course - post updated data to the database
router.post('/update/:id', (req, res) => {
    const courseId = req.params.id;
    const { course_name, credits } = req.body;
    const updatedCourse = new Course(courseId, course_name, credits);

    updatedCourse.editCourse((err, results) => {
        if (err) {
            console.error('Error updating the course:', err.message);
            return res.status(500).send('Failed to update the course');
        }
        res.redirect('/courses/list-courses'); // Redirect to the list of courses
    });
});


// Delete a course
router.get('/delete/:id', (req, res) => {
    const courseId = req.params.id;

    // Fetch the course before deleting
    Course.getCourseById(courseId, (err, course) => {
        if (err) {
            console.error('Error fetching the course before deletion:', err.message);
            return res.status(500).send('Failed to fetch the course for deletion');
        }

        // Proceed to delete the course
        Course.deleteCourse(courseId, (deleteErr, results) => {
            if (deleteErr) {
                console.error('Error deleting the course:', deleteErr.message);
                return res.status(500).send('Failed to delete the course');
            }

            // Render the delete-course confirmation page
            res.render('courses/delete-courses', {
                course_id: course.course_id,
                course_name: course.course_name,
            });
        });
    });
});


// Export the router
module.exports = router;
