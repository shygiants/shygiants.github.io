import React, {Component} from 'react';
import {render} from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import IconButton from '@material/react-icon-button';
import {
  Headline4,
} from '@material/react-typography';

import './index.css';

import HomeSection from './HomeSection.js';
import VAESlide from './VAESlide.js'
import GANSlide from './GANSlide.js'
import Section from "./Section.js";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Sanghoon Yoon'
    };

    this.titleMap = ['Sanghoon Yoon', 'Paper Implements']
  }

  afterLoad(origin, destination, direction) {
    this.setState({
      title: this.titleMap[destination.index],
    });
  }

  render() {
    return (
      <ReactFullpage
        licenseKey={process.env.REACT_APP_LICENSE_KEY}
        anchors={['home', 'paper-implements']}
        navigation={false}
        fixedElements='.header'
        paddingTop='10px'
        loopHorizontal={false}
        resetSliders={true}
        slidesNavigation={true}
        controlArrows={false}
        afterLoad={this.afterLoad.bind(this)}
        render={({state, fullpageApi}) => {
          return (
            <ReactFullpage.Wrapper>
              <div id='header' className='header'>
                <div className='container'>
                  <Headline4>{this.state.title}</Headline4>
                  <IconButton style={{marginLeft: 'auto'}} isLink={true} href='https://github.com/shygiants'
                              target='_blank'>
                    <i className="fab fa-github"></i>
                  </IconButton>
                  <IconButton isLink={true} href='https://www.linkedin.com/in/shygiants/' target='_blank'>
                    <i className="fab fa-linkedin-in"></i>
                  </IconButton>
                  <IconButton isLink={true} href='https://www.instagram.com/shy_ai/' target='_blank'>
                    <i className="fab fa-instagram"></i>
                  </IconButton>
                  <IconButton isLink={true} href='https://www.facebook.com/shygiants' target='_blank'>
                    <i className="fab fa-facebook"></i>
                  </IconButton>
                </div>
              </div>
              <HomeSection/>
              <Section>
                <GANSlide/>
                <VAESlide/>
              </Section>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    )
  }
}

render(<App/>, document.getElementById("root"));