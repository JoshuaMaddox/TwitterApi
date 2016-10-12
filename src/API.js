import { get, put, post } from 'axios'
import axios from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  sendSearch(search){
    get(`https://fierce-shelf-46768.herokuapp.com/twitter/${search}`)
      .then(res => {
        let { data } = res
        let newData = JSON.parse(data.body)
        let finalData = newData.statuses
        ServerActions.receiveTweets(finalData)
      })
      .catch(console.error)
  },

  addFav(favObj) { 
    const { followers, id, img, name, text } = favObj
    put(`https://fierce-shelf-46768.herokuapp.com/twitter?followers=${followers}&id=${id}&img=${img}&name=${name}&text=${text}`)
      .then(res => {
        let { data } = res
        ServerActions.receiveFavs(data)
      })
      .catch(console.error)
  },

  deleteFav(id) { 
    axios.delete(`https://fierce-shelf-46768.herokuapp.com/twitter/${id}`)
      .then(res => {
        let { data } = res
        ServerActions.receiveFavs(data)
      })
      .catch(console.error)
  },

  getAllFavs(){
    get(`https://fierce-shelf-46768.herokuapp.com/twitter/favorites`)
    .then(res => {
      let { data } = res
      ServerActions.receiveFavs(data)
    })
    .catch(console.error)
  }
}

export default API