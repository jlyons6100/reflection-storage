import React from 'react';

// Import Style
import './AppContainer.css';
class AppContainer extends React.Component {


  render() {
    const children = React.Children.toArray(this.props.children);
    return (
      <div className="container">

        <div className="grid_row">
          <div className="l_grid_elem">
            {children[0]}
          </div>
          <div className="grid_elem">
            {children[2]}
          </div>
          <div className="r_grid_elem">
            {children[7]}
          </div>
        </div>

        <div className="grid_row">
          <div className="l_grid_elem">
            {children[3]}
          </div>
          <div className="grid_elem">
            {null}
          </div>
          <div className="r_grid_elem">
            {children[4]}
          </div>
        </div>

        <div className="grid_row">
          <div className="l_grid_elem">
            {children[8]}
          </div>
          <div className="grid_elem">
            {null}
          </div>
          <div className="r_grid_elem">
            {null}
          </div>
        </div>

        <div className="grid_row">
          <div className="l_grid_elem">
            {children[6]}
          </div>
          <div className="grid_elem">
             {null}
          </div>
          <div className="r_grid_elem">
            {children[5]}
          </div>
        </div>

      </div>
    );
  }
}

export default AppContainer;
