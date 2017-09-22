import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const users = [
  {id: 1, name: '山田くん', info: 'デザイン事業部'},
  {id: 2, name: '佐々木くん', info: 'Web1課 1チーム'},
  {id: 3, name: '吉田くん', info: 'Web2課 2チーム'}
];

const Header = () => (
  <div className='App'>
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h2>React Router test</h2>
    </div>
  </div>
);

const Footer = () => (
  <div className='App'>
    <div className="App-footer">
      <h2>＼(^o^)／</h2>
    </div>
  </div>
);

const App = () => (
  <Router>
    <div className='App'>
      <Header/>
      <div style={{margin: 20}}>
        <Switch>
          <Route path='/user/:id' component={UserCard}/>
          <Route component={UserList}/>
        </Switch>
      </div>
      <Footer/>
    </div>
  </Router>
);

class UserList extends React.Component {
  render() {
    const uList = users.map(u => (
      <li key={u.id}>
        <Link to={`/user/${u.id}`}>{u.name}</Link>
      </li>
    ));
    return (<ul className='App-inline'>{uList}</ul>)
  }
}

class UserCard extends React.Component {
  render() {
    const {params} = this.props.match;
    const id = parseInt(params.id, 10);
    const user = users.filter(u => u.id === id)[0];
    return (
      <div>
        <div>{id}: {user.name} - {user.info}</div>
        <div><Link to='/'>戻る</Link></div>
      </div>
    );
  }
}

export default App;
