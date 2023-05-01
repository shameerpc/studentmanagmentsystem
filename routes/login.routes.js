const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');
const { generateToken } = require('../middleware/auth');


function checkAuthentication(username, password) {
  // Replace this with your own authentication logic
  const validCredentials = {
    username: 'admin',
    password: 'password123'
  };

  return username === validCredentials.username && password === validCredentials.password;
}


router.get('/', (req, res) => {
  console.log("hih")
  res.render('login');
});

router.post('/', (req, res) => {
  console.log("post")
  console.log(req.body);
  // Check if the username and password are correct
  const { username, password } = req.body;
  const authenticated = checkAuthentication(username, password);

  if (!authenticated) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  // Generate a JWT token
  const token = generateToken({ username });

  // Set the token as a cookie
  res.cookie('token', token, { httpOnly: true });

  // Redirect to the student listing page
  res.redirect('/api/v1/student');
});




module.exports = router;

