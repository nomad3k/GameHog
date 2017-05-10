import 'core-js/fn/object/assign';
// import 'react-mdl/extra/css/material.orange-blue.min.css';
// import 'react-mdl/extra/material.js';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';

import Homepage from './container/homepage';
import Lipsum from './components/lipsum';
import NotFound from './components/not-found';

import createStore from './store/store';

var store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/lipsum' component={Lipsum} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
