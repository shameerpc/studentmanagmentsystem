const mongoose = require('mongoose');



const connectdb=mongoose.connect('mongodb://localhost:27017/student-management-system', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error(err));

module.exports=connectdb;
