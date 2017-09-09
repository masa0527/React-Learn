const request = require('superagent');

const URL = 'http://localhost:3000/fruits.json';
request.get(URL)
  .end(callBackGet);

function callBackGet(err, res) {
  if (err) {
    return;
  }
  console.log(res.body);
}
