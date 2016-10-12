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

  addFav(favObj) { 
    console.log('favObj: ', favObj)
    const { followers, id, img, name, text } = favObj
    put(`http://localhost:8000/twitter?followers=${followers}&id=${id}&img=${img}&name=${name}&text=${text}`)
      .then(res => {
        // let { data } = res
        // ServerActions.confirmFav(data)
      })
      .catch(console.error)
  },
}

export default API