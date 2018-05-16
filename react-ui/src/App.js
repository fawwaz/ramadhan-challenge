import React, { Component } from 'react';
import { listenTweet } from './utils/listenTweet';
import getRandomItem from './utils/randomItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTweet: null,
      loading: true,
      tweets: [],
    };
  }

  componentDidMount() {
    listenTweet((tweet) => {
      this.setState(currState => ({
        tweets: currState.tweets.concat([tweet])
      }))
    })
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(tweets => {
        const randomTweet = getRandomItem(tweets)
        this.setState({
          tweets: tweets,
          loading: false,
          selectedTweet: randomTweet,
        });
      }).catch(e => {
        this.setState({
          selectedTweet: `API call failed: ${e}`,
          loading: false
        });
      })
  }

  generateChallenge = () => {
    this.fakeLoading(1000).then(() => {
      const { tweets } = this.state;
      const randomTweet = getRandomItem(tweets);
      this.setState({ selectedTweet: randomTweet });
    })
  }

  fakeLoading = (duration) => {
    return new Promise(resolve => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
        resolve();
      }, duration)
    })
  }


  render() {
    const { loading, selectedTweet } = this.state;
    return (
      <div className="app-container">
        <div className="container">
          <div className="content">
            <h1 className="title">
              <i className="fa fa-clipboard-check" /> Tantangan <span className="subject">Ramadhan</span>
            </h1>
            <hr />
            <div className="message-container">
              <h2 className="message">{loading ? 'Mencari Tantangan...' : selectedTweet.full_text}</h2>
              <p className={`meta ${loading ? 'loading' : ''}`}>
                <span className="branch"><i className="fa fa-twitter-square" /> </span><br />
                <span className="commit"><span className="commit-text">by </span> &nbsp; {selectedTweet && selectedTweet.screen_name}</span>
              </p>
            </div>
            <br />
            <button className="generate-btn"
              onClick={() => {
                this.generateChallenge();
              }}
              disabled={loading}
            >
              Yup, itu udah dikerjain. mau lagi dong !
          </button>
            <br /><br /><br />
            <p>
              Baca cara penggunaanya di <a href="https://github.com/fawwaz/ramadhan-challenge" target="_blank" rel="noopener noreferrer">sini</a>.
            </p>
            <div>
              <a className="twitter-share-button" href="https://twitter.com/share" data-url="http://yangshun.im/commitbait" data-text="Ini keren ! Cobain deh ... bikin ramadhan-mu produktif ">Tweet</a>
              <div className="fb-share-button" data-href="http://yangshun.im/commitbait" data-layout="button" />
              <span className="source">
                Made by <a href="http://fawwazmuhammad.com" target="_blank" rel="noopener noreferrer">@fawwaz</a>. Source on <a href="https://github.com/fawwaz/ramadhan-challenge" target="_blank" rel="noopener noreferrer">Github</a>. Contributions are welcome! <br />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
