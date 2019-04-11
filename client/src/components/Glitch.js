// code has a minor bug, sometimes it fails to preview image
// functionality is simplified.
// Prof. Andrews advised to manipulate dataURI instead of image's text

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
    const preview = document.querySelector('img');
    const file = document.getElementById('myfileinput').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function() {
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleGlitch() {
    const fileInput = document.getElementById('myfileinput');
    const preview = document.querySelector('img');
    //const origin = document.getElementById('origin');
    // files is a FileList object
    const file = fileInput.files[0];
    const original = file;
    console.log(file);

    if (file) {
      // create reader
      const reader = new FileReader();
      // reader.readAsText(file);

      reader.addEventListener(
        'load',
        function() {
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
          preview.src = data;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
    // if (original) {
    //   const reader = new FileReader();
    //   reader.addEventListener(
    //     'load',
    //     function() {
    //       console.log(original);
    //       let data = reader.result;
    //       console.log(data);
    //       origin.src = data;
    //     },
    //     false
    //   );
    //   if (original) {
    //     reader.readAsDataURL(original);
    //   }
    // }
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
              class="fileInput"
              id="myfileinput"
              type="file"
              onChange={this.handleShow}
            />
          </Col>
        </Row>
        <Row>
          <Col className="uploadField">
            <Container className="imgPreview">
              <img className="styled" src="" alt="" />
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
          </Col>
        </Row>
      </Container>
    );
  }
}

/*

      <div>
        <div>
          <h1>Glitching. . .</h1>
          <input id="myfileinput" type="file" onChange={this.handleShow} />
          <img id="origin" className="styled" src="" alt="" height="200" />
          <button className="styled" onClick={this.handleGlitch}>
            Glitch
          </button>
        </div>
        <div align="right">
          <img id="glitchimg" className="styled" src="" alt="" height="200" />
        </div>
      </div>
    );
  }
}
*/
export default Glitch;
