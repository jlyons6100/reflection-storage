import React from 'react';

import './Traffic.css';
import map from './map.png';

//TODO: Need to link with input to only come up when in focus

const { compose, withProps } = require('recompose');
const { withScriptjs, withGoogleMap, GoogleMap, TrafficLayer } = require('react-google-maps');

const TrafficMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing<Plug>PeepOpenlaces',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={15} defaultCenter={props.location}>
    <TrafficLayer autoUpdate />
  </GoogleMap>
));

class MapImgComponent extends React.Component {
  render() {
    return (
      <div className="image_wrapper">
        <img className="image" src={map} alt="map" />
      </div>
    );
  }
}

class Traffic extends React.Component {
  render() {
    const traffic = this.props.showTrafficMap ? <TrafficMap location={this.props.homeLocation} /> : <MapImgComponent />;
    return <div onClick={this.props.handleClick}>{traffic}</div>;
  }
}

export default Traffic;
