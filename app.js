const PORT = 8000,
      cors = require('cors'),
      path = require('path'),
      morgan = require('morgan'),
      express = require('express'),
      Twitter = require('twitter'),
      webpack = require('webpack'),
      Tweets = require('./models/Tweets'),
      bodyParser = require('body-parser'),
      webpackConfig = require('./webpack.config'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),

twitter = require('./routes/twitter')



//Express invocation
const app = express()

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Webpack Configuration
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

app.use('/twitter', require('./routes/twitter'))

// app.use('/api', require('./routes/api'))

//Get all favorites DELETE TO HERE
// app.get('/twitter/favorites', (req, res) => {
//   Tweets.getAllFavs((err, favs) => {
//     res.send(favs)
//   })
// })

// //Search Tweets buy user input
// app.get('/twitter/:q', (req, res) => {
//   let searchTerm = req.params
//   Tweets.searchTweets(searchTerm, (err, tweet) => {
//     res.send(tweet)
//   })
// })

// //Add to favorites\
// app.put('/twitter', (req, res) => {
//   let favObj = req.query
//   Tweets.addToFavs(favObj, (err, newFavs) => {
//     res.send(newFavs)
//   })
// })

// //  DELETE FAVORITE
// app.delete('/twitter/:id', (req, res) =>  {
//   let id = req.params.id
//   Tweets.deleteFavs(id, (err, newFavs) =>  {
//     res.send(newFavs)
//   })
// })

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})