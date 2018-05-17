# Ramadhan Challenge

## Background
Ramadan is coming. Sometimes I saw myself misusing the time like playing games for the whole day, sleeping for hours, or any other non-beneficial activities, just to wait the sunset. Ironically in this month, every single activities will be rewarded multiple times. It is something like XP boost if you playing games.

The problem lies on our mindset that we don't know what to do to wait the sunset. We don'have any challengging activities which you may think it as a game quest so we don't use our time correctly. We don't have enough environment to support our Ramadhan transformation so we prefer time-killing activities.

Considering the problem above, I create this website such people can challenge themselves or propose a challenge for others. I hope it may become a movement and environment to help us using our time much more effective especially in Ramadhan.

## Technical Notes
RamadhanChallenge (RC) has 2 component.
1. Server  
It uses [Express](https://expressjs.com), [Socket.IO](https://socket.io) for streaming the twitter data and [Twitter client library](https://github.com/desmondmorris/node-twitter)
2. Client  
It uses [React](https://reactjs.org). Because the application is very small, I decide to not use [Redux](https://redux.js.org) at all. 

## How it Works 
First, it will retrieve 50 tweets containing `#RamadhanChallenge` hashtag. It will select randomly from those tweets. At the same time, it will subscribe to twitter stream such if there any new tweets containing that hashtag, it will be streamed to the client in real time.

## Caveats
You may experience some error / blank challenge because of [Twitter 15 minutes window rate limit](https://developer.twitter.com/en/docs/basics/rate-limiting)

## Disclaimer
I'm not responsible to any content displayed because it is streamed directly to this website. I don't have any control to filter out specific inappropriate tweets as some user may abuse the hashtag for their purposes.
## Credits
This repo is built on [heroku-cra-node](https://github.com/mars/heroku-cra-node). All styling follows Yangshun's [commitbait](https://github.com/yangshun/commitbait)
