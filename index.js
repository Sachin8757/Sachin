var express = require('express');
var app = express();
var nodemailer=require('nodemailer')
const path=require('path')
/* GET home page. */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.render('index');
  
});
app.get('/project', function(req, res) {
  res.render('project');
  
});
app.post('/contact', function(req, res) {
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

app.listen("3000",()=>{
    console.log("app rungin...")
})
