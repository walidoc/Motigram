var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
 
var databaseConfig = require('./config/database');
var router = require('./app/routes');

mongoose.connect(databaseConfig.uri, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log('Connected to MongoDB');
    }
});

 
app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");
 
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors()); // Deal with any CORS issues we might run into
 
router(app);