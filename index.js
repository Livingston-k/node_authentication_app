const express = require('express');
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
require('dotenv').config();
var morgan = require("morgan");
const { urlencoded } = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    key: 'user_sid',
    secret: '874847667576',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))
app.use((req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard')
    }
    next()
})

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
})

app.route('/login').get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})
app.route('/signup').get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
})

app.set('port', 4000)
app.listen(app.get('port'), () => {
    console.log(`app is listening at port 4000`)
})