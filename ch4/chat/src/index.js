import React from 'react'
import ReactDOM from 'react-dom'
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';
import styles from './styles.js'
import socketio from 'socket.io-client'

const socket = socketio.connect('http://localhost:3001');

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', message: ''}
  }

  nameChanged(e) {
    this.setState({name: e.target.value})
  }

  messageChanged(e) {
    this.setState({message: e.target.value})
  }

  send() {
    socket.emit('chat-msg', {
      name: this.state.name,
      message: this.state.message
    });
    this.setState({message: ''})
  }

  render() {
    return (
      <Panel>
        <Input label='名前' floatingLabel={true} value={this.state.name}
               onChange={e => this.nameChanged(e)}/><br/>
        <Input label='メッセージ' floatingLabel={true} value={this.state.message}
               onChange={e => this.messageChanged(e)}/><br/>
        <Button color='primary' onClick={e => this.send()}>送信</Button>
      </Panel>
    )
  }
}

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    }
  }

  componentDidMount() {
    socket.on('chat-msg', (obj) => {
      const logs2 = this.state.logs;
      obj.key = 'key_' + (this.state.logs.length + 1);
      console.log(obj);
      logs2.unshift(obj);
      this.setState({logs: logs2})
    })
  }

  render() {
    const messages = this.state.logs.map(e => (
      <div key={e.key}>
        <div className="mui--divider-bottom">
          <span className='mui--text-display1 mui--text-accent'>{e.name}</span>
          <span className='mui--text-display1'>：</span>
          <span className='mui--text-display1'>{e.message}</span>
        </div>
      </div>

    ));
    return (
      <Container fluid={true}>
        <Appbar className="mui--z2">
          <div style={styles.h1} className='mui--text-display1'>リアルタイムチャット</div>
        </Appbar>
        <ChatForm/>
        <Panel>
          {messages}
        </Panel>
      </Container>
    )
  }
}

ReactDOM.render(
  <ChatApp/>,
  document.getElementById('root')
);
