import React, { Component } from 'react'
import { Link } from 'react-router' 

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='row mainContainer'>
        <div className="nextRow">
          <div className="col-sm-6">
            <Link className='customBtn' to='/search'>Search Twitter</Link>
          </div>
          <div className="col-sm-6">
            <Link className='customBtn' to='/favorites'>Favorite Tweets</Link>
          </div>
        </div>
      </div>

    )
  }
}
  