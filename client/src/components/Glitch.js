// functionality is simplified.
// needs fixing:_code has a minor bug, sometimes it fails to preview image

import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import './glitch.css';

//function to build the options field, mostly just for styling right now but will
//translate user input to state to be passed to glitching script once we implement
//more functionality there
function OptionsForm(props) {
  return (
    <Form>
      <FormGroup tag="fieldset">
        <legend>
          <b>Options:</b>
        </legend>
        <FormGroup check className="options">
          <Label check>
            <Input type="radio" name="options" /> <b>Random:</b>
            <FormText color="muted">
              This will glitch your uploaded image in a completely random
              manner.
            </FormText>
          </Label>
        </FormGroup>
        <FormGroup check className="options">
          <Label check>
            <Input type="radio" name="options" /> <b>Controlled:</b>
            <FormText color="muted">
              This will allow you to have more control over your glitch. Use the
              options below to alter the visual effects applied to the image.
            </FormText>
          </Label>
          <FormGroup check>
            <Label check className="check-option">
              <Input type="checkbox" /> <i>Coloration Shift:</i>
              <FormText color="muted">
                This will alter the colors and hues of your image rather than
                the pixel positioning.
              </FormText>
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check className="check-option">
              <Input type="checkbox" /> <i>Content Shift:</i>
              <FormText color="muted">
                This will shift the pixels and skew the composition of the
                image.
              </FormText>
            </Label>
          </FormGroup>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <div>
          <b>Degree of distortion:</b>
        </div>
        <input
          type="range"
          min="0"
          max="255"
          step="1"
          value={props.value}
          onChange={event =>
            props.valueChange(parseInt(event.target.value, 10))
          }
        />
      </FormGroup>
    </Form>
  );
}

class Glitch extends Component {
  constructor() {
    super();

    this.state = {
      upload: '',
      preview: '',
      glitch_options: '', //to disable color shift/content shift if random selected
      distortion: 0
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleGlitch = this.handleGlitch.bind(this);
  }

  handleShow() {
    const preview = document.querySelector('.imgPreview');
    const files = document.querySelector('input').files;

    if (files) {
      [].forEach.call(files, file => {
        // checks if files uploaded are images in the format jpeg | jpg |png
        if (/\.(jpe?g|png)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.addEventListener(
            'load',
            function() {
              // creates image tag and adds attributes
              const image = new Image();
              image.className = 'styled';
              image.title = file.name;
              image.src = reader.result;
              image.style.margin = '1px';

              // adds images in the container/uploadField
              preview.appendChild(image);
            },
            false
          );

          reader.readAsDataURL(file);
        }
      });
    }
  }

  handleGlitch() {
    const files = document.querySelector('input').files;
    const preview = document.querySelector('.imgPreview');

    if (files) {
      [].forEach.call(files, file => {
        // creates reader
        const reader = new FileReader();

        const levelDistort = this.state.distortion;
        reader.addEventListener(
          'load',
          function() {
            let data = reader.result;

            const charToDelete = 5000 + 20 * levelDistort; // slider
            const imageUrlOffset = 23; // number of characters on data:image/[];base64,

            // generates a random number between 23 (imageUrlOffset) and data.length
            const randomNum =
              Math.floor(Math.random() * (data.length - imageUrlOffset)) +
              imageUrlOffset;

            // replaces a (randomNum) of characters with empty string
            data = data.replace(
              data.slice(randomNum, randomNum + charToDelete),
              ''
            );

            // creates image tag and adds attributes
            const imageDisplay = document.createElement('img');
            imageDisplay.className = 'styled';
            imageDisplay.src = data;

            // adds images in the container/uploadField
            preview.appendChild(imageDisplay);
          },
          false
        );

        if (file) {
          reader.readAsDataURL(file);
        }
      });
    }
  }

  render() {
    return (
      <Container className="previewComponent">
        <Row>
          <Col>
            <legend>
              <b>Upload Image:</b>
            </legend>
            <input
              className="fileInput"
              id="myfileinput"
              type="file"
              onChange={this.handleShow}
              multiple
            />
          </Col>
        </Row>
        <Row>
          <Col className="uploadField">
            <Container className="imgPreview" />
          </Col>
          <Col className="optionField">
            <OptionsForm
              value={this.state.distortion}
              valueChange={value => {
                this.setState({ distortion: value });
              }}
            />
            <Button
              color="danger"
              onClick={this.handleGlitch}
              className="glitch-button"
            >
              Glitch Image
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Glitch;
