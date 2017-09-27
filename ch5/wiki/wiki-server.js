const path = require('path');
const dataStore = require('nedb');
const express = require('express');
const bodyParser = require('body-parser');

const db = new dataStore({
  filename: path.join(__dirname, 'wiki.db'),
  autoload: true
});

const app = express();
const portNo = 3001;

app.use(bodyParser.urlencoded({extended: true}));

app.listen(portNo, () => {
  console.log('起動しました。', `http://localhost:${portNo}`);
});

app.get('/api/get/:wikiname', (req, res) => {
  const wikiName = req.params.wikiname;
  db.find({name: wikiName}, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err});
      return
    }
    if (docs.length === 0) {
      docs = [{name: wikiName, body: ''}]
    }
    res.json({status: true, data: docs[0]})
  })
});

app.post('api/put/:wikiname', (req, res) => {
  const wikiName = req.params.wikiname;
  console.log(`/api/put/${wikiName}`, req.body);
  db.find({'name': wikiName}, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err});
      return;
    }
    const body = req.body.body;
    if (docs.length === 0) {
      db.insert({name: wikiName, body});
    } else {
      db.update({name: wikiName}, {name: wikiName, body});
    }
    res.json({status: true});
  });
});

app.use('/wiki/:wikiname', express.static('./public'));
app.use('/edit/:wikiname', express.static('./public'));
app.get('/', (req, res) => {
  res.redirect(302, '/wiki/FrontPage')
});
