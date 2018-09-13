import React, { Component } from 'react';

// Import Style
import './NewsFeed.css';
import news_icon from './news_icon.png';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    // let newsArticles = this.getArticlesFallback();
    this.state = {
      index: 0,
      titles: []
    };
  }

  fetchArticlesFallback() {
    // Sample News API Response for The New York Times feed
    // Get latest titles manually by using the following line of code in the browser console:
    // fetch("https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=latest&apiKey=99c0fdb50ebf419ca02c993ae21d4db3").then(response => { return response.json() }).then(data => {console.log(data.articles.map(a => { return a.title }))});
    console.log('NewsFeed component is using API fallback');
    const titles = require('./sampleTitles.json');
    return titles;
  }

  updateTitle() {
    if (this.state.index === this.state.titles.length - 1) {
      this.fetchArticles();
    } else {
      this.setState((prevState, props) => ({
        index: prevState.index + 1
      }));
    }
  }

  newsAPIKey() {
    // returning one of these keys (from my 2 email account and Marcus' account)
    // so that is it less likely that we exhaust the daily request limit
    // const keys = [
    //  '99c0fdb50ebf419ca02c993ae21d4db3',
    //  '19546bf5be9c414a8017373dfa9e300b',
    //  '5ec26093103f485899f78b1e298f7fec'
    // ];
    // return keys[Math.floor(Math.random() * keys.length)];
		return '143b877c54034b988dba46a77e3bfb7d';
  }

  fetchArticles() {
    const source = this.props.source;
    const key = this.newsAPIKey();
    const url = 'https://newsapi.org/v1/articles?source=' + source + '&sortBy=latest&apiKey=' + key;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let titles = data.articles.map(article => {
          return article.title;
        });
        this.setState({ index: 0, titles: titles });
      })
      .catch(error => {
        console.log(error);
        this.setState({ index: 0, titles: this.fetchArticlesFallback() });
      });
  }

  componentDidMount() {
    this.fetchArticles();

    // article title stays on screen for half a minute before switching
    this.intervalID = setInterval(() => this.updateTitle(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    let titles = this.state.titles;
    let index = this.state.index;
    let name = this.props.sourceName;
    if (!this.props.show)
      return null

    return (
      <div className="news-feed">
        <img className="news-icon" src={news_icon} alt="map" />
        <div className="news-feed">
          <p className="title">{titles[index]}</p>
          <p className="source-attribution">{name} (Powered by News API)</p>
        </div>
      </div>
    );
  }
}

export default NewsFeed;
