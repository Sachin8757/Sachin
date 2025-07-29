require('dotenv').config();
var express = require('express');
var app = express();
var nodemailer = require('nodemailer')
const path = require('path')
var Project = require('./model/project');
const port = process.env.PORT || 3000;
const multer = require('multer')
const { storage } = require('./cloudConfig.js')
const upload = multer({ storage })

/* GET home page. */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.render('index');

});
app.get('/project', async function (req, res) {
  const projects = await Project.find();
  res.render('project',{projects});

});
app.post('/contact', function (req, res) {
  let { namee, email, yourtext } = req.body;
  console.log(namee, email, yourtext);
  // var transporter=nodemailer.createTransport({
  //   service:"gmail",
  //   auth:{
  //     user:'sachin875788@gmail.com ',
  //     pass:'sdzc exvn dnsc edgp'
  //   }
  // });
  // var mailOption={
  //   form:email,
  //   to:'sachin875788@gmail.com',
  //   subject:email,
  //   text:yourtext
  // }
  // transporter.sendMail(mailOption,function(error,info){
  //   if(error){
  //     console.log(error);
  //   }else{
  //     console.log("email send")
  //   }
  //   res.redirect("/")
  // })


});

app.get('/addproject', function (req, res) {
  res.render('addproject');
})
app.post('/addproject', upload.single('image'), async (req, res) => {
  console.log(req.file);
  let { title, github, live } = req.body;
  let image = req.file.path;
  let project = new Project({
    title: title,
    github: github,
    live: live,
    image: image
  });
  try {
    await project.save();
    res.redirect('/project');
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("app rungin...")
})
