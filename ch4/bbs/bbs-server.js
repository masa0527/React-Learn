// データベース接続
const Datastore = require('nedb');
const path = require('path');
const db = new Datastore({
  filename: path.join(__dirname, 'bbs.db'),
  autoload: true
});
// サーバー起動
const express = require('express');
const app = express();
const portNo = 3001;
app.listen(portNo, () => {
  console.log(`起動しました。http://localhost:${portNo}`);
});

app.use('/public', express.static('./public'));
app.get('/', (req, res) => {
  res.redirect(302, '/public');
});

// API
app.get('/api/getItems', (req, res) => {
  db.find({}).sort({stime: 1}).exec((err, data) => {
    if (err) {
      sendJSON(res, false, {logs: [], msg: err});
      return;
    }
    console.log(data);
    sendJSON(res, true, {logs: data});
  })
});

app.get('/api/write', (req, res) => {
  const query = req.query;
  db.insert({
    name: query.name,
    body: query.body,
    stime: (new Date()).getTime()
  }, (err, doc) => {
    if (err) {
      console.error(err);
      sendJSON(res, false, {msg: err});
      return;
    }
    sendJSON(res, true, {id: doc._id});
  })
});

function sendJSON(res, result, obj) {
  obj['result'] = result;
  res.json(obj);
}
