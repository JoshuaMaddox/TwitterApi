const express = require('express')
const Tweets = require('../models/Tweets')
const router = express.Router()

router.get('/favorites', (req, res) => {
  Tweets.getAllFavs((err, favs) => {
    res.send(favs)
  })
})

//Search Tweets buy user input
router.get('/:q', (req, res) => {
  let searchTerm = req.params
  Tweets.searchTweets(searchTerm, (err, tweet) => {
    res.send(tweet)
  })
})

//Add to favorites\
router.put('/', (req, res) => {
  let favObj = req.query
  Tweets.addToFavs(favObj, (err, newFavs) => {
    res.send(newFavs)
  })
})

//  DELETE FAVORITE
router.delete('/:id', (req, res) =>  {
  let id = req.params.id
  Tweets.deleteFavs(id, (err, newFavs) =>  {
    res.send(newFavs)
  })
})


module.exports = router
