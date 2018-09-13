import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// edit the config very carefully so this code doesn't break
// TODO (Rodrigo): Add other user config options to json, like spotify playlist uri
const config = require('./config.json');
const profiles = config.profiles;
const profile = config.currentUser in profiles ? profiles[config.currentUser] : profiles.default;

ReactDOM.render(<App profile={profile} />, document.getElementById('root'));
registerServiceWorker();
