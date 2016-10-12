import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Layout from './components/Layout';
import SearchTweets from './components/SearchTweets'




render(
  <div className="container">
    <Router history = {browserHistory}>
      <Route path = '/' component = {Layout}></Route>
      <Route path = '/search' component = {SearchTweets}/>
    </Router>
  </div>,
  document.getElementById('root')  
)