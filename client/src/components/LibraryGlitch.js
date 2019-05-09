/* eslint-disable prefer-destructuring */

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
import glitch from 'glitch-canvas';
import PropTypes from 'prop-types';

class Glitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      distortion: 1,
      quality: 99,
      amount: 35,
      seed: 25,
      originalFiles: [],
      glitchLoading: false,
      glitchControlled: 'disabled'
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleGlitch = this.handleGlitch.bind(this);
    this.glitchLib = this.glitchLib.bind(this);
    this.OptionsForm = this.OptionsForm.bind(this);
    this.setRandom = this.setRandom.bind(this);
    this.setControlled = this.setControlled.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  //handles uploads, adds all uploaded images to array in state as base64
  handleShow() {
    const files = document.querySelector('input').files;
    if (files) {
      [].forEach.call(files, file => {
        // checks if files uploaded are images in the format jpeg | jpg |png
        if (/\.(jpe?g|png)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.addEventListener(
            'load',
            () => {
              // add images that are uploaded to state to hold original images
              const newOriginals = this.state.originalFiles;
              newOriginals.push(reader.result);
              this.setState({ originalFiles: newOriginals });
            },
            false
          );
          reader.readAsDataURL(file);
        }
      });
    }
  }

  /*glitcher() {
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
    console.log(currentSaved);
    this.props.callback(currentSaved);
  }*/

  //set state for spinner, call glitcher
  handleGlitch() {
    this.setState({ glitchLoading: true }, () => {
      this.glitchLib();
    });
  }

  //glitching function
  glitchLib() {
    const glitchParams = {
      seed: this.state.seed,
      quality: this.state.quality,
      amount: this.state.amount,
      iterations: this.state.distortion
    };
    const promises = [];
    const array = this.state.originalFiles;
    array.forEach(src => {
      const originalImage = src;
      const image = new Image();
      image.src = src;
      const dataArray = [];
      const promise = new Promise(resolve => {
        image.onload = () => {
          glitch(glitchParams)
            .fromImage(image)
            .toDataURL()
            .then(dataURL => {
              this.renderImage(dataURL, image.width, image.height).then(
                result => {
                  dataArray.push(originalImage, result, glitchParams);
                  resolve(dataArray);
                }
              );
            });
        };
      });
      promises.push(promise);
    });
    Promise.all(promises).then(result => {
      this.props.callback(result);
    });
  }

  //function to draw new image on canvas and creat valid png from pixels
  renderImage(src64, width, height) {
    const promise = new Promise(resolve => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.canvas.width = width;
      ctx.canvas.height = height;
      const image = new Image();
      image.src = src64;
      image.onload = function() {
        ctx.drawImage(image, 0, 0);
        const newGlitch = canvas.toDataURL();
        resolve(newGlitch);
      };
    });
    return promise;
  }

  //sets glitch param state when random radio button is clicked
  setRandom() {
    this.setState({ distortion: Math.floor(Math.random() * 99) + 1 });
    this.setState({ amount: Math.floor(Math.random() * 99) + 1 });
    this.setState({ quality: Math.floor(Math.random() * 99) + 1 });
    this.setState({ seed: Math.floor(Math.random() * 101) });
    this.setState({ glitchControlled: 'disabled' });
  }

  //sets state to indicate controlled radio button is clicked
  setControlled() {
    this.setState({ glitchControlled: '' });
  }

  //build options
  OptionsForm() {
    return (
      <Form>
        <FormGroup tag="fieldset">
          <legend>
            <b>Options:</b>
          </legend>
          <FormGroup check className="options random">
            <Label check>
              <Input
                type="radio"
                name="options"
                onChange={this.setRandom}
                checked
              />
              <b>Random:</b>
              <FormText color="muted">
                This will glitch your uploaded image in a completely random
                manner.
              </FormText>
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup check className="options controlled">
          <Label check>
            <Input type="radio" name="options" onChange={this.setControlled} />
            <b>Controlled:</b>
            <FormText color="muted">
              This will allow you to have more control over your glitch. Use the
              options below to alter the visual effects applied to the image.
            </FormText>
          </Label>
          <FormGroup id="inputForm">
            <div>
              <b>Amount:</b>
              <input
                className="slider amount"
                disabled={this.state.glitchControlled}
                type="range"
                min="1"
                max="99"
                step="1"
                value={this.state.amount}
                onChange={event =>
                  this.setState({ amount: parseInt(event.target.value, 10) })
                }
              />
              <p className="descriptor">
                This will change the amount of alteration to the underlying
                image data. Depending on other parameters, this might have a
                marginal effect.
              </p>
            </div>
          </FormGroup>
          <FormGroup>
            <div>
              <b>Quality:</b>
              <input
                className="slider quality"
                disabled={this.state.glitchControlled}
                type="range"
                min="1"
                max="99"
                step="1"
                value={this.state.quality}
                onChange={event =>
                  this.setState({ quality: parseInt(event.target.value, 10) })
                }
              />
              <p className="descriptor">
                This will change the quality (pixelation) of the original base
                image.
              </p>
            </div>
          </FormGroup>
          <FormGroup>
            <div>
              <b>Degree of distortion:</b>
              <input
                className="slider distortion"
                disabled={this.state.glitchControlled}
                type="range"
                min="1"
                max="99"
                step="1"
                value={this.state.distortion}
                onChange={event =>
                  this.setState({
                    distortion: parseInt(event.target.value, 10)
                  })
                }
              />
              <p className="descriptor">
                This will change the number of iterations the image undergoes.
                At the max, the image may be unrecognizable. This parameter will
                have the most observable effect on the glitch.
              </p>
            </div>
          </FormGroup>
        </FormGroup>
      </Form>
    );
  }

  render() {
    let previewImage = null;
    let loader = null;
    if (this.state.originalFiles.length !== 0) {
      previewImage = <img className="folder-icon" src={placeholder} alt="" />;
    }
    if (this.state.glitchLoading) {
      loader = <Spinner color="primary" />;
    }

    let glitchButtonStatus = false;
    if (this.state.originalFiles.length === 0) {
      glitchButtonStatus = true;
    }

    const options = this.OptionsForm();

    return (
      <Container className="previewComponent">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
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
          <Col xs={12} sm={12} md={12} lg={6} xl={6} className="uploadField">
            <Container className="imgPreview">{previewImage}</Container>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} xl={6} className="optionField">
            {options}
            <Button
              color="danger"
              onClick={this.handleGlitch}
              className="glitch-button"
              disabled={glitchButtonStatus}
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

Glitch.propTypes = {
  callback: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export default Glitch;
