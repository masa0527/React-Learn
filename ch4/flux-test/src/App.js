import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Actions } from  './actions';
import { nameStore, messageStore } from  './stores';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: ''
    };
    // Viewとstoreを結びつける
    nameStore.onChange = () => {
      this.setState({name: nameStore.name});
    };

    messageStore.onChange = () => {
      this.setState({message: messageStore.message})
    };
  }

  render() {
    console.log('View.render');
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React flux Test</h2>
        </div>
        <p className="App-intro">
          <div>
            <input
            value={this.state.name}
            onChange={(e) => Actions.changeName(e.target.value)}/>
            <button onClick={() => Actions.submitName()}>登録</button>
          </div>
          <div>{this.state.message}</div>
        </p>
      </div>
    );
  }
}

export default App;
