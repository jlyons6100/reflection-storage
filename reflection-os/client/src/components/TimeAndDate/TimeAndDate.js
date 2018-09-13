import React from 'react';

// Import Style
import './TimeAndDate.css';

class TimeComponent extends React.Component {
  render() {
    return (
      <p className="time">
        {this.props.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </p>
    );
  }
}

class DayComponent extends React.Component {
  render() {
    return <p className="day">{this.props.date.toLocaleDateString([], { weekday: 'long' })}</p>;
  }
}

class DateComponent extends React.Component {
  render() {
    return (
      <p className="date">
        {this.props.date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
    );
  }
}

class TimeAndDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  updateDate() {
    this.setState({
      date: new Date()
    });
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.updateDate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return (
      <div className='time-and-date'>
        <TimeComponent date={this.state.date} />
        <DayComponent date={this.state.date} />
        <DateComponent date={this.state.date} />
      </div>
    );
  }
}

export default TimeAndDate;
