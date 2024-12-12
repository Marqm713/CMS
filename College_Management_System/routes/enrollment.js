const express = require('express');
const Enroll = require('../models/Enroll');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const router = express.Router();

// List all enrollments
router.get('/list', (req, res) => {
    Course.getAllCourses((err, courses) => {
        if (err) {
            console.error('Error fetching courses:', err.message);
            return res.status(500).send('Failed to fetch courses');
        }

        Enroll.getAllEnrollments((err, enrollments) => {
            if (err) {
                console.error('Error fetching enrollments:', err.message);
                return res.status(500).send('Failed to fetch enrollments');
            }

            res.render('enrollments/list-enrollments', { courses, enrollments });
        });
    });
});

// Enroll a student in a course
router.post('/student/:course_id', (req, res) => {
    const course_id = req.params.course_id;
    const { student_id } = req.body;

    const enrollment = new Enroll(null, student_id, null, course_id);
    enrollment.enrollStudent((err, results) => {
        if (err) {
            console.error('Error enrolling student:', err.message);
            return res.status(500).send('Error enrolling student');
        }
        res.redirect('/enrollments/list');
    });
});

// Enroll a faculty member in a course
router.post('/faculty/:course_id', (req, res) => {
    const course_id = req.params.course_id;
    const { faculty_id } = req.body;

    const enrollment = new Enroll(null, null, faculty_id, course_id);
    enrollment.enrollFaculty((err, results) => {
        if (err) {
            console.error('Error enrolling faculty:', err.message);
            return res.status(500).send('Error enrolling faculty');
        }
        res.redirect('/enrollments/list');
    });
});

// Render add-faculty-enrollment view
router.get('/faculty/:course_id', (req, res) => {
    const course_id = req.params.course_id;

    Faculty.getAllFaculty((err, faculty) => {
        if (err) {
            console.error('Error fetching faculty:', err.message);
            return res.status(500).send('Failed to fetch faculty members');
        }
        res.render('enrollments/add-faculty-enrollments', { course_id, faculty });
    });
});

// Render add-student-enrollment view
router.get('/student/:course_id', (req, res) => {
    const course_id = req.params.course_id;

    Student.getAllStudents((err, students) => {
        if (err) {
            console.error('Error fetching students:', err.message);
            return res.status(500).send('Failed to fetch students');
        }
        res.render('enrollments/add-student-enrollments', { course_id, students });
    });
});

// Render withdraw-student-enrollment view
router.get('/withdraw/student/:course_id', (req, res) => {
    const course_id = req.params.course_id;

    Enroll.getStudentsInCourse(course_id, (err, enrolledStudents) => {
        if (err) {
            console.error('Error fetching enrolled students:', err.message);
            return res.status(500).send('Failed to fetch enrolled students');
        }
        res.render('enrollments/withdraw-student-enrollments', { course_id, enrolledStudents });
    });
});

// Withdraw a student from a course
router.post('/withdraw/student/:course_id', (req, res) => {
    const course_id = req.params.course_id;
    const { student_id } = req.body;

    Enroll.withdrawStudent(student_id, course_id, (err, results) => {
        if (err) {
            console.error('Error withdrawing student:', err.message);
            return res.status(500).send('Error withdrawing student');
        }
        res.redirect('/enrollments/list'); // Redirect back to enrollments list
    });
});

// Render remove-faculty-enrollment view
router.get('/withdraw/faculty/:course_id', (req, res) => {
    const course_id = req.params.course_id;

    Enroll.getFacultyInCourse(course_id, (err, enrolledFaculty) => {
        if (err) {
            console.error('Error fetching enrolled faculty:', err.message);
            return res.status(500).send('Failed to fetch enrolled faculty');
        }
        res.render('enrollments/remove-faculty-enrollments', { course_id, enrolledFaculty });
    });
});

// Withdraw a faculty member from a course
router.post('/withdraw/faculty/:course_id', (req, res) => {
    const course_id = req.params.course_id;
    const { faculty_id } = req.body;

    Enroll.withdrawFaculty(faculty_id, course_id, (err, results) => {
        if (err) {
            console.error('Error withdrawing faculty:', err.message);
            return res.status(500).send('Error withdrawing faculty');
        }
        res.redirect('/enrollments/list'); // Redirect back to enrollments list
    });
});

module.exports = router;
