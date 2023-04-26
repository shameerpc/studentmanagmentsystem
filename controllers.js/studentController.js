require("express-async-errors");
const dotenv = require("dotenv");
const Student = require("../models/studentModel")
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const nodemailerdata = require("../middleware/nodemailer");

exports.create = (req, res) => {
 
    const newstudent = new Student({
        name : req.body.name,
        email : req.body.email,
        subjects : req.body.subjects
      // other fields...
    });
    
    newstudent.save()
      .then(savedstudent => {
        console.log("student="+savedstudent);
        res.status(201).json({
          status: "success",
          message: 'Successfully Created',
          data: savedstudent
      });
      })
      .catch(err => {
        console.error(err);
        res.json({
          status: "error",
          message: err,
      });
      });
    
};
exports.deletestudent = function (req, res) {
    Student.findById(req.params.id, function (err, result) {
    console.log(result);
    if (!result) {
      res.json({
        status: "error",
        message: "no record find with the given id",
      });
    }

    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    result.delstatus = true;
    result.save(function (err) {
      if (err) {
        res.json({
          status: "error",
          message: err,
        });
      }

      res.json({
        status: "success",
        message: "Deleted Successfully",
        data: result,
      });
    });
  });
};
exports.updatestudent = async (req, res, next) => {
  console.log("hii");
  Student.findById(req.params.id, (err, updateItem) => {
    console.log(updateItem)
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      updateItem.name = req.body.name;
      updateItem.email = req.body.email;
      updateItem.subjects = req.body.subjects;

      updateItem.save((err) => {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
        } else {
          res.json({
            status: "success",
            message: "Updated Successfully",
            data: updateItem,
          });
        }
      });
    }
  });
};

exports.getstudent = (req, res) => {
    Student.find({
    delstatus: false,
  })
    .then(function (list) {
      nodemailerdata.sendEmail
      res.json({
        status: "success",
        message: "project retrieved successfully",
        data: list,
      });
    })
    .catch((err) => {
      res.json({
        status: "error",
        message: err,
      });
    });
};
exports.getstudentbyid = async (req, res, next) => {
  console.log(req.params.id);
    const studentdata = await Movie.findOne({ _id: req.params.id }, (err, result) => {

      console.log(result)
      if (err) {
        consosle.log(err)
        res.json({
          status: "error",
          message: err,
        });
      } else {
        res.json({
          status: "success",
          message: 'movies details loading..',
          data: result
        });
      }
    })
  }   