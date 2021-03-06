import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import request from 'superagent';
import styles from './styles';

export default class SNSLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      passwd: '',
      jump: '',
      msg: ''
    };
  }

  api(command) {
    request
      .get('/api/' + command)
      .query({
        userid: this.state.userid,
        passwd: this.state.passwd
      })
      .end((err, res) => {
        if (err) return;
        const r = res.body;
        console.log(r);
        if (r.status && r.token) {
          window.localStorage['sns_id'] = this.state.userid;
          window.localStorage['sns_auth_token'] = r.token;
          this.setState({jump: '/timeline'});
          return
        }
        this.setState({msg: r.msg})
      })
  }

  render() {
    if (this.state.jump) {
      return <Redirect to={this.state.jump}/>
    }
    const changed = (name, e) => this.setState({[name]: e.target.value});
    return (
      <div>
        <h1>ログイン</h1>
        <div style={styles.login}>
          ユーザID:<br/>
          <input value={this.state.userid}
                 onChange={e => changed('userid', e)}/><br/>
          パスワード:<br/>
          <input type='password' value={this.state.passwd}
                 onChange={e => changed('passwd', e)}/><br/>
          <button onClick={e => this.api('login')}>ログイン</button>
          <br/>
          <p style={styles.error}>{this.state.msg}</p>
          <p>
            <button onClick={e => this.api('addUser')}>
              ユーザ登録(初回)
            </button>
          </p>
        </div>
      </div>
    );
  }
}
