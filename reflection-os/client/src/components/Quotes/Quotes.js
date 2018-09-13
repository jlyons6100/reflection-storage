import React from 'react';
import axios from 'axios';
class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.quoteFallback();
  }

  quoteFallback() {
    let quotes = [
      {
        quote: 'You make a living by what you earn; you make a life by what you give.',
        author: 'Winston  Churchill'
      },
      {
        quote: 'When you win, say nothing. When you lose, say less.',
        author: 'Paul Brown'
      }
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  getQuote() {
    let quoteLink = 'https://quotes.rest/qod.json?category=inspire';
    axios
      .get(quoteLink)
      .then(response => {
        let quote_ = response.data.contents.quotes[0].quote;
        let author_ = response.data.contents.quotes[0].author;
        this.setState({ quote: quote_, author: author_ });
      })
      .catch(error => {
        // Quotes REST API limits requests to 10/hr
        // Consider using https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en
        // For now, requests are giving error 429 (Too Many Requests)
        console.log(error);
      });
  }

  componentWillMount() {
    this.getQuote();
  }

  // componentDidMount() {
  //   quote stays for a whole day before switching (quote-of-the-day)
  //   this.intervalID = setInterval(() => this.getQuote(), 1000 * 60 * 60 * 24);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.intervalID);
  // }

  render() {
    if (!this.props.showQuote || !this.props.show) return null;
    return (
      <div>
        <p>"{this.props.interim}"</p>
        <p>"{this.state.quote}"</p>
        <p>- {this.state.author}</p>
      </div>
    );
  }
}

export default Quotes;
