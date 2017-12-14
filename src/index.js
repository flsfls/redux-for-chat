import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

// import App from './App';
import Auth from './Auth.js'
import Dashboard from './Dashboard'
import { auth } from './Auth.redux'                                                                                                                                                                                                                                                                                                                                                 
import './config'

const store = createStore(auth, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))
// 登录, 没有登录信息, 统一跳转login
ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Auth}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Redirect to="/dashboard"></Redirect>
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
 document.getElementById('root'));
