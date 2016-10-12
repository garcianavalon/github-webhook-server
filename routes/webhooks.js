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

const _buildUrl = function(baseUrl) {
  const TOKEN = process.env.GITHUB_OAUTH_TOKEN || '';
  if (TOKEN){
    console.log('Using github oauth token');
    return `https://${TOKEN}@${baseUrl.split('https://')[1]}`;
  }

  const PASSWORD = process.env.BITBUCKET_APP_PASSWORD || '';
  const USERNAME = process.env.BITBUCKET_USERNAME || '';
  if (USERNAME && PASSWORD){
    console.log('Using bitbucket username and app password');
    return `https://${USERNAME}:${PASSWORD}@${baseUrl.split('https://')[1]}`;
  }

  console.log('Using base remote url with no extra auth');
  return baseUrl;
};

/* perform a git pull in the configured folder */
router.post('/auto-pull', function(req, res) {
  console.log('Received a POST to /webhooks/auto-pull with payload ', req.body);
  const FOLDER = process.env.AUTO_PULL_FOLDER || './';

  cmd.get(
      `
          cd ${FOLDER}
          git config --get remote.origin.url
      `,
      function(remoteUrl){
        console.log(`Executed git config --get remote.origin.url in ${FOLDER}, result: ${remoteUrl}`);
        const url = _buildUrl(remoteUrl);
        console.log(`URL ${url}`);
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
