import React, { Component } from "react"
import { Link } from "react-router"
import SearchStore from '../stores/SearchStore'
import ToAPIActions from '../actions/ToAPIActions'

export default class Favorites extends Component  {
  constructor() {
    super();
    
    this.state = {
      favoriteResults: SearchStore.getFavoriteResults()
    }
    this._onChange = this._onChange.bind(this)
    this.deleteFav = this.deleteFav.bind(this)
  }

  componentWillMount()  {
    ToAPIActions.getAllFavs()
    SearchStore.startListening(this._onChange)
  }

  componentWillUnmount()  {
    SearchStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      favoriteResults: SearchStore.getFavoriteResults()
    })
  }

  deleteFav(e) {
    e.preventDefault()
    let elmItem = document.getElementById(e.target.id)
    let id = elmItem.dataset.id
    ToAPIActions.deleteFav(id)
  }

  render() {

    const { favoriteResults } = this.state
    let favoriteResponse;

    if(favoriteResults)  {
      favoriteResponse = favoriteResults.map((tweet)  =>  {
        const { id, img, text, name, followers } = tweet
        return(
        <div className="row searchRowTop text-center"> 
          <div className="searchResultstweet text-center" key={id}>
            <img src={img} alt=""/>
            <p>User: {name}</p>
            <p>Followers: {followers}</p>
              <p>Tweet: {text}</p>
              <button className='searchBtn' ref='delBtn' id={id} data-id={id} onClick={this.deleteFav}>Delete Favorite</button>
          </div>
        </div>
          )
      })
    } else {
      favoriteResponse = <div></div>
    }

    return (
      <div className="row topRow">
        <div className="nextRow">
          <div className="col-sm-6">
            <Link to='/' className="customBtn">Home</Link>
          </div>
          <div className="col-sm-6">
            <Link to='/favorites' className="customBtn">Delete this Favorite</Link> 
          </div>
        </div>  
        <div className="row favoriteRow">
          {favoriteResponse}
        </div>
      
      </div>
    ) 
  }
}