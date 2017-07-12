var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

var dbuser = process.env.DBUSER || 'admin';
var dbpassword = process.env.DBPASSWORD || 'admin';
var dbserver = process.env.DBSERVER || 'localhost';
var dbport = process.env.DBPORT || '27017';
var dbname = process.env.DBNAME || 'mydb';

var url = "mongodb://" + dbuser + ":" + dbpassword + "@" + dbserver + ":" + dbport + "/" + dbname;

/*
var customers = [
 { "name" : "Marc Gauthier", "phone" : "418-123-4567"},
 { "name" : "Master Chief", "phone" : "418-789-4561"}
];
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoClient.connect(url, function(err, db) {
    if (err){
      console.log(err);
      res.render('customers', { title: 'Customers', customers: [], errmsg: err });
    } else {
      db.collection("customers").find().toArray(function(err, result) {
        if (err) {
          console.log(err);
          res.render('customers', { title: 'Customers', customers: [], errmsg: err });
        } else {
          res.render('customers', { title: 'Customers', customers: result, errmsg: ''});
        }
        db.close();
      });
    }
  });
});

router.post('/addCustomer', function(req, res, next){
  var customer = req.body;
  console.log(customer);
  mongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
      var response={statut: "ERROR", errmsg: err};
      res.send(response);
    } else {
      db.collection("customers").insertOne(customer, function(err, result) {
        if (err){
          console.log(err);
          var response={statut: "ERROR", errmsg: err};
          res.send(response);
        } else {
          var response={statut: "OK", errmsg: ''};
          res.send(response);
        }
        db.close();
      });
    }
  });
});

module.exports = router;
