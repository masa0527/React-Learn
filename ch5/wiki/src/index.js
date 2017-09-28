import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import wikiEdit from './edit';
import wikiShow from './show';

const App = () => (
  <Router>
    <div>
      <Route path='/wiki/:name' component={wikiShow}/>
      <Route path='/edit/:name' component={wikiEdit}/>
    </div>
  </Router>
);

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
