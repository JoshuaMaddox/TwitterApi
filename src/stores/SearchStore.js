import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _searchResults = []

class SearchStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'TWEETS_RECEIVED':
        _searchResults = action.payload.tweets
        console.log('_searchResults: In SearchStore: ', _searchResults)
        this.emit('CHANGE')
        break
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.on('CHANGE', cb)
  }

  getSearchResults(){
    return _searchResults
  }

}

export default new SearchStore