import React, {Component} from 'react';

import './Section.css';

class Section extends Component {
  getStyle() {
    if (this.props.bgImgURL === undefined) return null;

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