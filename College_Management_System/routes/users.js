const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const db = require('../database');

// Register Page
router.get('/register', (req, res) => {
    res.render('registration');
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Logout (redirects to login page)
router.get('/logout', (req, res) => {
    res.render('login');
});

// Dashboard Page
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        res.render('dashboard', { user });
    } else {
        res.redirect('/login');
    }
});

// Register User
router.post('/register', (req, res) => {
    const { username, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Password hashing error:', err);
            return res.redirect('/register');
        }

        const insertQuery = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
        db.query(insertQuery, [username, hash, role], (err, result) => {
            if (err) {
                console.error('Database insert error:', err);
                return res.redirect('/register');
            }
            console.log('User registered:', result);
            res.redirect('/login');
        });
    });
});

// Login User
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const selectQuery = 'SELECT * FROM users WHERE username = ?';

    db.query(selectQuery, [username], (error, result) => {
        if (error) {
            console.error('Error retrieving the user: ', error);
            return res.redirect('/login');
        }
        if (result.length === 0) {
            return res.redirect('/login');
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Password comparison error:', err);
                return res.redirect('/login');
            }
            if (isMatch) {
                req.session.user = { username: user.username }; // Store the username in session
                res.redirect('/dashboard'); // Redirect to the dashboard page
            } else {
                res.redirect('/login');
            }
        });
    });
});

// List Users
router.get('/list', (req, res) => {
    const query = 'SELECT user_id, username, role FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return res.status(500).send('Failed to fetch users');
        }
        res.render('users/list-users', { users: results });
    });
});


// Render Edit User Page
router.get('/edit/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const query = 'SELECT user_id, username, role FROM users WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err || results.length === 0) {
            console.error('Error fetching user for edit:', err || 'User not found');
            return res.status(404).send('User not found');
        }
        res.render('users/edit-users', { user: results[0] });
    });
});

// Handle User Update
router.post('/edit/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const { username, role } = req.body;

    const query = 'UPDATE users SET username = ?, role = ? WHERE user_id = ?';
    db.query(query, [username, role, user_id], (err, results) => {
        if (err) {
            console.error('Error updating user:', err.message);
            return res.status(500).send('Failed to update user');
        }
        res.redirect('/users/list');
    });
});


// Update User
router.post('/edit/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const { username, role } = req.body;

    const query = 'UPDATE users SET username = ?, role = ? WHERE user_id = ?';
    db.query(query, [username, role, user_id], (err, results) => {
        if (err) {
            console.error('Error updating user:', err.message);
            return res.status(500).send('Failed to update user');
        }
        res.redirect('/users/list');
    });
});


// Render Delete User Confirmation Page
router.get('/delete/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const query = 'SELECT user_id, username, role FROM users WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err || results.length === 0) {
            console.error('Error fetching user for deletion:', err || 'User not found');
            return res.status(404).send('User not found');
        }
        res.render('users/delete-users', { user: results[0] });
    });
});

// Handle User Deletion
router.post('/delete/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const query = 'DELETE FROM users WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err.message);
            return res.status(500).send('Failed to delete user');
        }
        res.redirect('/users/list'); // Redirect back to list of users after deletion
    });
});

// Render Add User Page
router.get('/new', (req, res) => {
    res.render('users/add-users');
});

// Handle Add User Form Submission
router.post('/new', (req, res) => {
    const { username, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Password hashing error:', err);
            return res.status(500).send('Failed to hash password');
        }

        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(query, [username, hash, role], (err, results) => {
            if (err) {
                console.error('Error adding user:', err.message);
                return res.status(500).send('Failed to add user');
            }
            res.redirect('/users/list');
        });
    });
});


module.exports = router;
