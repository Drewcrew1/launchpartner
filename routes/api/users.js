const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const keys = require('../../config/keys');
const formidable = require('formidable');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});
//@route get api/users/test
//@access Public
router.get('/test',(req,res) => {
   res.json({msg: "Users Works"});
});


let imageName;
router.post('/image',(req,res) => {

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //console.log(files.image.name);
        imageName = files.image.name.toLowerCase();
        console.log('imageName',imageName);
        // let file = JSON.stringify(files);

        let storage = 'launchpartner';
        let uploadParams = {Bucket: storage, Key: imageName, Body: ''};


        let fileStream = fs.createReadStream(files.image.path);
        fileStream.on('error', function (err) {
            console.log('file error1');
        });
        uploadParams.Body = fileStream;

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log('error2')
            }
            if (data) {
                console.log('upload success');
               res.json('success');
            }
        });

    });
});

//@route get api/users/register
//@access Public

router.post('/register',(req,res) => {


    User.findOne({
        email: req.body.email
    }).then((user) => {
        if(user){
            errors.email = 'Email Already Exists';
            return res.status(400).json(errors);
        }
        else{

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                image: imageName,
                password: req.body.password,
                description: req.body.description
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password,salt,(err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user) => {
                        res.json(user);
                    }).catch((err) => {
                        console.log(err);
                    });

                });
            });
        }
    }).catch((err) => {
        console.log(err);
    });
});
//@route get api/users/login
//@access Public
//changedkeyorsecret
router.post('/login', (req,res) => {

   const email = req.body.email;
   const password = req.body.password;

    User.findOne({ email }).then(user => {
        // Check for user
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = { id: user.id, name: user.name };
                // Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});

//@route get api/users/current
//@access Private
router.get('/current',passport.authenticate('jwt',{session: false}), (req,res) => {
    res.json(req.user);
});

//@route get api/users/current
//@access Public
router.get('/all', (req,res) => {
    User.find({},(err, users) => {
        if(err){
            console.log(err);
        } else{
            res.json(users);
        }
    });
});
router.post('/edit', passport.authenticate('jwt',{session: false}), (req,res) => {


    const profileFields = {};

    if(req.body.name) profileFields.name = req.body.name;
    if(req.body.description) profileFields.description = req.body.description;
    if(req.body.image) profileFields.image = req.body.image;


    User.findOneAndUpdate({
        _id: req.user.id
    },{
        $set: profileFields
    },{
        new: true
    }).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.log(err);
    });

});

module.exports = router;