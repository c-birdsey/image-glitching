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
  FormText,
  Spinner
} from 'reactstrap';
import './glitch.css';
import placeholder from './folder-icon.png';

//function to build the options field, mostly just for styling right now but will
//translate user input to state to be passed to glitching script once we implement
//more functionality there

/* eslint-disable prefer-destructuring */
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
          max="75"
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
  constructor(props) {
    super(props);

    this.state = {
      distortion: 1,
      originalFiles: [],
      glitchLoading: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleGlitch = this.handleGlitch.bind(this);
    this.glitcher = this.glitcher.bind(this);
  }

  handleShow() {
    //const preview = document.querySelector('.imgPreview');
    const files = document.querySelector('input').files;

    if (files) {
      [].forEach.call(files, file => {
        // checks if files uploaded are images in the format jpeg | jpg |png
        if (/\.(jpe?g|png)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.addEventListener(
            'load',
            () => {
              // creates image tag and adds attributes
              const image = new Image();
              image.className = 'styled';
              image.title = file.name;
              image.src = reader.result;
              image.style.margin = '1px';

              // add images that are uploaded to a state to hold uploaded original images
              const newOriginals = this.state.originalFiles;
              newOriginals.push(image.src);
              this.setState({ originalFiles: newOriginals });
            },
            false
          );
          reader.readAsDataURL(file);
        }
      });
    }
  }

  handleGlitch() {
    this.setState({ glitchLoading: true }, () => {
      setTimeout(() => {
        this.glitcher();
      }, 1);
    });
  }

  glitcher() {
    const currentSaved = [];
    const origArray = this.state.originalFiles;
    origArray.forEach(function(elem) {
      let data = elem;
      const originalImage = data;
      //convert to hex to find "0xFF DA", which marks the start of the actual image encoding
      const hexString = Buffer.from(
        data.slice(23, data.length),
        'base64'
      ).toString('hex');
      let startOfImg = Math.floor(hexString.indexOf('ffda') * 1.3); //multiply by 1.3 just in case theres some extra buffer
      //some images always have an index of 2087, even if it should be a larger number
      if (startOfImg === 2087) {
        startOfImg += startOfImg;
      }
      //if for some reason the tag is not found
      if (startOfImg === -1) {
        startOfImg = hexString.length / 10;
      }

      //distorition level determines how many times each operation happens
      for (let i = 0; i < this.state.distortion; i++) {
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
      //save this img orig and glitch
      const dataArray = [originalImage, data];
      currentSaved.push(dataArray);
    }, this);

    //call callback with prop of glitched and orig imgs
    this.props.callback(currentSaved);
  }

  /*handleGlitch() {
    const files = document.querySelector('input').files;
    const preview = document.querySelector('.imgPreview');
    let currentSaved = [];

    if (files) {
      [].forEach.call(files, file => {
        // creates reader
        const reader = new FileReader();
        // reader.readAsText(file);

        reader.addEventListener(
          'load',
          () => {
            let data = reader.result;
            let originalImage = data;
            //convert to hex to find "0xFF DA", which marks the start of the actual image encoding
            const hexString = Buffer.from(
              data.slice(23, data.length),
              'base64'
            ).toString('hex');
            const startOfImg = Math.floor(hexString.indexOf('ffda') * 1.3); //multiply by 1.3 just in case theres some extra buffer

            //distorition level determines how many times each operation happens
            for (let i = 0; i < this.state.distortion; i++) {
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
            var dataArray = [];
            dataArray.push(originalImage);
            dataArray.push(data);
            currentSaved.push(dataArray);
            console.log(currentSaved);
          },
          false
        );

        if (file) {
          reader.readAsDataURL(file);
        }
      });
      //update state of orig/glitched image array
      this.setState({ libraryImages: currentSaved });
      console.log("state");
      console.log(currentSaved);
      console.log(this.state.libraryImages);
      this.props.callback(this.state.libraryImages);
    }
  }*/

  render() {
    let previewImage = null;
    let loader = null;
    if (this.state.originalFiles.length !== 0) {
      previewImage = <img className="folder-icon" src={placeholder} alt="" />;
    }
    if (this.state.glitchLoading) {
      console.log('loading');
      loader = <Spinner color="primary" />;
    }

    return (
      <Container className="previewComponent">
        <Row>
          <Col>
            <legend>
              <b>Upload Images:</b>
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
            <Container className="imgPreview">{previewImage}</Container>
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
              Glitch Images
            </Button>
            {loader}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Glitch;
