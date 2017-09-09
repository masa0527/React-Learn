import React, {Component} from 'react';
import request from 'superagent';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      value: props.value
    };
  }

  componentWillMount() {
    request.get('./fruits.json')
      .accept('application/json')
      .end((err, res) => {
        this.loadedJson(err, res);
      });
  }

  loadedJson(err, res) {
    if (err) {
      console.log(err);
      return;
    }
    this.setState({
      items: res.body
    });

  }

  doChange(e) {
    this.setState({value: e.target.value})
  }

  render() {
    if (!this.state.items) {
      return <div className='App'>読み込み中</div>
    }
    const options = this.state.items.map(e => {
      return <option value={e.price} key={e.name}>{e.name}</option>
    });
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <div className='App-intro'>
          果物: <select value={this.state.value} onChange={e => this.doChange(e)}>{options}</select>
        </div>
        <div>{this.state.value}</div>
      </div>
    );
  }
}

export default App;
