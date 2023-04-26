/* eslint-disable no-unused-vars */
const createError = require('http-errors');
const express = require('express');
const debug = require('debug')('todo-api:app');
const hpp = require('hpp');
const cors = require('cors');
const routes = require('./routes');
const pjson = require('./package.json');
//const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser'); 
const Constant = require('./utilities/constant');
const ejs = require('ejs');
const app = express();
const connectdb=require('./database/mongoConnection');
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.static("public"));


 //app.use(express.static(__dirname + '/public'));
// app.use('/api/v1/profile', express.static('uploads'));


//app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
// App security header


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// sanitize data



// Prevent HTTP parameter Pollution attacks
app.use(hpp());

// Allow cors
var corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

// show version on home route
app.get('/', (req, res) => {
  res.json({ version: pjson.version });
});
app.use('/api/v1', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  debug(`error: ${err} ${err.statusCode}`);
  let errorResponse;
  if (err.name) {
    const code = err?.statusCode ? err.statusCode : 500;
    if (err.statusCode) {
      errorResponse = {
        status: false,
        error: err?.message,
        code,
      };
    } else {
      errorResponse = {
        status: false,
        error: Constant.labelList.invalidInput,
        code,
      };
    }
  }
  if (errorResponse) {
    res.status(errorResponse.code).json(errorResponse);
  } else {
    next();
  }
});

app.listen("5000",()=>{
  console.log("server running port 5000")
})
module.exports = app;
