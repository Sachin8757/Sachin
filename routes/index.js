var express = require('express');
var router = express.Router();
const userModel = require('./data')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/login', function(req, res) {
  res.render('login');
});
router.post("/login", function (req, res, next) {
  const user= userModel.create({
    username:req.body.username,
    password:req.body.password
  })
  // res.send(user)
  res.redirect('/recharge');
})


router.get('/recharge', function(req, res) {
  res.render('recharge');

});
router.post("/recharge", function (req, res, next) {
  res.redirect("/success");
})

router.get('/success', function(req, res) {
  res.render('success');

});


module.exports = router;
