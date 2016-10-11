var express = require('express');
var router = express.Router();

/* CONFIGURE YOUR WEBHOOKS HERE */
// NOTE(garcianavalon) they get prefixed with /webhooks/ in app.js
router.post('/test', function(req, res, next) {
  console.log('Received a POST to /webhooks/test with payload ', req.body);
  // just return the payload to check everything is ok
  res.json(req.body);
});

module.exports = router;
