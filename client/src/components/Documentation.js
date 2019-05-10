import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';
import './documentation.css';
import lincoln from './Glitch.png';

class Documentation extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <Container fluid className="doc-container">
        <Col className="doc-col">
          <h1>Documentation</h1>
          <h2>What is Image Glitching?</h2>
          <p>
            Behind every digital image we download, there are thousands of lines
            encoding every single pixel in the image. Image Glitching is the
            practice of altering random parts of this encoding and expecting the
            image's digital representation to change. While this glitcher was
            built for glitching and reinterpreting historical images, glitching
            is also commonly used as a form of art.
          </p>
          <h2>How Does Our Image Glitcher Work?</h2>
          <p>
            There are four major parameters of the Image Glitcher we
            implemented, adapted from a open source{' '}
            <a
              href="https://github.com/snorpey/glitch-canvas"
              target="_blank"
              rel="noopener noreferrer"
            >
              JavaScript library
            </a>{' '}
            created by Snorpey. The first, <b>seed</b>, dictates how far along
            the image's encoding the byte altercations begin. As a result the
            larger the seed value, the lower in the image's representation the
            glitches being to appear. The next parameter, <b>amount</b>,
            dictates how large each chunk of glitched data is. Larger amount
            values typically lead to more dramatic glitches. The third
            parameter, <b>quality</b>, alters the pixelation of the original
            image. The last parameter is <b> iterations</b>. This parameter
            changes how many times the image encoding is altered- lower values
            produce less glitched images.
          </p>
          <h2>Example</h2>
          <div className="example-div">
            <span className="image-span">
              <img className="image" src={lincoln} alt="linc" />
            </span>
            <p>
              For this image, seed was set very low, which is why the glitches
              started near the top of the image. Amount was set to about 33 (on
              a scale of 0-99). Quality was set to be very low as well,
              explaining the the large pixelation. Iterations was set to be
              high, which is why there are so many "bars", signifying distinct
              glitches.
            </p>
          </div>
        </Col>
      </Container>
    );
  }
}

export default Documentation;
