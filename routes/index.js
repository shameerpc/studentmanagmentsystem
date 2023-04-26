const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send(' API Version 1');
  });

  router.use("/login",require('./login.routes'));
  router.use("/student",require('./student.routes'));


  router.use((err, req, res) => {
    if (err)
      res.status(500).json({
        status: false,
        error: 'Something went wrong',
      });
  });  

 module.exports = router;