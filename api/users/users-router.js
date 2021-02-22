const express = require("express")
const router = express.Router()
const User = require('./users-model')


const restricted = (req,res,next) => {
    if(req.session && req.session.user){
        next()
    }else{
        res.status(401).json("you shall not pass!!!!!")
    }
}


router.get("/",restricted, (req, res) => {
    User.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.send(err.message));
  });
  
  
  
  
  module.exports = router