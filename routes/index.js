var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  
});

router.get('/project', function(req, res) {
  res.render('project');
  
});

router.get('/resume', function(req, res) {
  res.render('resume');
  
});

router.get('/contact', function(req, res) {
  // res.render('resume');
  res.send("work on Progress")
  
});
router.get('/about', function(req, res) {
  // res.render('resume');
  res.send("work on Progress")
});


router.get('/skills', function(req, res) {
  res.render('skills');
});




module.exports = router;
