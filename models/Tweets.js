const fs = require('fs'),
      path = require('path'),
      uuid = require('uuid'),
      Twitter = require('twitter'),
      userFavs = path.join(__dirname, '../data/userFavorites.json')

require('dotenv').load()

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.write = function(newData, cb) {
  let json = JSON.stringify(newData)
  fs.writeFile(userFavs, json, cb)
}


exports.searchTweets = function(searchParams, cb){
  client.get('search/tweets', searchParams, function(err, tweets, response) {
    if(err) return cb(err)
    cb(null, response)
  })
}

//Get all favs
exports.getAllFavs = function(cb){
  fs.readFile(userFavs, (err, buffer) => {
    if(err) return cb(err)
      try {
        var favs = JSON.parse(buffer)
      } catch(e) {
        var favs = []
      }
      cb(null, favs)
  })
}

//add to favs DELETE TO HERE
exports.addToFavs = function(favObj, cb) {
  console.log('I am favObj: ', favObj)
  console.log('I am favObj.id: ', favObj.id)
  let newArr;
  exports.getAllFavs((err, favs) => {
    if(err) return cb(err)
    newArr = favs.filter((fav) => {
      if(fav.id !== favObj.id) {
        return true
      }
    })
  newArr.push(favObj)
  console.log('newArr: ', newArr)
  exports.write(newArr) 
  cb(null, newArr)
  })
}



























// //Create a new flashcard
// exports.create = function(newCard, cb) {
//   exports.getCards((err, cards) => {
//     if(err) return cb(err)
//     newCard.id = uuid()
//     cards.push(newCard)
//     exports.write(cards, cb)
//   })
// }

// //Write to the businesses database
// exports.write = function(newData, cb) {
//   let json = JSON.stringify(newData)
//   fs.writeFile(bizDataBase, json, cb)
// }

// //Search For Businesses
// exports.searchYelp = function(searchTerms, cb) {
//   yelp.search(searchTerms)
//     .then((data) => {
//       cb(null, data) 
//     })
//     .catch((err) => {
//       cb(err)
//     })
// }

// //Search For Businesses by ID
// exports.singleOut = function(searchId, cb) {
//   yelp.business(searchId)
//     .then((data) => {
//       cb(null, data) 
//     })
//     .catch((err) => {
//       cb(err)
//     })
// }

// //add to favs DELETE TO HERE
// exports.putToFavs = function(searchId, cb) {
//   exports.getAllFavs((err, favs) => {
//     let newFavs = []
//       yelp.business(searchId)
//         .then((data) => {
//           newFavs = favs.filter((fav) => {
//             if(searchId !== fav.id) {
//               return fav
//             } 
//           })
//           newFavs.push(data)
//           exports.write(newFavs)
//           cb(null, data) 
//         })
//         .catch((err) => {
//           cb(err)
//         })
//       })
// }

// //Get all favs
// exports.getAllFavs = function(cb){
//   fs.readFile(bizDataBase, (err, buffer) => {
//     if(err) return cb(err)
//       try{
//         var favs = JSON.parse(buffer)
//       } catch(e) {
//         var favs = []
//       }
//       cb(null, favs)
//   })
// }

// //delete a fav
// exports.deleteFavs = function(searchId, cb) {
//   exports.getAllFavs((err, favs) => {
//     let newFavs = []
//     newFavs = favs.filter((fav) => {
//       if(searchId !== fav.id) {
//         return fav
//       } 
//     })
//     exports.write(newFavs)
//     cb(null, newFavs) 
//   })
// }