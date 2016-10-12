import API from '../API'

const ToAPIActions = {

  sendSearch(search){
  API.sendSearch(search)
  },

  addFav(id){
    API.addFav(id)
  },

  deleteFav(id){
    API.deleteFav(id)
  },

  getAllFavs(){
    API.getAllFavs()
  }

}
export default ToAPIActions