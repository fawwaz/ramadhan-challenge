import createSocket from 'socket.io-client';
const socket = createSocket();

const listenTweet = cb => {
  socket.on('tweets', tweet => {
    cb(tweet);
  });
};

export { listenTweet };
