import React from 'react';
import SpotifyPlayer from 'react-spotify-player';

export function MusicPlayer(props) {
  // size may also be a plain string using the presets 'large' or 'compact'
  const size = {
    width: '100%',
    height: '100%'
  };

  const view = 'coverart'; // or 'coverart'
  const theme = 'black'; // or 'white'
  const uri = props.uri;

  if (!props.show)
    return null

  return ( 
    <div style={{width: "80%", margin: "auto"}}>
      <SpotifyPlayer uri={uri} size={size} view={view} theme={theme} />
    </div>
  );
}

export default MusicPlayer;
