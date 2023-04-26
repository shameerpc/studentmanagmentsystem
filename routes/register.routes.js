const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');


router.get('/register', (req, res) => {
    res.render('register');
  });
  
  router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      res.redirect('/register');
    }
  });

  
module.exports = router;

