const db = require('../database');

class Faculty {
    constructor(faculty_id, first_name, last_name, email) {
        this.faculty_id = faculty_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }

    // Get all faculty members
    static getAllFaculty(callback) {
        const query = 'SELECT * FROM faculty';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }
    
    // Add a new faculty member
    addFaculty(callback) {
        const { first_name, last_name, email } = this;
        const query = 'INSERT INTO faculty (first_name, last_name, email) VALUES (?, ?, ?)';
        db.query(query, [first_name, last_name, email], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    // Edit faculty details
    editFaculty(callback) {
        const { faculty_id, first_name, last_name, email } = this;
        const query = 'UPDATE faculty SET first_name = ?, last_name = ?, email = ? WHERE faculty_id = ?';
        db.query(query, [first_name, last_name, email, faculty_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.affectedRows === 0) {
                callback(new Error('Faculty member not found or no changes were made'), null);
                return;
            }
            callback(null, results);
        });
    }

    // Delete a faculty member
    static deleteFaculty(faculty_id, callback) {
        const query = 'DELETE FROM faculty WHERE faculty_id = ?';
        db.query(query, [faculty_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.affectedRows === 0) {
                callback(new Error('Faculty member not found'), null);
                return;
            }
            callback(null, results);
        });
    }

// Get faculty member by ID
    static getFacultyById(faculty_id, callback) {
        const query = 'SELECT * FROM faculty WHERE faculty_id = ?';
        db.query(query, [faculty_id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('Faculty member not found'), null);
                return;
            }
            callback(null, results[0]);
        });
    }
}

module.exports = Faculty;
