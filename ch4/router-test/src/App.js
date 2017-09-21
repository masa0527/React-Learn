import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <Router>
    <div style={{margin: 20}}>
      <Header/>
      <div>
        <Route exact path='/' component={Home}/>
        <Route path='/page1' component={Page1}/>
        <Route path='/page2' component={Page2}/>
        <Route path='/page3' component={Page3}/>
      </div>
      <Footer/>
    </div>
  </Router>
);

const Header = () => (
  <div className='App'>
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h2>Welcome to React</h2>
    </div>
  </div>
);

const Footer = () => (
  <div className='App'>
    <div className="App-footer">
      <img src={logo} className="App-logo" alt="logo"/>
    </div>
  </div>
);

const Home = () => (
  <div className='App'>
    <h1>Home App</h1>
    <p>ページを選択してください</p>
    <ul>
      <li className='App-inline'><a href='/page1'>ページ1</a></li>
      <li className='App-inline'><a href='/page2'>ページ2</a></li>
      <li className='App-inline'><a href='/page3'>ページ3</a></li>
    </ul>
  </div>
);

const Page1 = () => (
  <div className='App'>
    <h1>ページ1</h1>
    <p><a href='/'>戻る</a></p>
  </div>
);

const Page2 = () => (
  <div className='App'>
    <h1>ページ2</h1>
    <p><a href='/'>戻る</a></p>
  </div>
);

const Page3 = () => (
  <div className='App'>
    <h1>ページ3</h1>
    <p><a href='/'>戻る</a></p>
  </div>
);


export default App;
