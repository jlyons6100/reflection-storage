import React from 'react';
import { Timeline, Tweet } from 'react-twitter-widgets';
import './Twitter.css';
import ReactDOM from 'react-dom';

// TODO (Rodrigo): Do not display Timeline, display a single Tweet.
// Use screen name to fetch latest tweet ID and pass that in to Tweet from react-twitter-widgets
// Send GET request to "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=IRONMANLive&count=1" for example
// See https://developer.twitter.com/en/docs/basics/authentication/overview/oauth for info on authentication

const t_theme = 'dark';
const t_height = '100%';
const t_width = '100%';

class Twitter extends React.Component {
 constructor (props) {
   super(props);
   this.state = {
     tweetId: '',
     screenName: this.props.screenName
   };
   this.updateApp = this.updateApp.bind(this);
 }

render() {
   if (!this.props.isFound) {
     return (
       <div style={{display:"none"}} ref="twitterContainer">
         <Timeline
           dataSource={{
             sourceType: 'profile',
             screenName: this.props.screenName
           }}
           options={{
             username: this.props.screenName,
             width: t_width,
             height: t_height,
             theme: t_theme
           }}
           onLoad={this.updateApp}
         />
       </div>
     );
   } else {
     return (
       <div className="WidgetExample-container" ref="twitterContainer">
         <Tweet
           tweetId={this.state.tweetId}
           options={{
             width: t_width,
             height: t_height,
             theme: t_theme
           }}
        />
       </div>
     );
   }
 }

updateApp() {
   console.log('here');
   let dom = ReactDOM.findDOMNode(this.refs.twitterContainer);

  // console.log(dom.childNodes.item(0).children.item(0).contentWindow.document);

  let iframeDoc = dom.childNodes.item(0).children.item(0).contentWindow.document.children[0];
   let tweetId = iframeDoc.getElementsByClassName('timeline-TweetList')[0].children[0].children[0].getAttribute('data-tweet-id');

  this.state.tweetId = tweetId;
   this.props.setIsFoundToTrue();
 }
}

export default Twitter;
