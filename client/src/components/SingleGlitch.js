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
import Checkbox from '@material-ui/core/Checkbox';
import { saveAs } from 'file-saver';
import glitch from 'glitch-canvas';

import PropTypes from 'prop-types';

//function to convert url to pure base64
function toBase64(url) {
  const base64 = url.replace(/^data:image\/[a-z]+;base64,/, '');
  return base64;
}

//function to package images from array into zip for download
//using jszip framework-- install with npm --save install jszip in client dir
const downloadZip = props => {
  const JSZip = require('jszip');
  const zip = new JSZip();
  const img = zip.folder('Glitches');
  const array = props;
  let i = 0;
  array.forEach(element => {
    i = i + 1;
    const base64img = toBase64(element);
    img.file(`glitch${i}.jpg`, base64img, { base64: true });
  });
  zip.generateAsync({ type: 'blob' }).then(content => {
    saveAs(content, 'glitch.zip');
  });
};

class SingleGlitch extends Component {
  constructor() {
    super();
    const Selected = new Set();
    this.state = {
      distortion: 1,
      quality: 99,
      amount: 35,
      currentImage: undefined,
      savedGlitches: [],
      selected: Selected,
      glitchControlled: 'disabled',
      origImage: undefined,
      seed: 10
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleGlitch = this.handleGlitch.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.OptionsForm = this.OptionsForm.bind(this);
    this.setRandom = this.setRandom.bind(this);
    this.setControlled = this.setControlled.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
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
            this.setState({ origImage: reader.result });
          },
          false
        );
        reader.readAsDataURL(file);
      }
    }
  }

  // handleGlitch() {
  //   const file = document.querySelector('input').files[0];
  //   if (file) {
  //     // create reader
  //     const reader = new FileReader();
  //     // reader.readAsText(file);
  //     reader.addEventListener(
  //       'load',
  //       () => {
  //         const charToDelete = 300; // on forward this value will be randomized
  //         const imageUrlOffset = 25;
  //         let data = reader.result;
  //         const rand = Math.random() * Math.floor(data.length);

  //         if (rand > imageUrlOffset) {
  //           data = data.replace(data.slice(rand, rand + charToDelete), '');
  //         } else {
  //           // prevents removing the url section of the data
  //           data = data.replace(
  //             data.slice(rand + charToDelete, rand + charToDelete * 2),
  //             ''
  //           );
  //         }
  //         this.setState({ currentImage: data });
  //       },
  //       false
  //     );
  //     if (file) {
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  handleGlitch() {
    if (this.state.glitchControlled === 'disabled') {
      this.setState({ distortion: Math.floor(Math.random() * 99) + 1 });
      this.setState({ amount: Math.floor(Math.random() * 99) + 1 });
      this.setState({ quality: Math.floor(Math.random() * 99) + 1 });
    }
    this.setState({ seed: Math.floor(Math.random() * 101) });
    const glitchParams = {
      seed: this.state.seed,
      quality: this.state.quality,
      amount: this.state.amount,
      iterations: this.state.distortion
    };
    const image = new Image();
    image.src = this.state.origImage;
    image.onload = () => {
      glitch(glitchParams)
        .fromImage(image)
        .toDataURL()
        .then(dataURL => {
          this.renderImage(dataURL, image.width, image.height).then(result => {
            this.setState({ currentImage: result });
          });
        });
    };
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

  handleProfile() {
    this.state.selected.forEach(i => {
      const now = new Date();
      const newImage = {
        data: this.state.savedGlitches[i],
        createdAt: now.toISOString()
      };
      fetch('/api/images', {
        method: 'POST',
        body: JSON.stringify(newImage),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .catch(err => console.log(err)); // eslint-disable-line no-console
    });
  }

  handleSave() {
    const newSavedGliches = this.state.savedGlitches;
    newSavedGliches.push(this.state.currentImage);
    this.setState({ savedGlitches: newSavedGliches });
  }

  handleDownload() {
    const downloadArray = [];
    this.state.selected.forEach(i =>
      downloadArray.push(this.state.savedGlitches[i])
    );
    downloadZip(downloadArray);
  }

  handleChange = i => () => {
    const newSelected = this.state.selected;
    if (!this.state.selected.has(i)) {
      newSelected.add(i);
    } else {
      newSelected.delete(i);
    }
    this.setState({ selected: newSelected });
  };

  //sets glitch param state when random radio button is clicked
  setRandom() {
    this.setState({ distortion: Math.floor(Math.random() * 99) + 1 });
    this.setState({ amount: Math.floor(Math.random() * 99) + 1 });
    this.setState({ quality: Math.floor(Math.random() * 99) + 1 });
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
          <FormGroup check className="options">
            <Label check>
              <Input
                type="radio"
                name="options"
                onChange={() => {
                  this.setRandom();
                  this.handleGlitch();
                }}
                defaultChecked
              />
              <b>Random:</b>
              <FormText color="muted">
                This will glitch your uploaded image in a completely random
                manner.
              </FormText>
            </Label>
          </FormGroup>
          <Button
            className="random-button"
            size="sm"
            color="danger"
            onClick={() => {
              this.setRandom();
              this.handleGlitch();
            }}
            disabled={!this.state.glitchControlled}
          >
            Randomize
          </Button>
        </FormGroup>
        <FormGroup check className="options">
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
                id="glitchAmount"
                className="slider"
                disabled={this.state.glitchControlled}
                type="range"
                min="1"
                max="99"
                step="1"
                value={this.state.amount}
                onChange={event => {
                  this.setState({ amount: parseInt(event.target.value, 10) });
                  this.handleGlitch();
                }}
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
                className="slider"
                id="glitchQuality"
                disabled={this.state.glitchControlled}
                type="range"
                min="1"
                max="99"
                step="1"
                value={this.state.quality}
                onChange={event => {
                  this.setState({ quality: parseInt(event.target.value, 10) });
                  this.handleGlitch();
                }}
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
                className="slider"
                id="glitchDistortion"
                disabled={this.state.glitchControlled}
                type="range"
                min="1"
                max="99"
                step="1"
                value={this.state.distortion}
                onChange={event => {
                  this.setState({
                    distortion: parseInt(event.target.value, 10)
                  });
                  this.handleGlitch();
                }}
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
    const { currentImage, savedGlitches, selected } = this.state;
    let imageswithCheck;
    if (savedGlitches) {
      let i = 0;
      const glitches = savedGlitches.map(elem => (
        <Container
          className="imageContainer"
          key={i}
          onClick={this.handleChange(i)}
        >
          <img className="saveImg" src={elem} alt="" />
          <Container className="checkBox">
            <Checkbox checked={this.state.selected.has(i++)} />
          </Container>
        </Container>
      ));
      imageswithCheck = (
        <Container className="previewBox">{glitches}</Container>
      );
    }

    const downloadButton = (
      <Button
        color="danger"
        onClick={this.handleDownload}
        className="download-button"
      >
        Download Selected
      </Button>
    );

    const profileButton = (
      <Button
        color="danger"
        onClick={this.handleProfile}
        className="profile-button"
      >
        Save Selected to Profile
      </Button>
    );

    const options = this.OptionsForm();

    return (
      <Container className="previewComponent">
        <Row>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
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
          <Col xs={12} sm={12} md={12} lg={6} xl={6} className="uploadField">
            <Container className="singlePreview">
              {currentImage && (
                <img className="single" src={currentImage} alt="" />
              )}
            </Container>
          </Col>
          <Col className="optionField">
            {options}
            <Button
              color="danger"
              onClick={this.handleSave}
              className="save-button"
              disabled={!currentImage}
            >
              Pin Glitch
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="previewField">
            <legend>
              <b>Pinned Glitches:</b>
              <p className="pinned-descriptor">
                Pinned glitches will appear below. You can select individual
                images to either save to your profile, or download directly.
                Once you leave this page, these glitches will be lost.
              </p>
            </legend>
            {imageswithCheck}
            {selected.size !== 0 && downloadButton}{' '}
            {this.props.loggedIn && selected.size !== 0 && profileButton}
          </Col>
        </Row>
      </Container>
    );
  }
}

SingleGlitch.propTypes = {
  callback: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export default SingleGlitch;
