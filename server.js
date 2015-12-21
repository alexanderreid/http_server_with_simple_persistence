'use strict';

var express = require('express');
var app = express();
var lureRouter = express.Router();

require('./routes/lure_routes')(lureRouter);

app.use('/tackle', lureRouter);

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
