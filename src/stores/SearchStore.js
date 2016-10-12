import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _searchResults = []
let _allFavorites = []

class SearchStore extends EventEmitter {
  constructor(){
    super()
    AppDispatcher.register(action => {
      switch(action.type) {
        case 'TWEETS_RECEIVED':
          _searchResults = action.payload.tweets
          this.emit('CHANGE')
          break
        case 'FAVS_RECEIVED':
          _allFavorites = action.payload.favs
          this.emit('CHANGE')
          break
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }

  getSearchResults(){
    return _searchResults
  }

  getFavoriteResults(){
    return _allFavorites
  }
}

export default new SearchStore