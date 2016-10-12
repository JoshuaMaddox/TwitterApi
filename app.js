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
      webpackHotMiddleware = require('webpack-hot-middleware')




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

// app.use('/api', require('./routes/api'))

//Search Tweets buy user input
app.get('/twitter/:q', (req, res) => {
  let searchTerm = req.params
  Tweets.searchTweets(searchTerm, (err, tweet) => {
    res.send(tweet)
  })
})

//Add to favorites\
app.put('/twitter', (req, res) => {
  let obj = req.query
  console.log('obj', obj)
  Tweets.addToFavs(obj, (err, newFavs) => {
    res.send(newFavs)
  })
})

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})