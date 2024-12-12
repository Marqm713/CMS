const db = require('../database');

class Student {
    constructor(student_id, first_name, last_name, email) {
        this.student_id = student_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }

    // Get all students
    static getAllStudents(callback) {
        const query = 'SELECT * FROM students';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Add a new student
    addStudent(callback) {
        const { first_name, last_name, email } = this;
        const query = 'INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?)';
        db.query(query, [first_name, last_name, email], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Edit student details
    editStudent(callback) {
        const { student_id, first_name, last_name, email } = this;
        const query = 'UPDATE students SET first_name = ?, last_name = ?, email = ? WHERE student_id = ?';
        db.query(query, [first_name, last_name, email, student_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.affectedRows === 0) {
                callback(new Error('Student not found or no changes were made'), null);
                return;
            }
            callback(null, results);
        });
    }

    // Delete a student
    static deleteStudent(student_id, callback) {
        const query = 'DELETE FROM students WHERE student_id = ?';
        db.query(query, [student_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.affectedRows === 0) {
                callback(new Error('Student not found'), null);
                return;
            }
            callback(null, results);
        });
    }

    // Get student by ID
    static getStudentById(student_id, callback) {
        const query = 'SELECT * FROM students WHERE student_id = ?';
        db.query(query, [student_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Student not found'), null);
                return;
            }
            callback(null, results[0]);
        });
    }
}

module.exports = Student;
