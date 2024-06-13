var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  
});

router.get('/project', function(req, res) {
  // res.render('index');
  res.send("this page is under creating")
  
});

router.get('/resume', function(req, res) {
  res.render('resume');
  
});


module.exports = router;
