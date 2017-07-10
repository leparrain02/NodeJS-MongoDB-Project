var express = require('express');
var router = express.Router();

var customers = [
 { "name" : "Marc Gauthier", "phone" : "418-123-4567"},
 { "name" : "Master Chief", "phone" : "418-789-4561"}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('customers', { title: 'Customers', customers: customers });
});

module.exports = router;
