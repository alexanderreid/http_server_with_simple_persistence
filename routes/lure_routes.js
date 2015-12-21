'use strict';

var fs = require('fs');
var bodyparser = require('body-parser');
var path = require('path');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/lures', function (req, res) {
    fs.readdir('./data', function (err, files) {
      if (err) throw err;
      if (files.length === 0) {
        res.json({msg: 'There are no lures in your fishing tackle'});
        return;
      }
      res.json(files);
    });
  });

  router.get('/lures/:title', function (req, res) {
    var fileName = 'data/' + req.params.title + '.json';
    fs.readFile(fileName, function (err, data) {
      if (err) {
        res.json({msg: 'No lures for that fish species exist in your fishing tackle.'});
        res.end();
      }
      res.send(data.toString());
      res.end();
    });
  });

  router.post('/lures', function (req, res) {
    var newLure = JSON.stringify(req.body);
    var fileName = 'data/' + req.body.title.split(' ').join('_') + '.json';
    fs.writeFile(fileName, newLure, function (err) {
      if (err) throw err;
    });
    res.json({msg: req.body.title +' has been added to your fishing tackle.'});
  });

  router.delete('/lures/:title', function (req, res) {
    var fileName = 'data/' + req.params.title + '.json';
    fs.unlink(fileName, function (err) {
      if (err) throw err;
    });
    res.json({msg: req.params.title + ' has been removed from your fishing tackle.'});
  });

  router.patch('/lures/:title', function (req, res) {
    var fileName = 'data/' + req.params.title + '.json';
    var toAppend = JSON.stringify(req.body);
    fs.appendFile(fileName, toAppend, function (err) {
      if (err) throw err;
    });
    res.json({msg: req.params.title + ' updated in your fishing tackle.'});
  });

  router.put('/lures/:title', function (req, res) {
    var fileName = 'data/' + req.params.title + '.json';
    var newLure = JSON.stringify(req.body);
    fs.unlink(fileName, function (err) {
      if (err) throw err;
    });
    fs.writeFile(fileName, newLure, function (err) {
      if (err) throw err;
    });
    res.json({msg: req.params.title + ' replaced in your fishing tackle.'});
  });
};
