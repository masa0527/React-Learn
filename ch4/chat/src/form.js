import React from 'react';
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';
import socket from './socket';

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

export default ChatForm;
