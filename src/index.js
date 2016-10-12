import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Layout from './components/Layout';
import SearchTweets from './components/SearchTweets'
import Favorites from './components/Favorites'



render(
  <div className="container">
    <Router history = {browserHistory}>
      <Route path = '/' component = {Layout}></Route>
      <Route path = '/search' component = {SearchTweets}/>
      <Route path = '/favorites' component = {Favorites}/>
    </Router>
  </div>,
  document.getElementById('root')  
)