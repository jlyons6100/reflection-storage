import React, { Component } from 'react';
import './App.css';
import SpeechRecognition from 'react-speech-recognition'

import AppContainer from './components/AppContainer/AppContainer';
import TimeAndDate from './components/TimeAndDate/TimeAndDate';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Notifications from './components/Notifications/Notifications';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Quotes from './components/Quotes/Quotes';
import Twitter from './components/Twitter/Twitter';
import Weather from './components/Weather/Weather';
import Calendar from './components/Calendar/Calendar';
import Traffic from './components/Traffic/Traffic';
import openSocket from 'socket.io-client';

function typeOf(obj) {
  return {}.toString
    .call(obj)
    .split(' ')[1]
    .slice(0, -1)
    .toLowerCase();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyURI: props.profile.spotifyURI,
      weatherZipCode: props.profile.weatherZipCode,
      twitterScreenName: props.profile.twitterScreenName,
      newsSource: props.profile.newsSource,
      newsSourceName: props.profile.newsSourceName,
      showTrafficMap: props.profile.showTrafficMap,
      trafficHomeLocation: props.profile.trafficHomeLocation,
      isFound: false,
      showCalendar: props.profile.showCalendar,
      showNotifications: true,
      showMusic: true,
      showWeather: true,
      showTwitter: true,
      showNews: true,
      showQuotes: true
    };
    this.toggleShowTrafficMap = this.toggleShowTrafficMap.bind(this);
    this.setIsFoundToTrue = this.setIsFoundToTrue.bind(this);
  }

  /*serverHello() {
    this.callApi()
      .then(res => {
        console.log(res.express);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };*/

  componentDidMount() {
    this.twitterSocket = openSocket('http://localhost:8000');
    this.twitterSocket.on('connect', function() {
      console.log('client connected!');
    });
    this.twitterSocket.on('updateTwitterHandle', handle => {
      console.log(handle);
      this.setState({ twitterScreenName: handle , isFound: false});
    });

    this.weatherSocket = openSocket('http://localhost:8001');
    this.weatherSocket.on('connect', function() {
      console.log('client connected!');
    });
    this.weatherSocket.on('updateWeatherZip', zip => {
      console.log(zip);
      var zipInt = parseInt(zip);
      this.setState({ weatherZipCode: zipInt });
      console.log(this.state.weatherZipCode);
    });

    this.calendarSocket = openSocket('http://localhost:8002');
		this.calendarSocket.on('connect', function() {
      console.log('calendar client connected!');
		})
    this.calendarSocket.on('updateCalendarFocus', focus => { 
      console.log('calendar update??');
      console.log(this.state.showCalendar);
      this.setState({showCalendar: !this.state.showCalendar}); 
      console.log(this.state.showCalendar);
    });

    this.mapSocket = openSocket('http://localhost:8003');
    this.mapSocket.on('connect', function() { 
      console.log('client connected!');
    })
    this.mapSocket.on('updateMapFocus', focus => this.toggleShowTrafficMap());

    this.newsSocket = openSocket('http://localhost:8004');
    var data = require('./sources.json');
    this.newsSocket.on('updateNewsSource', source => { 
      var sources = data.sources;
      sources.forEach(elem => {  
			  if (elem.name == source) {
          this.setState({newsSource: elem.id, newsSourceName: elem.name});
		  	}
      });
    });
  }

  // This method exists just for testing with the mouse.
  // Clicking on the map icon should cause the traffic map to appear and the quote widget to
  // disappear because the traffic map partially blocks the quote.
  toggleShowTrafficMap() {
    this.setState((prevState, props) => {
      return { showTrafficMap: !prevState.showTrafficMap };
    });
  }

  toggleNotifications() {
    this.setState((prevState, props) => {
      return { showNotifications: !prevState.showNotifications };
    });
  }

  toggleMusic() {
    this.setState((prevState, props) => {
      return { showMusic: !prevState.showMusic };
    });
  }

  toggleWeather() {
    this.setState((prevState, props) => {
      return { showWeather: !prevState.showWeather };
    });
  }

  toggleTwitter() {
    this.setState((prevState, props) => {
      return { showTwitter: !prevState.showTwitter };
    });
  }

  toggleNews() {
    this.setState((prevState, props) => {
      return { showNews: !prevState.showNews };
    });
  }

  toggleQuotes() {
    this.setState((prevState, props) => {
      return { showQuotes: !prevState.showQuotes };
    });
  }
  setIsFoundToTrue() {this.setState({isFound: true});}

  render() {
    const { transcript, interimTranscript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    // set aribitrary reset length for commands
    if (transcript.length > 50 || interimTranscript == "mirror")
      resetTranscript()

    if (interimTranscript == "toggle notifications") {
      this.toggleNotifications()
      resetTranscript()
    } else if (interimTranscript == "toggle music") {
      this.toggleMusic()
      resetTranscript()
    } else if (interimTranscript == "toggle weather") {
      this.toggleWeather()
      resetTranscript()
    } else if (interimTranscript == "toggle Twitter") {
      this.toggleTwitter()
      resetTranscript()
    } else if (interimTranscript == "toggle news") {
      this.toggleNews()
      resetTranscript()
    } else if (interimTranscript == "toggle quotes") {
      this.toggleQuotes()
      resetTranscript()
    } else if (interimTranscript == "toggle traffic") {
      this.toggleShowTrafficMap()
      resetTranscript()
    }

    return (
      <div className="container">
        <AppContainer>
          <TimeAndDate />
          <Notifications show={this.state.showNotifications}/>
          <MusicPlayer uri={this.state.spotifyURI} show={this.state.showMusic}/>
          <Weather zipCode={this.state.weatherZipCode} show={this.state.showWeather}/>
          <Twitter screenName={this.state.twitterScreenName} isFound={this.state.isFound} setIsFoundToTrue={this.setIsFoundToTrue} show={this.state.showTwitter}/>
          <NewsFeed source={this.state.newsSource} sourceName={this.state.newsSourceName} show={this.state.showNews}/>
          <Quotes interim={interimTranscript} transcript={transcript} showQuote={!this.state.showTrafficMap} show={this.state.showQuotes}/>
          <Calendar showCalendar={this.state.showCalendar} />
          <Traffic
            showTrafficMap={this.state.showTrafficMap}
            homeLocation={this.state.trafficHomeLocation}
            handleClick={this.toggleShowTrafficMap}
          />
        </AppContainer>
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default SpeechRecognition(App);
