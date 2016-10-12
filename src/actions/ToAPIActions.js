import API from '../API'

const ToAPIActions = {

  sendSearch(search){
  API.sendSearch(search)
  },

  addFav(id){
    API.addFav(id)
  }

}
export default ToAPIActions