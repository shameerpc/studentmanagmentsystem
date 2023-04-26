const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/student-management-system';

const connectdb=()=>{mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));
}
module.exports=connectdb;
