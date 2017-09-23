import React from 'react';
import request from 'superagent';
import styles from './styles';

class BBSForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      body: ''
    };
  }

  nameChanged(e) {
    this.setState({name: e.target.value});
  }

  bodyChanged(e) {
    this.setState({body: e.target.value});
  }

  postMessage() {
    if(!this.state.name || !this.state.body) return;
    request
      .get('/api/write')
      .query({
        name: this.state.name,
        body: this.state.body
      })
      .end((err, data) => {
        if (err) {
          console.error(err);
        }
        this.setState({body: ''});
        if (this.props.onPost) {
          this.props.onPost();
        }
      })
  }

  render() {
    return (
      <div style={styles.card}>
        名前:<br/>
        <input type='text' value={this.state.name}
               onChange={e => this.nameChanged(e)}/><br/>
        本文:<br/>
        <input type='text' value={this.state.body} size='60'
               onChange={e => this.bodyChanged(e)}/><br/>
        <button style={styles.btn} onClick={e => this.postMessage()}>発言</button>
      </div>
    );
  }
}

export default BBSForm;
