import React from 'react';
import request from 'superagent';
import styles from './styles';
import BBSForm from './BBSForm';

class BBSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    this.loadLogs();
    setInterval(() => {
      this.loadLogs()
    }, 5000)
  }

  loadLogs() {
    request
      .get('/api/getItems')
      .end((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        this.setState({items: data.body.logs});
      })
  }

  render() {
    const itemsHtml = this.state.items.map(item => (
      <li style={styles.li} key={item._id}>{item.name} - {item.body}</li>
    ));
    return (
      <div>
        <h1 style={styles.h1}>掲示板</h1>
        <BBSForm onPost={() => this.loadLogs()}/>
        <p style={styles.right}>
          <button style={styles.btn} onClick={() => this.loadLogs()}>再読込</button>
        </p>
        <ul style={styles.ul}>{itemsHtml}</ul>
      </div>
    );
  }
}

export default BBSApp;
