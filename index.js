require('dotenv').config();
var express = require('express');
var app = express();
const path = require('path');

const port = process.env.PORT || 3000;

const contactQueries = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/contact', function (req, res) {
  let { namee, email, yourtext } = req.body;

  contactQueries.push({
    name: namee,
    email: email,
    message: yourtext,
    date: new Date()
  });

  res.redirect('/');
});

app.get('/show', (req, res) => {
  res.json(contactQueries);
});

app.listen(port, () => {
  console.log("app running...");
});