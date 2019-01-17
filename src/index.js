import React, {Component} from 'react';
import {render} from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import IconButton from '@material/react-icon-button';
import {
  Headline4,
} from '@material/react-typography';

import './index.css';

import HomeSection from './HomeSection.js';


class App extends Component {
  render() {
    return (
      <ReactFullpage
        navigation={false}
        fixedElements='.header'
        paddingTop='10px'
        loopHorizontal={false}
        resetSliders={true}
        slidesNavigation={true}
        sectionsColor={['#F6EBE1', '#F6EBE1', '#F6EBE1', '#F6EBE1']}
        render={({state, fullpageApi}) => {
          return (
            <ReactFullpage.Wrapper>
              <div id='header' className='header'>
                <div className='container'>
                  <Headline4>Sanghoon Yoon</Headline4>
                  <IconButton style={{marginLeft:'auto'}} isLink={true} href='https://github.com/shygiants' target='_blank'>
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
              <HomeSection/>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    )
  }
}

render(<App/>, document.getElementById("root"));