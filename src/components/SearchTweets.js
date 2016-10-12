import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import SearchStore  from '../stores/SearchStore'
import { browserHistory } from "react-router";
import { Link } from "react-router"

export default class SearchTweets extends Component {
  constructor() {
    super();
    this.state = {
      searchResults: SearchStore.getSearchResults()
    }
    this._onChange = this._onChange.bind(this)
    this.sendSearch = this.sendSearch.bind(this)
  }

  componentWillMount() {
    SearchStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    SearchStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      searchResults: SearchStore.getSearchResults()
    })

  }

  sendSearch(e){
    e.preventDefault()
    const { term } = this.refs
    let searchTerm = term.value
    ToAPIActions.sendSearch(searchTerm)
  }

   addToFavs(e){
    e.preventDefault()
    let elmItem = document.getElementById(e.target.id)
    let id = elmItem.dataset.id
    let img = elmItem.dataset.img
    let name = elmItem.dataset.name
    let followers = elmItem.dataset.followers
    let text = elmItem.dataset.text
    let favObj = { id, img, name, followers, text}
    console.log("i am favObj in the component: ", favObj)
    ToAPIActions.addFav(favObj)
  }

  render() {

    const { searchResults } = this.state
    console.log('In the comp: ',  searchResults[0])
    let searchResponse;

    if(searchResults){
      searchResponse = searchResults.map((tweet, index) => {
        const { id, text, user, location } = tweet
        return ( 
      <div className="col-md-6 searchResultstweet text-center" key={id}>
            <img src={user.profile_image_url} alt=""/>
            <p>User: {user.name}</p>
            <p>Followers: {user.followers_count}</p>
            <p>Tweet: {text}</p>
            <button className='searchBtn' id={index} 
              data-id={id} 
              data-img={user.profile_image_url}
              data-name={user.name}
              data-followers={user.followers_count}
              data-text={text}
            onClick={this.addToFavs}>Add Me to Favorites</button>
          </div>
        )
      }) 
    } else {
      searchResponse = <div></div>
    }


    return (
        <div className="row topRow">
          <div className="nextRow">
            <div className="col-sm-6">
              <Link to='/' className="customBtn">Home</Link>
            </div>
            <div className="col-sm-6">
              <Link to='/favorites' className="customBtn">View Your Favorites</Link> 
            </div>
          </div>
          <div className="col-sm-8 col-sm-offset-2 searchForm">
            <h1>Tweet Search</h1>
              <form onSubmit={this.sendSearch}>
                <div className="form-group">
                  <input type="text" className="form-control" ref='term' id="term" placeholder="Enter a search term" required/>
                </div>
                <button type="submit" className="customBtn">Search</button>
              </form>
          </div>
          <div className="row text-center">
            {searchResponse}
          </div>
        </div>
    )
  }
}
