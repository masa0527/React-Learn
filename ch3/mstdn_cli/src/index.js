import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import fs from 'fs';
import path from 'path';
import Mastodon from 'mastodon-api';
import {styles} from './styles.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.apiUri = 'https://pawoo.net/api/v1/';
    this.loadInfo();
    this.state = {
      tootData: '',
      timeLines: []
    };
  }

  componentWillMount() {
    this.loadTimeLines();
    setInterval(() => {
      this.loadTimeLines();
    }, 1000 * 30);
  }

  loadInfo() {
    const f = path.join('token.json');
    try {
      fs.statSync(f);
    }
    catch (err) {
      window.alert('先にアクセストークンを取得してください。');
      window.close();
      return;
    }
    this.token = fs.readFileSync(f);
    this.mastdn = new Mastodon({
      access_token: this.token,
      timeout_ms: 60 * 1000,
      api_url: this.apiUri
    });
  }

  loadTimeLines() {
    this.mastdn.get('timelines/home', {})
      .then(res => {
        this.setState({timeLines: res.data});
      });
  }

  handleText(e) {
    this.setState({tootData: e.target.value});
  }

  toot() {
    this.mastdn.post(
      'statuses',
      {status: this.state.tootData},
      (err, data, res) => {
        if (err) {
          console.error(err);
          return;
        }
        this.setState({tootData: ''});
        this.loadTimeLines();
      }
    );
  }

  render() {
    return (
      <div>
        <div style={styles.editorPad}>
          <h1 style={styles.title}>マストドンのクライアント</h1>
          <textarea
            style={styles.editor}
            value={this.state.tootData}
            onChange={e => this.handleText(e)}/>
          <div>
            <button onClick={() => this.toot()}>トゥート</button>
          </div>
        </div>
        <div style={{marginTop: 120}}/>
        {this.renderTimeLines()}
      </div>
    );
  }

  renderTimeLines() {
    const lines = this.state.timeLines.map(e => {
      console.log(e);
      let memo = null;
      if (e.reblog) {
        memo = (<p style={styles.reBlog}>
          {e.account.display_name}さんがブーストしました
        </p>);
        e = e.reblog;
      }
      return (
        <div key={e.id} style={styles.content}>
          <img style={styles.avatar}
               src={e.account.avatar}/>
          <div style={styles.cText}>
            {memo}{e.account.display_name}
            <span dangerouslySetInnerHTML={{__html: e.content}}/>
          </div>
          <div style={{clear: 'both'}}></div>
        </div>
      );
    });
    return (
      <div>
        <h2 style={styles.title}>タイムライン</h2>
        {lines}
      </div>
    );
  }
}

ReactDOM.render(<App/>,
  document.getElementById('root'));
