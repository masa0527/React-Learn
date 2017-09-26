import React from 'react';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import Appbar from 'muicss/lib/react/appbar';
import ChatForm from './form';
import styles from './styles.js';
import socket from './socket';


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

export default ChatApp;
