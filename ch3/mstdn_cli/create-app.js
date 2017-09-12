const Mastodon = require('mastodon-api');
const fs = require('fs');
const path = require('path');

const instanceUrl = 'https://pawoo.net';
const clientName = 'MasdonCli';
const saveFile = path.join(__dirname, 'cli-app.json');

Mastodon.createOAuthApp(instanceUrl + '/api/v1/apps', clientName)
  .catch(err => console.error(err))
  .then(res => {
    console.log(res);
    fs.writeFileSync(saveFile, JSON.stringify(res));
  });
