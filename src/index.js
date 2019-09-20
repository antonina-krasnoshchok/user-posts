import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import PostList from './modules/posts/components/PostList';
import Post from './modules/posts/components/Post';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <Switch>
        <Route exact path = '/posts' component = {PostList} />
        <Route exact path= '/posts/:id' component = {Post}/>
        <Redirect to ='/posts'/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
