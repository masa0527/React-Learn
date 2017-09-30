const path = require('path');
const neDB = require('nedb');

const userDB = new neDB({
  filename: path.join(__dirname, 'user.db'),
  autoload: true
});

const timeLineDB = new neDB({
  filename: path.join(__dirname, 'timeline.db'),
  autoload: true
});

// ハッシュ値を取得
function getHash(pw) {
  const salt = '::EVuCM0QwfI48Krpr';
  const crypto = require('crypto');
  const hashsum = crypto.createHash('sha512');
  hashsum.update(pw + salt);
  return hashsum.digest('hex');
}

// トークン生成
function getAuthToken(userid) {
  const time = (new Date()).getTime();
  return getHash(`${userid}:${time}`);
}

// ユーザー検索
function getUser(userid, callback) {
  userDB.findOne({userid}, (err, user) => {
    if (err || user === null) {
      return callback(null);
    }
    callback(user)
  })
}

// ユーザー追加
function addUser(userid, pw, callback) {
  const hash = getHash(pw);
  const token = getAuthToken(userid);
  const regDoc = {userid, hash, token, friends: {}};
  userDB.insert(regDoc, (err, newDoc) => {
    if (err) {
      return callback(null);
    }
    callback(token)
  })
}

// ログイン
function login(userid, pw, callback) {
  const hash = getHash(pw);
  const token = getAuthToken(userid);
  getUser(userid, (user) => {
    if (!user || user.hash !== hash) {
      return callback(new Error('認証エラー！'), null);
    }
    user.token = token;
    updateUser(user, (err) => {
      if (err) {
        return callback(err, null)
      }
    })
  })
}

// トークン確認
function checkToken(userid, token, callback) {
  getUser(userid, (user) => {
    if (!user || user.token !== token) {
      return callback(new Error('認証失敗！'), null);
    }
    callback(null, user)
  })
}

// ユーザ更新
function updateUser(user, callback) {
  userDB.update({userid: user.userid}, user, {}, (err, n) => {
    if (err) return callback(err, null);
    callback(null)
  })
}

function getFriendsTimeLine(userid, token, callback) {
  checkToken(userid, token, (err, user) => {
    if (err) {
      return callback(new Error('認証に失敗！'), null);
    }
    const friends = [];
    for (const i in user.friends) {
      friends.push(i)
    }
    friends.push(userid);
    timeLineDB
      .find({userid: {$in: friends}})
      .sort({time: -1})
      .limit(20)
      .exec((err, docs) => {
        if (err) {
          callback(new Error('DBエラー！'), null);
          return
        }
        callback(null, docs)
      })
  })
}

module.exports = {
  userDB, timeLineDB, getUser, addUser, login, checkToken, updateUser, getFriendsTimeLine
};
