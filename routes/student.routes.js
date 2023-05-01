const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const { generateToken } = require('../middleware/auth');
const verifytoken=require("../middleware/verifytoken");
// Define the route path for the student listing page
const STUDENT_LIST_PATH = 'api/v1/students';

const students = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Mathematics'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    subject: 'Physics'
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    subject: 'Chemistry'
  }
];

Student.insertMany(students)
  .then((data) => {
    console.log('Students seeded successfully');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error seeding students');
  });

function checkAuthentication(username, password) {
  // Replace this with your own authentication logic
  // For example, you could check a database or environment variables
  const validCredentials = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  };

  return username === validCredentials.username && password === validCredentials.password;
}

router.get('/',async (req, res) => {
  console.log("hello");
  try {
    const students = await Student.find({});
    res.render('student', { students: students });
  } catch (err) {
    console.log("daa");
    console.log(err);
  }
});


router.post('/', (req, res) => {
  console.log("hihi")
  const { username, password } = req.body;
  if (!checkAuthentication(username, password)) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = generateToken({ username });

  // Set the token as a client-side cookie instead of an HTTP-only cookie
  // This allows the client to access the token from JavaScript
  res.cookie('token', token, { sameSite: 'lax' });

  res.redirect(STUDENT_LIST_PATH);
});

  



module.exports = router;

