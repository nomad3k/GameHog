import 'core-js/fn/object/assign';
// import 'react-mdl/extra/css/material.orange-blue.min.css';
// import 'react-mdl/extra/material.js';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';

import Startup from './container/startup';
import Homepage from './container/homepage';
import LoginPage from './container/login';
import LogoutPage from './container/logout';
import RegisterPage from './container/register';
import UnregisterPage from './container/unregister';
import NotFound from './components/not-found';

import createStore from './store/store';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Startup>
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/logout' component={LogoutPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/unregister' component={UnregisterPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Startup>
  </Provider>,
  document.getElementById('app')
);
