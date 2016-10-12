import React, { Component } from 'react'
import SearchStore from '../stores/SearchStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router' 

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      // testData: SearchStore.getAllFlashCards()
    }

    // this.testFunc = this.testFunc.bind(this)
    // this._onChange = this._onChange.bind(this)
  }

  // componentWillMount() {
  //   SearchStore.startListening(this._onChange);
  // }

  // componentWillUnmount() {
  //   SearchStore.stopListening(this._onChange);
  // }

  // _onChange() {
  //   this.setState({ 
  //     // testData: SearchStore.getAllFlashCards() 
  //   })
  // }



  render() {
    return (
      <div>
        {this.state.testData ? <h1>{this.state.testData}</h1> : <h1>Twitter API</h1> }
        <Link to='/search'>Search Twitter</Link>
      </div>

    )
  }
}
  