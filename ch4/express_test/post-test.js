const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log(`起動しました。 http://localhost:3000`);
});

app.get('/', (req, res) => {
  res.send(
    `<form method="post">
        <textarea name="memo">テスト</textarea><br />
        <input type="submit" value="送信">
      </form>`
  );
});

app.post('/', (req, res) => {
  const s = JSON.stringify(req.body);
  res.send(`POST:${s}`);
});
