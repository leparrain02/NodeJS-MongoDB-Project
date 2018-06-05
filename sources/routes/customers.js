var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

var dbuser = process.env.DBUSER || 'userdev';
var dbpassword = process.env.DBPASSWORD || 'qwerty';
var dbserver = process.env.DBSERVER || 'localhost';
var dbport = process.env.DBPORT || '25017';
var dbname = process.env.DBNAME || 'mydb';
var title = process.env.TITLE || 'Customers DevOPS'

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
      res.render('customers', { title: title, customers: [], errmsg: err.name + ': ' + err.message });
    } else {
      db.collection("customers").find().toArray(function(err, result) {
        if (err) {
          console.log(err);
          res.render('customers', { title: title, customers: [], errmsg: err.name + ': ' + err.message });
        } else {
          res.render('customers', { title: title, customers: result, errmsg: ''});
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
      var response={statut: "ERROR", errmsg: err.name + ': ' + err.message};
      res.send(response);
    } else {
      db.collection("customers").insertOne(customer, function(err, result) {
        if (err){
          console.log(err);
          var response={statut: "ERROR", errmsg: err.name + ': ' + err.message};
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
