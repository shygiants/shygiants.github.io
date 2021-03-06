import React, {Component} from 'react';
import * as tf from '@tensorflow/tfjs';
import {Box, Grommet, ResponsiveContext} from 'grommet';
import Button from '@material/react-button';
import {
  Headline6,
  Body2,
} from '@material/react-typography';

import TFCanvas from './TFCanvas.js'
import Slide from "./Slide.js";

export default class GANSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: null,
    };

    this.onError = this.onError.bind(this);
    this.sampleFromVAE = this.sampleFromVAE.bind(this);

    // Load model
    const MODEL_URL = '/models/gan/tensorflowjs_model.pb';
    const WEIGHTS_URL = '/models/gan/weights_manifest.json';

    tf.loadFrozenModel(MODEL_URL, WEIGHTS_URL).then(model => {
      this.setState({model});
      this.sampleFromVAE();
    }).catch(this.onError)
  }

  onError(e) {
    console.error(e);
  }

  sampleFromVAE() {
    if (this.state.model === null)
      return this.onError(new Error('Model is not loaded'));

    const noiseCanvas = this.refs.noise;
    const sampleCanvas = this.refs.sample;

    const noise = tf.randomNormal([100,]);

    const normNoise = tf.tidy(() => {
      const max = tf.max(noise);
      const min = tf.min(noise);

      return tf.div(tf.sub(noise, min), tf.sub(max, min))

    });

    noiseCanvas.imshow(tf.reshape(normNoise, [10, 10, 1]), [50, 50], 'nn');

    const sampled = tf.tidy(() => {
      return this.state.model.execute(noise);
    });

    sampleCanvas.imshow(sampled, [128, 128]);
    tf.dispose(noise);
    tf.dispose(normNoise);
    tf.dispose(sampled);
  }

  render() {
    const line = size => {
      const criteria = size !== 'small' ? 60 : 15;
      const width = `${criteria}px`;
      return (

        <svg style={{width, height: '5px'}}>
          <path d={`M 0 0 L ${criteria} 0`} style={{
            stroke: 'rgb(175, 175, 175)',
            strokeDasharray: '10,2',
            strokeWidth: '5',
          }}/>
        </svg>
      );
    };

    const decoder = size => {
      const criteria = size !== 'small' ? 150 : 100;
      const length = `${criteria}px`;
      const decoderName = 'GAN';

      return (
        <Box align='center' justify='center' style={{width: length, height: length}}>
          <svg style={{width: length, height: length, position: 'absolute'}}>
            <polygon
              points={`2,${criteria / 5} ${criteria - 2},2 ${criteria - 2},${criteria - 2} 2,${criteria * 4 / 5}`}
              style={{fill: 'transparent', stroke: '#FFD4B8', strokeWidth: '2'}}
            />
          </svg>
          {size !== 'small' ? <Headline6>{decoderName}</Headline6> : <Body2>{decoderName}</Body2>}
        </Box>
      )
    };

    return (
      <Slide anchor='gan'>
        <Grommet plain>
          <Box height='100vh'>
            <Box fill direction='column' justify='center' align='center'>
              <Box fill='horizontal' direction='row' align='center' justify='center' margin='medium' pad='small'>
                <TFCanvas ref='noise'/>

                <ResponsiveContext.Consumer>
                  {size => (
                    <Box direction='row' align='center' justify='center'>
                      {console.log(size)}
                      {line(size)}
                      {decoder(size)}
                      {line(size)}
                    </Box>
                  )}</ResponsiveContext.Consumer>

                <TFCanvas ref='sample' downloadable/>

              </Box>
              <Box margin='small' direction='row'>
                <Box margin='xsmall'>
                  <Button outlined onClick={this.sampleFromVAE} style={{color: '#BBC086', borderColor: '#BBC086'}}>
                    Create Again
                  </Button>
                </Box>
                <Box margin='xsmall'>
                  <Button outlined icon={<i className="fab fa-github"></i>}
                          href='https://github.com/shygiants/generative-models/blob/master/src/models/GAN.md'
                          target='_blank'
                          style={{color: '#BBC086', borderColor: '#BBC086'}}>
                    Code
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grommet>
      </Slide>
    );
  }
}
