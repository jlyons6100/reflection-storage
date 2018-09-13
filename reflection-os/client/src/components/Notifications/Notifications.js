import React from 'react';

// Import Style
import './Notifications.css';
import bell from './Bell.png'


class ImgComponent extends React.Component{
    render() {
        return (
            <div className="notif_img" >
                <img className="image" src={bell} alt="Bell"></img>
            </div>
        );
    }
}
class TextComponent extends React.Component{
    render() {
        return (
        <div className="notifications">
              <p> "Hi, when will you be home for dinner?" <br></br> -Mom</p>
        </div>
        );
    }
}
class Notifications extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
           text: "Text here"
        };
    }

    updateText() {
        this.setState({
        text: "Text here"
        });
    }
    // render() {
    //     return (
    //           <div className="notifications_container">
    //             <ImgComponent text={this.state.text} />
    //             <TextComponent text={this.state.text} />
    //         </div>
    //     );
    // }
    render() {
      if (this.props.show)
      {
        return (<div></div>);
      } else {
        return null
      }
    }
}

export default Notifications;
