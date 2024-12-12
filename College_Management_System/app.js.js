const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true

  }));

const router = require('./routes/users');
app.use('/', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routers
const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');
const facultyRouter = require('./routes/faculty');
const enrollmentRouter = require('./routes/enrollment');
const studentsRouter = require('./routes/students'); // Import the students router


// Use routers with appropriate base paths
app.use('/courses', coursesRouter);  
app.use('/users', usersRouter);  
app.use('/faculty', facultyRouter);  
app.use('/enrollments', enrollmentRouter);
app.use('/students', studentsRouter);