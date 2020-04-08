// var express = require('express');
// var router = express.Router();
// var User = require('../models/user');

// /* GET users listing. */
// // router.get('/', function(req, res, next) {
// //   res.send('respond with a resource');
// // });

// router.post('/register', function(req,res, next) { 
//  addtoDB(req,res);
// });


// async function addtoDB(req, res){
//   var user = new User({
//     email: req.body.email,
//     username:req.body.username,
//     password:User.hashPassword(req.body.password),
//     creation_date:Date.now()
//   });

//   try {
//     doc = await user.save();
//     return res.status(201).json(doc);
    
//   }
//   catch(err){
//     return res.status(501).json(err);

//   }
// }


// module.exports = router;



'use strict';

var express = require('express');
var app = express();


var router = express.Router();
var User = require('../models/user');

var passport = require('passport');


router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      return res.status(200).json({});
  };
  next();
});


//var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  dDate = Date(Date.now());

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_date: dDate
  });

  try {
    
    doc = await user.save();
    //console.log(doc);
    //console.log(res.status(201).json(doc));

    return res.send(doc);
    //return res.status(201).json(doc);
  }
  catch (err) {
    //console.log("catchhh");
    return res.status(501).json(err);
  }
}




router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});





router.get('/user',isValidUser,function(req,res,next){
  console.log(req.user);

  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

module.exports = router;
