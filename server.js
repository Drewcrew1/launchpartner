const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./routes/api/users');
const formidable = require('formidable');
const fs = require('fs');
const keys = require('./config/keys');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db,{useNewUrlParser: true}).then(() => {
    console.log('mongo connected');
}).catch((err) => {
    console.log(err);
});

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);



//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 7000;


app.listen(PORT);