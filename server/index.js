require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const twitter = require('twitter');
const path = require('path');

// const KEYWORD = '#DailyRamadanChallenge'
const KEYWORD = 'RamadhanChallenge';
const PORT = process.env.PORT || 5000;

const twitterClient = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const twitterStream = twitterClient.stream('statuses/filter', {
  track: KEYWORD,
});

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  var apiResponse = [];
  twitterClient.get(
    'search/tweets',
    {
      q: KEYWORD,
      count: 50,
    },
    function (error, tweets, response) {
      console.log(tweets);
      if (!error) {
        apiResponse = (tweets.statuses || []).map(function (tweet) {
          return {
            full_text: tweet.text,
            screen_name: tweet.user.screen_name,
            profile_image: tweet.user.profile_image_url_https,
          };
        });
      }
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(apiResponse));
    }
  );
});

// All remaining requests return the React app, so it can handle routing.
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
// });

io.sockets.on('connection', function (socket) {
  twitterStream.on('data', function (tweet) {
    if (tweet && tweet.extended_tweet && tweet.extended_tweet.full_text) {
      socket.emit('tweets', {
        full_text: tweet.extended_tweet.full_text,
        screen_name: tweet.user.screen_name,
        profile_image: tweet.user.profile_image_url_https,
      });
    }
  });

  twitterStream.on('error', function (error) {
    console.log(error);
    throw error;
  });
});

server.listen(PORT, function () {
  console.error(`Listening on port ${PORT}`);
});
