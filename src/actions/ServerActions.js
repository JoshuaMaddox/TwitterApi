import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveTweets(tweets){
    AppDispatcher.dispatch({
      type: 'TWEETS_RECEIVED',
      payload: { tweets }
    }) 
  },

  receiveFavs(favs){
    AppDispatcher.dispatch({
      type: 'FAVS_RECEIVED',
      payload: { favs }
    }) 
  }
}
export default ServerActions


