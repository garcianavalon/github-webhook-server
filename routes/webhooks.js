const express = require('express');
const router = express.Router();
const cmd = require('node-cmd');

/* CONFIGURE YOUR WEBHOOKS HERE */

// NOTE(garcianavalon) they get prefixed with /webhooks/ in app.js

/* Echo webhook for testing */
router.post('/test', function(req, res) {
  console.log('Received a POST to /webhooks/test with payload ', req.body);
  // just return the payload to check everything is ok
  res.json(req.body);
});

/* perform a git pull in the configured folder */
router.post('/auto-pull', function(req, res) {
  console.log('Received a POST to /webhooks/auto-pull with payload ', req.body);
  const FOLDER = process.env.AUTO_PULL_FOLDER || './';
  let TOKEN = process.env.GITHUB_OAUTH_TOKEN || '';
  if (TOKEN) TOKEN += '@';
  cmd.get(
      `
          cd ${FOLDER}
          git config --get remote.origin.url
      `,
      function(remoteUrl){
        console.log(`Executed git config --get remote.origin.url in ${FOLDER}, result: ${remoteUrl}`);
        const url = `https://${TOKEN}${remoteUrl.split('https://')[1]}`;
        console.log(`URL with token ${url}`);
        cmd.get(
          `
              git pull ${url}
          `,
          function(output){
            console.log(`Executed git pull ${url} in ${FOLDER}, result: ${output}`);
            res.send(`Executed git pull ${url} in ${FOLDER}, result: ${output}`);
          });      
      }
  );
});

module.exports = router;
