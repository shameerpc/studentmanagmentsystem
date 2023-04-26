const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);


