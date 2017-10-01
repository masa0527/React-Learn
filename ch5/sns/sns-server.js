const db = require('./server/database');

const express = require('express');
const app = express();
const portNo = 3001;

app.listen(portNo, () => {
  console.log('起動しました。', `http://localhost:${portNo}`);
});

app.use('/public', express.static('./public'));
app.use('/login', express.static('./public'));
app.use('/users', express.static('./public'));
app.use('/timeline', express.static('./public'));
app.use('/', express.static('./public'));

// ユーザー追加
app.get('/api/addUser', (req, res) => {
  const userid = req.query.userid;
  const passwd = req.query.passwd;
  if (userid === '' || passwd === '') {
    return res.json({status: false, msg: 'パラメータが空'})
  }
  // 既存ユーザーチェック
  db.getUser(userid, (user) => {
    if (user) {
      return res.json({status: false, msg: '既にユーザーがいます'})
    }
    db.addUser(userid, passwd, (token) => {
      if (!token) {
        res.json({status: false, msg: 'DBエラー'})
      }
      res.json({status: true, token})
    })
  })
});

// ログイン
app.get('/api/login', (req, res) => {
  const userid = req.query.userid;
  const passwd = req.query.passwd;
  db.login(userid, passwd, (err, token) => {
    if (err) {
      res.json({status: false, msg: '認証エラー'});
      return
    }
    res.json({status: true, token})
  })
});

// 友達追加
app.get('/api/add_friend', (req, res) => {
  const userid = req.query.userid;
  const token = req.query.token;
  const friendid = req.query.friendid;
  db.checkToken(userid, token, (err, user) => {
    if (err) {
      res.json({status: false, msg: '認証エラー'});
      return
    }
    user.friends[friendid] = true;
    db.updateUser(user, (err) => {
      if (err) {
        res.json({status: false, msg: 'DBエラー'});
        return
      }
      res.json({status: true})
    })
  })
});

// 発言
app.get('/api/add_timeline', (req, res) => {
  const userid = req.query.userid;
  const token = req.query.token;
  const comment = req.query.comment;
  const time = (new Date()).getTime();
  db.checkToken(userid, token, (err, user) => {
    if (err) {
      res.json({status: false, msg: '認証エラー！'});
      return
    }
    const item = {userid, comment, time};
    db.timeLineDB.insert(item, (err, it) => {
      if (err) {
        res.json({status: false, msg: 'DBエラー！'});
        return
      }
      res.json({status: true, timelineid: it._id});
    })
  })
});

// ユーザ一覧取得
app.get('/api/get_allusers', (req, res) => {
  db.userDB.find({}, (err, docs) => {
    if (err) {
      return res.json({status: false})
    }
    const users = docs.map(e => e.userid);
    res.json({status: true, users})
  })
});

// ユーザ情報取得
app.get('/api/get_user', (req, res) => {
  const userid = req.query.userid;
  db.getUser(userid, (user) => {
    if (!user) {
      return res.json({status: false})
    }
    res.json({status: true, friends: user.friends})
  })
});

// 友達のタイムライン取得
app.get('/api/get_friends_timeline', (req, res) => {
  const userid = req.query.userid;
  const token = req.query.token;
  db.getFriendsTimeLine(userid, token, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err.toString()});
      return
    }
    res.json({status: true, timelines: docs})
  })
});