var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer')
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  
});
router.post('/contact', function(req, res) {
  let {name,email,yourtext}=req.body;
  console.log(name,email,yourtext);
  var transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:'sachin875788@gmail.com ',
      pass:'sdzc exvn dnsc edgp'
    }
  });
  var mailOption={
    form:email,
    to:'sachin875788@gmail.com',
    subject:email,
    text:yourtext
  }
  transporter.sendMail(mailOption,function(error,info){
    if(error){
      console.log(error);
    }else{
      console.log("email send")
    }
    res.redirect("/")
  })


});

module.exports = router;
