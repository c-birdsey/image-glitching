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
import Checkbox from '@material-ui/core/Checkbox';
import { saveAs } from 'file-saver';
import glitch from 'glitch-canvas';

import PropTypes from 'prop-types';

//function to convert url to pure base64
function toBase64(url) {
  const base64 = url.replace(/^data:image\/[a-z]+;base64,/, '');
  return base64;
}

//function to convert base64 to jpg
function base64ToImage(image) {
  const byteString = atob(image.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const newBlob = new Blob([ab], {
    type: 'image/jpeg'
  });
  return newBlob;
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
      originalImage: undefined,
      originalUrl: undefined,
      seed: 10,
      saveLoading: false
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
    this.setLoading = this.setLoading.bind(this);
  }

  handleShow() {
    let response = true;
    if (this.state.currentImage !== undefined) {
      response = window.confirm(
        'If you upload a new image your pinned glitches will be lost. Do you want to continue?'
      );
    }
    if (response) {
      const file = document.querySelector('input').files[0];
      if (file) {
        // checks if files uploaded are images in the format jpeg | jpg |png
        if (/\.(jpe?g|png)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.addEventListener(
            'load',
            () => {
              this.setState({ originalImage: reader.result });
              this.setState({ currentImage: reader.result });
              this.setState({ originalUrl: undefined });
              // clear any pinned glitches
              const Selected = new Set();
              this.setState({ savedGlitches: [] });
              this.setState({ selected: Selected });
            },
            false
          );
          reader.readAsDataURL(file);
        }
      }
    }
  }

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
    image.src = this.state.originalImage;
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

  // uploads pinned glitches to cloudinary
  // saves glitched image in database
  uploadSaved(original) {
    this.state.selected.forEach(i => {
      const imgString = this.state.savedGlitches[i];
      const imgFile = base64ToImage(imgString);
      const formData = new FormData();
      formData.append('image', imgFile);
      formData.append('original', original);
      fetch('/api/image/glitch', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status_text);
          } else {
            const newSaved = this.state.savedGlitches;
            newSaved.splice(i);
            this.setState({ savedGlitches: newSaved });
            this.setState({ saveLoading: false });
          }
        })
        .catch(err => console.log(err));
    });
  }

  //set state for spinner, call glitcher
  setLoading() {
    this.setState({ saveLoading: true }, () => {
      this.handleProfile();
    });
  }

  handleProfile() {
    // inital save of original image
    // (only saves image on cloudinary & not db)
    if (this.state.originalUrl === undefined) {
      const ogString = this.state.originalImage;
      const ogFile = base64ToImage(ogString);
      const ogForm = new FormData();
      ogForm.append('image', ogFile);
      fetch('/api/image/original', {
        method: 'POST',
        body: ogForm
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then(data => {
          this.uploadSaved(data.url);
          this.setState({ originalUrl: data.url });
        })
        .catch(err => console.log(err));
    } else {
      this.uploadSaved(this.state.originalUrl);
    }
  }

  handleSave() {
    const newSavedGlitches = this.state.savedGlitches;
    newSavedGlitches.push(this.state.currentImage);
    this.setState({ savedGlitches: newSavedGlitches });
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
                id="randomize"
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
            <Input
              id="controlled"
              type="radio"
              name="options"
              onChange={this.setControlled}
            />
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
                name="sliderAmount"
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
                name="sliderQuality"
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
                name="sliderDistortion"
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
          <img id="savedGlitch" className="saveImg" src={elem} alt="" />
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
        id="profilebutton"
        color="danger"
        onClick={this.setLoading}
        className="profile-button"
      >
        Save Selected to Profile
      </Button>
    );

    const options = this.OptionsForm();

    let loader;
    if (this.state.saveLoading) {
      loader = <Spinner className="loading-icon" color="primary" />;
    }

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
                <img
                  id="display"
                  className="single"
                  src={currentImage}
                  alt=""
                />
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
                Once you save an image, it will disappear from this bar to
                indicate that it has been saved to your profile. If you navigate
                away from this page, these pinned glitches will be lost.
              </p>
            </legend>
            {imageswithCheck}
            {selected.size !== 0 && downloadButton}{' '}
            {this.props.loggedIn && selected.size !== 0 && profileButton}
            {loader}
          </Col>
        </Row>
      </Container>
    );
  }
}

SingleGlitch.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default SingleGlitch;
