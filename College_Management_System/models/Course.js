const db = require('../database');

class Course {
    constructor(course_id, course_name, credits) {
        this.course_id = course_id; 
        this.course_name = course_name;
        this.credits = credits;
    }

    // Get all courses (Callback-based)
    static getAllCourses(callback) {
        const query = 'SELECT * FROM courses';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Add a new course
    addCourse(callback) {
        const { course_name, credits } = this;
        const query = 'INSERT INTO courses (course_name, credits) VALUES (?, ?)';
        db.query(query, [course_name, credits], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Edit course details
    editCourse(callback) {
        const { course_id, course_name, credits } = this;
        const query = 'UPDATE courses SET course_name = ?, credits = ? WHERE course_id = ?';
        db.query(query, [course_name, credits, course_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.affectedRows === 0) {
                callback(new Error('Course not found or no changes were made'), null);
                return;
            }
            callback(null, results);
        });
    }
    

    // Delete a course
    static deleteCourse(course_id, callback) {
        const query = 'DELETE FROM courses WHERE course_id = ?';
        db.query(query, [course_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Get course by ID
    static getCourseById(course_id, callback) {
        const query = 'SELECT * FROM courses WHERE course_id = ?';
        db.query(query, [course_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Course not found'), null);
                return;
            }
            callback(null, results[0]);
        });
    }
}

module.exports = Course;
