import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import { getEvents } from './getCalendarEvents'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import calendar_icon from './calendar_icon.png'

BigCalendar.momentLocalizer(moment);
//require('style!css!react-big-calendar/lib/css/react-big-calendar.css');
//import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';


//{this.state.most_recent_title}
class SmallCalendar extends React.Component {
  render() {
    let title = this.props.vals.most_recent_title;
    let start = this.props.vals.most_recent_start;
    let end = this.props.vals.most_recent_end;

    let startStr = new Date(start).toLocaleString();
    let endStr = new Date(end).toLocaleString();

    // Make the title not run off screen
    if (title.length > 25) {
      title = title.substring(0, 25) + "...";
    }

    return (
        <div>
            <div style={{width: "100%", textAlign:"right"}}>
              <div className="image_wrapper">
                  <img className="image" src={calendar_icon} alt="map" />
              </div>
            </div>
            <p></p>
            <span style={{display: "inline-block", width: "30%", textAlign: "left"}}>
                Next Event:
            </span>
            <span style={{display: "inline-block", width: "70%", textAlign: "right"}}>
                {title}
            </span>
            <p></p>
            <span style={{display: "inline-block", width: "30%", textAlign: "left"}}>
                Start Time:
            </span>
            <span style={{display: "inline-block", width: "70%", textAlign: "right"}}>
                {startStr}
            </span>
            <p></p>
            <span style={{display: "inline-block", width: "30%", textAlign: "left"}}>
                End Time:
            </span>
            <span style={{display: "inline-block", width: "70%", textAlign: "right"}}>
                {endStr}
            </span>
        </div>
    );
  }
}

class LargeCalendar extends React.Component {
  render() {
    let title = this.props.vals.most_recent_title;
    let start = this.props.vals.most_recent_start;
    let end = this.props.vals.most_recent_end;
    return (
        <div>
            <div className="image_wrapper">
            <img className="image" src={calendar_icon} alt="map" />
            </div>
    
        </div>
    );
  }
}

class Calendar extends React.Component {
  constructor (props) {
    super(props);
    console.log(this.props);
    this.state = {
      events: [],
      most_recent_title: ' ',
      most_recent_start: ' ',
      most_recent_end: ' ',
      showCalendar: this.props.showCalendar
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({
        showCalendar: !prevState.showCalendar
                  }));
  }
  componentDidMount () {
    getEvents((events_) => {
      // this.setState({events: events_});
		  // console.log(events_);
			var len = events_.length;
			for (var i = 0; i < len; i++) {
		    var tmp = {'start': moment(events_[i].start).toDate(),
				           'end': moment(events_[i].end).toDate(),
				           'title': events_[i].title};
		    this.state.events.push(tmp);
			}
            if (len > 0){
						this.setState({most_recent_title: events_[0]['title'], most_recent_start: events_[0]['start'], most_recent_end: events_[0]['end']});
              }
      // console.log(this.state.events);
		  this.forceUpdate();
    });
  }

  render () {
		//console.log(this.state.events);
        const cal = this.props.showCalendar ? <BigCalendar
        style={{height: '100%', width: '100%'}}
        events={this.state.events}
                step={15}
                timeslots={8}
                defaultView="day"
      /> : <SmallCalendar vals={this.state}  />;
      return <div onClick={this.handleClick}>{cal}</div>;
  }
}

export default Calendar;
