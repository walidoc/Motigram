const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const databaseConfig = require('./config/database');
const router = require('./app/routes');

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