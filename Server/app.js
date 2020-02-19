const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const ConnectToDB = require('./dal/dbConnectin');

/*  "test": "echo \"Error: no test specified\" && exit 1",
 "build": "npm run build&&gh-pages -d build",
 "start": "nodemon server.js" */

const usersRoutes = require('./api/routes/users');
const reportsRoutes = require('./api/routes/reports');


app.use(cors());
ConnectToDB();

a=2;
console.log(f1());
function f1() {this.a=5;return this.a};
console.log(f1());
console.log(new f1());
console.log(f1);

//middlware
app.use(morgan('dev'));//info to developer

//convertion of body to json object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/users', usersRoutes);
app.use('/reports', reportsRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

})

module.exports = app;

