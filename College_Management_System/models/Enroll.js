const db = require('../database');

class Enroll {
    constructor(enrollment_id, student_id, faculty_id, course_id) {
        this.enrollment_id = enrollment_id;
        this.student_id = student_id;
        this.faculty_id = faculty_id;
        this.course_id = course_id;
    }

    // Get all enrollments
    static getAllEnrollments(callback) {
        const query = `
            SELECT e.enrollment_id, s.first_name AS student_name, f.first_name AS faculty_name, c.course_name 
            FROM enrollments e
            LEFT JOIN students s ON e.student_id = s.student_id
            LEFT JOIN faculty f ON e.faculty_id = f.faculty_id
            LEFT JOIN courses c ON e.course_id = c.course_id;
        `;
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Enroll a student
    enrollStudent(callback) {
        const query = 'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)';
        db.query(query, [this.student_id, this.course_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Enroll a faculty
    enrollFaculty(callback) {
        const query = 'INSERT INTO enrollments (faculty_id, course_id) VALUES (?, ?)';
        db.query(query, [this.faculty_id, this.course_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Withdraw a student
    static withdrawStudent(student_id, course_id, callback) {
        const query = 'DELETE FROM enrollments WHERE student_id = ? AND course_id = ?';
        db.query(query, [student_id, course_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Withdraw a faculty
    static withdrawFaculty(faculty_id, course_id, callback) {
        const query = 'DELETE FROM enrollments WHERE faculty_id = ? AND course_id = ?';
        db.query(query, [faculty_id, course_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Get students enrolled in a course
    static getStudentsInCourse(course_id, callback) {
        const query = `
            SELECT s.student_id, s.first_name, s.last_name
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            WHERE e.course_id = ?;
        `;
        db.query(query, [course_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Get faculty enrolled in a course
    static getFacultyInCourse(course_id, callback) {
        const query = `
            SELECT f.faculty_id, f.first_name, f.last_name
            FROM enrollments e
            JOIN faculty f ON e.faculty_id = f.faculty_id
            WHERE e.course_id = ?;
        `;
        db.query(query, [course_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }
}

module.exports = Enroll;
