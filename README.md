
# College Management System

A comprehensive **College Management System** built with **Node.js**, **Express**, **MySQL**, and **EJS** for managing users, students, faculty, courses, and enrollments.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Database Structure](#database-structure)
5. [Setup Instructions](#setup-instructions)
6. [How to Use](#how-to-use)
7. [Screenshots](#screenshots)

---

## Overview

The **College Management System** is designed to streamline and simplify the management of a college's core entities, including:
- **Users**: Admins and staff with roles and credentials.
- **Students**: Enrolled individuals in the college.
- **Faculty**: Teaching staff for different courses.
- **Courses**: Subjects offered by the college.
- **Enrollments**: Student and faculty assignments to courses.

This project includes both **backend logic** for handling operations and a **user-friendly interface** for management tasks.

---

## Features

1. **User Management**
   - Register, Login, and Logout functionality.
   - Add, edit, delete, and list users (Admins/Staff).

2. **Student Management**
   - Add, edit, delete, and list students.
   - View enrolled courses for a student.

3. **Faculty Management**
   - Add, edit, delete, and list faculty members.
   - View assigned courses for a faculty member.

4. **Course Management**
   - Add, edit, delete, and list courses.

5. **Enrollment Management**
   - Enroll students and faculty into courses.
   - Withdraw students and faculty from courses.

6. **Validation and Error Handling**
   - Unique constraints, proper error messages, and role validations.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript), Bootstrap
- **Database**: MySQL
- **Authentication**: bcrypt, express-session
- **Middleware**: body-parser, MySQL2

---

## Database Structure

### 1. **Users Table**
| Column   | Type          | Details                             |
|----------|---------------|-------------------------------------|
| user_id  | INT           | Primary Key, Auto-Increment         |
| username | VARCHAR(50)   | Unique, Not Null                    |
| password | VARCHAR(255)  | Not Null                            |
| role     | ENUM('admin', 'staff') | Not Null                   |

### 2. **Students Table**
| Column      | Type         | Details                          |
|-------------|--------------|----------------------------------|
| student_id  | INT          | Primary Key, Auto-Increment      |
| first_name  | VARCHAR(50)  | Not Null                         |
| last_name   | VARCHAR(50)  | Not Null                         |
| email       | VARCHAR(100) | Unique, Not Null                 |

### 3. **Faculty Table**
| Column      | Type         | Details                          |
|-------------|--------------|----------------------------------|
| faculty_id  | INT          | Primary Key, Auto-Increment      |
| first_name  | VARCHAR(50)  | Not Null                         |
| last_name   | VARCHAR(50)  | Not Null                         |
| email       | VARCHAR(100) | Unique, Not Null                 |

### 4. **Courses Table**
| Column      | Type          | Details                          |
|-------------|---------------|----------------------------------|
| course_id   | INT           | Primary Key, Auto-Increment      |
| course_name | VARCHAR(100)  | Not Null                         |
| credits     | INT           | Not Null                         |

### 5. **Enrollments Table**
| Column       | Type | Details                                  |
|--------------|------|------------------------------------------|
| enrollment_id| INT  | Primary Key, Auto-Increment              |
| student_id   | INT  | Foreign Key References students(student_id) |
| faculty_id   | INT  | Foreign Key References faculty(faculty_id) |
| course_id    | INT  | Foreign Key References courses(course_id) |

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MySQL](https://www.mysql.com/) installed and running
- Basic knowledge of running Node.js applications

### Steps

1. Clone the repository:
   ```bash
   git clone <[repository-url](https://github.com/Marqm713/CMS)>
   cd College_Management_System
   ```

2. Install dependencies:
   ```bash
   npm install express express-session bcrypt mysql2 bootstrap body-parser ejs
   ```

3. Create a `.env` file and configure the following:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=2151
   DB_NAME=cms
   SECRET=your_session_secret
   ```

4. Create the MySQL database and tables:
   - Use the provided SQL file or run the SQL schema manually.

5. Start the application:
   ```bash
   node app
   ```

6. Open the browser and navigate to:
   ```
   http://localhost:3000/register
   ```

---

## How to Use

1. **Register and Login**:
   - Admins or staff can log in to access the dashboard.

2. **Manage Users**:
   - Navigate to the **Users** section to add, edit, or delete users.

3. **Manage Students, Faculty, and Courses**:
   - Use the respective sections to perform CRUD operations.

4. **Manage Enrollments**:
   - Assign or withdraw students and faculty from courses.

5. **View Dashboards**:
   - Navigate through the dashboard for easy access to all features.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch.
3. Commit changes.
4. Submit a pull request.

---

