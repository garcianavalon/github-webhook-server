var express = require('express');
var router = express.Router();

/* CONFIGURE YOUR WEBHOOKS HERE */
// NOTE(garcianavalon) they get prefixed with /webhooks/ in app.js
router.post('/test', function(req, res, next) {
  // TODO(garcianavalon) console.log something
});

module.exports = router;
