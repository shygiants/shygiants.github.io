import React, {Component} from 'react';
import * as tf from '@tensorflow/tfjs';

export default class TFCanvas extends Component {
  constructor(props) {
    super(props);

    this.imshow = this.imshow.bind(this);

  }

  imshow(img, dsize = null, resizeMethod = 'bilinear') {
    let toShow;

    if (dsize !== null) {
      toShow = tf.tidy(() => {
        if (resizeMethod === 'bilinear')
          return tf.image.resizeBilinear(img, dsize);
        else if (resizeMethod === 'nn')
          return tf.image.resizeNearestNeighbor(img, dsize);
        else
          throw new Error('Resize method should be either `bilinear` or `nn`');
      });
    }

    toShow = toShow || img;

    const canvas = this.refs.canvas;

    tf.toPixels(toShow, canvas)
      .then(() => {
        tf.dispose(toShow);
      }).catch(this.onError);
  }

  render() {
    return (
      <canvas ref='canvas'>
        TF Canvas
      </canvas>
    );
  }
}
