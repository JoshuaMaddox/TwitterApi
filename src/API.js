import { get, put, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  sendSearch(search){
    console.log('search: ', search)
    get(`http://localhost:8000/twitter/${search}`)
      .then(res => {
        let { data } = res
        let newData = JSON.parse(data.body)
        let finalData = newData.statuses
        ServerActions.receiveTweets(finalData)
      })
      .catch(console.error)
  },

  addFav(id) { 
    put(`http://localhost:8000/twitter/${id}`)
      .then(res => {
        // let { data } = res
        // ServerActions.confirmFav(data)
      })
      .catch(console.error)
  },
}

export default API