import React, {Component} from 'react';

import './Section.css';

class Section extends Component {
  getStyle() {
    if (this.props.bgImgURL === undefined) return {
      background: 'linear-gradient(to left bottom, #F2538C,#4A8E8F)'
    };

    return {
      backgroundImage: `url(${this.props.bgImgURL})`,
    }
  }

  render() {
    return (
      <div className='section' style={this.getStyle.bind(this)()}>
        {this.props.children}
      </div>
    );
  }
}

export default Section;