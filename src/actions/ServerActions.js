import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveTweets(tweets){
    AppDispatcher.dispatch({
      type: 'TWEETS_RECEIVED',
      payload: { tweets }
    }) 
  }
}
export default ServerActions


