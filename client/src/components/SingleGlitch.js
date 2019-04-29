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

class SingleGlitch extends Component {
  constructor() {
    super();

    this.state = {
      distortion: 1,
      currentImage: undefined,
      savedGlitches: []
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleGlitch = this.handleGlitch.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleShow() {
    const file = document.querySelector('input').files[0];

    if (file) {
      // checks if files uploaded are images in the format jpeg | jpg |png
      if (/\.(jpe?g|png)$/i.test(file.name)) {
        const reader = new FileReader();

        reader.addEventListener(
          'load',
          () => {
            this.setState({ currentImage: reader.result });
          },
          false
        );
        reader.readAsDataURL(file);
      }
    }
  }

  handleGlitch() {
    const file = document.querySelector('input').files[0];
    if (file) {
      // create reader
      const reader = new FileReader();
      // reader.readAsText(file);
      reader.addEventListener(
        'load',
        () => {
          const charToDelete = 200; // on forward this value will be randomized
          const imageUrlOffset = 25;
          let data = reader.result;
          const rand = Math.random() * Math.floor(data.length);

          if (rand > imageUrlOffset) {
            data = data.replace(data.slice(rand, rand + charToDelete), '');
          } else {
            // prevents removing the url section of the data
            data = data.replace(
              data.slice(rand + charToDelete, rand + charToDelete * 2),
              ''
            );
          }
          this.setState({ currentImage: data });
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  handleSave() {
    const preview = document.querySelector('.single');
    const savedGlitch = document.querySelector('.previewBox');

    // creates image tag and adds attributes
    const image = new Image();
    image.className = 'saveImg';
    image.src = preview.src;
    image.style.margin = '10px';

    // adds images in the container/uploadField
    // const newSavedGliches = this.state.savedGlitches;
    // newSavedGliches.push(this.state.currentImage);
    // this.setState({savedGlitches: newSavedGliches});
    // save saved images as state
    savedGlitch.appendChild(image);
  }

  render() {
    const { currentImage } = this.state;
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
            />
          </Col>
        </Row>
        <Row>
          <Col className="uploadField">
            <Container className="singlePreview">
              {currentImage && (
                <img className="single" src={currentImage} alt="" />
              )}
            </Container>
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
            <Button
              color="danger"
              onClick={this.handleSave}
              className="save-button"
              disabled={!currentImage}
            >
              Save Glitch
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="previewField">
            <legend>
              <b>Saved Glitches:</b>
            </legend>
            <Container className="previewBox" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SingleGlitch;
