import React, {Component} from 'react';
import * as tf from '@tensorflow/tfjs';
import {Box, Grommet} from 'grommet';
import Button from '@material/react-button';
import {
  Headline6,
} from '@material/react-typography';

import TFCanvas from './TFCanvas.js'
import Section from "./Section.js";

export default class VAESection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: null,
    };

    this.onError = this.onError.bind(this);
    this.sampleFromVAE = this.sampleFromVAE.bind(this);

    // Load model
    const MODEL_URL = '/models/vae/tensorflowjs_model.pb';
    const WEIGHTS_URL = '/models/vae/weights_manifest.json';

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

    const noise = tf.randomNormal([3,]);

    const normNoise = tf.tidy(() => {
      const max = tf.max(noise);
      const min = tf.min(noise);

      return tf.div(tf.sub(noise, min), tf.sub(max, min))

    });

    noiseCanvas.imshow(tf.reshape(normNoise, [3, 1, 1]), [63, 21], 'nn');

    const sampled = tf.tidy(() => {
      return this.state.model.execute(noise);
    });

    sampleCanvas.imshow(sampled, [128, 128]);
    tf.dispose(noise);
    tf.dispose(normNoise);
    tf.dispose(sampled);
  }

  render() {
    return (
      <Section>
        <Grommet plain>
          <Box height='100vh'>
            <Box fill direction='column' justify='center' align='center'>
              <Box fill='horizontal' direction='row' align='center' justify='center' margin='medium'>

                <TFCanvas ref='noise'/>
                <svg style={{width: '60px', height: '5px'}}>
                  <path d='M 0 0 L 60 0' style={{
                    stroke: 'rgb(175, 175, 175)',
                    strokeDasharray: '10,2',
                    strokeWidth: '5',
                  }}/>
                </svg>
                <Box align='center' justify='center' style={{width: '150px', height: '150px'}}>
                  <svg style={{width: '150px', height: '150px', position: 'absolute'}}>
                    <polygon
                      points="2,30 148,2 148,148 2,120"
                      style={{fill: 'transparent', stroke: 'black', strokeWidth: '2'}}
                    />
                  </svg>
                  <Headline6>VAE Decoder</Headline6>
                </Box>
                <svg style={{width: '60px', height: '5px'}}>
                  <path d='M 0 0 L 60 0' style={{
                    stroke: 'rgb(175, 175, 175)',
                    strokeDasharray: '10,2',
                    strokeWidth: '5',
                  }}/>
                </svg>
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
                          href='https://github.com/shygiants/generative-models/blob/master/src/models/VAE.md'
                          target='_blank'
                          style={{color: '#BBC086', borderColor: '#BBC086'}}>
                    Code
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grommet>
      </Section>
    );
  }
}
