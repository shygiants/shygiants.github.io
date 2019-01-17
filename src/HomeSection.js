import React, {Component} from 'react';
import {
  Headline1,
  Body1,
} from '@material/react-typography';

import './HomeSection.css';

import Section from './Section.js';
import IconButton from "@material/react-icon-button";


class HomeSection extends Component {
  render() {
    return (
      <Section bgImgURL={'/img/bg.jpg'}>
        <div className='home-wrapper'>
          <div className='container home' style={{textAlign: 'left'}}>
            <Headline1 className='display'>
              <div className='from-bottom' style={{animationDelay: '0.3s'}}>
                Visualze
              </div>
              <div className='from-bottom' style={{animationDelay: '0.5s'}}>
                Your Imagination
              </div>
              <div className='from-bottom' style={{animationDelay: '0.7s'}}>
                Using
              </div>
              <div className='from-bottom' style={{animationDelay: '0.9s'}}>
                Technology
              </div>
            </Headline1>
            <Body1 className='from-bottom' style={{animationDelay: '1.1s'}}>
              I'm a <span style={{animationDelay: '1.2s', fontWeight: '500'}}>deep learning engineer</span> especially
              interested in generative models. I strive to provide magical experiences.
            </Body1>
            <div>
              <IconButton isLink={true} href='https://github.com/shygiants' target='_blank'>
                <i className="fab fa-github"></i>
              </IconButton>
              <IconButton isLink={true} href='https://www.linkedin.com/in/shygiants/' target='_blank'>
                <i className="fab fa-linkedin-in"></i>
              </IconButton>
              <IconButton isLink={true} href='https://www.instagram.com/shygiants/' target='_blank'>
                <i className="fab fa-instagram"></i>
              </IconButton>
              <IconButton isLink={true} href='https://www.facebook.com/shygiants' target='_blank'>
                <i className="fab fa-facebook"></i>
              </IconButton>
            </div>
          </div>
        </div>
      </Section>
    );
  }
}

export default HomeSection;