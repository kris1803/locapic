var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({
    message: 'Welcome to the backend. This server uses websockets to communicate.'
  });
});

module.exports = router;
