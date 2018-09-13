import React from 'react';
import axios from 'axios';
class Bluetooth extends React.Component {
  constructor(props) {
    super(props);
    this.state.txt = "unfilled";
    var EchoCharacteristic = require('./characteristic');
		this.characteristic = new EchoCharacteristic();
  }


	characteristicUpdate(elem) {
		this.setState({txt: this.characteristic._value.toString('hex')});
	}

  componentWillMount() {
    var bleno = require('bleno');

    var BlenoPrimaryService = bleno.PrimaryService;

    console.log('bleno - echo');

    bleno.on('stateChange', function(state) {
      console.log('on -> stateChange: ' + state);

      if (state === 'poweredOn') {
        bleno.startAdvertising('echo', ['ec00']);
      } else {
        bleno.stopAdvertising();
      }
	
    });

    bleno.on('advertisingStart', function(error) {
      console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

      if (!error) {
        bleno.setServices([new BlenoPrimaryService({ uuid: 'ec00', characteristics: [this.characteristic]})]);
      }
    });
  }

  // componentDidMount() {
  //   quote stays for a whole day before switching (quote-of-the-day)
  //   this.intervalID = setInterval(() => this.getQuote(), 1000 * 60 * 60 * 24);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.intervalID);
  // }

  render() {
    return (
      <p>
        "{this.state.txt}"
      </p>
    );
  }
}

export default Bluetooth;
