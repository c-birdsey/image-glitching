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
          min="1"
          max="10"
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
      //upload: '',
      //preview: '',
      //glitch_options: '',
      distortion: 0
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleGlitch = this.handleGlitch.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleShow() {
    const preview = document.querySelector('.single');
    const file = document.querySelector('input').files[0];

    if (file) {
      // checks if files uploaded are images in the format jpeg | jpg |png
      if (/\.(jpe?g|png)$/i.test(file.name)) {
        const reader = new FileReader();

        reader.addEventListener(
          'load',
          () => {
            preview.src = reader.result;
          },
          false
        );

        reader.readAsDataURL(file);
      }
    }
  }

  handleGlitch() {
    const file = document.querySelector('input').files[0];
    const preview = document.querySelector('.single');

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
          //convert to hex to find "0xFF DA", which marks the start of the actual image encoding
          const hexString = Buffer.from(
            data.slice(23, data.length),
            'base64'
          ).toString('hex');
          const startOfImg = Math.floor(hexString.indexOf('ffda') * 1.3); //multiply by 1.3 just in case theres some extra buffer

          //distorition level determines how many times each operation happens
          for (var i = 0; i < this.state.distortion; i++) {
            //needs to be a multiple of 4 to keep valid hex format
            const rand =
              4 *
              Math.floor(
                (data.length / 10000) *
                  Math.floor(Math.floor(Math.random() * Math.floor(20)))
              );
            const whichGlitch = Math.floor(Math.random() * Math.floor(2));
            //a random block of data that is used by Glitches 1 and 2
            const dataBlock = data.slice(startOfImg, startOfImg + rand);

            //deletion
            if (whichGlitch === 0) {
              data =
                data.slice(0, startOfImg) +
                data.slice(startOfImg + rand, data.length);

              //move code around
            } else if (whichGlitch === 1) {
              data =
                data.slice(0, startOfImg + rand * 2) +
                dataBlock +
                data.slice(startOfImg + rand * 2, data.length);
            }
          }

          preview.src = data;
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
    savedGlitch.appendChild(image);
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
            />
          </Col>
        </Row>
        <Row>
          <Col className="uploadField">
            <Container className="singlePreview">
              <img className="single" src="" alt="" />
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
