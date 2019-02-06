import React, {Component} from 'react';

export default class Slide extends Component {
  render() {
    return (
      <div className='slide' data-anchor={this.props.anchor}>
        {this.props.children}
      </div>
    );
  }
}