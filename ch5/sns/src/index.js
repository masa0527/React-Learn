import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import SNSUsers from './users';
import SNSTimeline from './timeline';
import SNSLogin from './login';

const SNSApp = () => (
  <Router>
    <div>
      <Switch>
        <Route path='/users' component={SNSUsers}/>
        <Route path='/timeline' component={SNSTimeline}/>
        <Route path='/login' component={SNSLogin}/>
        <Route component={SNSLogin}/>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  <SNSApp/>,
  document.getElementById('root'));
