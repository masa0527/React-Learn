import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>React <span role="img" aria-labelledby="emoji">😇</span></h2>
        </div>
        <p className="App-intro">
          <span role="img" aria-labelledby="emoji"> 😇 </span>
          create-react-app
          <span role="img" aria-labelledby="emoji"> 😇 </span>
        </p>
      </div>
    );
  }
}

export default App;
