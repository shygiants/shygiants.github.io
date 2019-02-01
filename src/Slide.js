import React, {Component} from 'react';

export default class Slide extends Component {
  render() {
    return (
      <div className='slide'>
        {this.props.children}
      </div>
    );
  }
}