const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const nodemailer = require("nodemailer");
const verifyToken = require("../middleware/verifytoken"); // corrected middleware name

// Seed students data
router.post('/seed', (req, res) => { // changed endpoint to '/seed'
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
      console.log(data);
      console.log('Students seeded successfully');
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error seeding students');
    });
});

// Create email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'shamseerpcshan@gmail.com',
    pass: 'shaMSEERPC',
  },
});

// Define email template
const emailTemplate = (student, message) => `
  <h1>Student Management System</h1>
  <p>Dear ${student.name},</p>
  <p>${message}</p>
  <p>Best regards,</p>
  <p>The Student Management System Team</p>
`;

// Send email to all students
router.post('/send-email', (req, res) => {
  const { message } = req.body;
  Student.find()
    .then((students) => {
      students.forEach((student) => {
        const mailOptions = {
          from: 'shamseerpcshan@gmail.com',
          to: student.email,
          subject: 'Message from Student Management System',
          html: emailTemplate(student, message),
        };
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Email sent to ${student.email}`);
          }
        });
      });
      res.redirect('/students');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching students');
    });
});

// Display list of students
router.get('/', verifyToken, (req, res) => { 
  console.log("hi"); // corrected typo
  Student.find()
    .then((students) => {
      console.log(students);
      res.render('student-list', { students });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching students');
    });
});

module.exports = router;
