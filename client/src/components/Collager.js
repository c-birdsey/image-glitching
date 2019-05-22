import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  FormText,
  Spinner
} from 'reactstrap';
import './glitch.css';
import Checkbox from '@material-ui/core/Checkbox';
import { saveAs } from 'file-saver';
import './collager.css';
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

class Collager extends Component {
  constructor() {
    super();
    const Selected = new Set();
    this.state = {
      currentImage: undefined,
      savedGlitches: [],
      selected: Selected,
      originalImage: undefined,
      originalUrl: undefined,
      saveLoading: false,
      tileCount: 2,
      slicing: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.OptionsForm = this.OptionsForm.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.slice = this.slice.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.setSlicing = this.setSlicing.bind(this);
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

  setSlicing() {
    this.setState({ slicing: true }, () => {
      this.slice();
    });
  }

  slice() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const rows = this.state.tileCount;
    const cols = this.state.tileCount;

    const img = new Image();
    img.src = this.state.originalImage;
    img.onload = () => {
      const iw = (canvas.width = img.width);
      const ih = (canvas.height = img.height);
      const pieceWidth = iw / cols;
      const pieceHeight = ih / rows;

      const count = this.state.tileCount;
      const pieces = [];

      //create tiles
      for (let w = 0; w < count; w++) {
        for (let h = 0; h < count; h++) {
          pieces.push({ col: h, row: w });
        }
      }

      //shuffle tiles
      this.shuffle(pieces);

      //redraw tiles
      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const p = pieces[i++];
          ctx.drawImage(
            img,
            x * pieceWidth,
            y * pieceHeight,
            pieceWidth,
            pieceHeight,
            p.col * pieceWidth,
            p.row * pieceHeight,
            pieceWidth,
            pieceHeight
          );
        }
      }
      const collage = canvas.toDataURL();
      this.setState({ currentImage: collage, slicing: false });
    };
  }

  shuffle(pieces) {
    for (
      let j, x, i = pieces.length;
      i;
      j = Math.floor(Math.random() * i),
        x = pieces[--i],
        pieces[i] = pieces[j],
        pieces[j] = x
    );
    return pieces;
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

  //build options form
  OptionsForm() {
    return (
      <Form>
        <FormGroup tag="fieldset">
          <legend>
            <b>Options:</b>
          </legend>
          <FormGroup className="collage-options">
            <b>Collager:</b>
            <FormText color="muted">
              Our image collager slices the uploaded image into tiles and
              reassembles the pieces to create a new image. The number of rows
              and columns are controlled via the slider below. For example, a
              row and column count of 1 would result in an unchanged collage,
              and a row and column count of 10 would result in the image being
              sliced into 100 tiles. The maximum number of rows and columns is
              set at 150.
            </FormText>
          </FormGroup>
        </FormGroup>
        <FormGroup className="collage-options">
          <FormGroup>
            <div>
              <b>Number of rows and columns:</b>
              <input
                className="tile-input"
                type="range"
                min="1"
                max="150"
                step="1"
                value={this.state.tileCount}
                onChange={event => {
                  this.setState({
                    tileCount: parseInt(event.target.value, 10)
                  });
                }}
              />
              <input
                className="count-display"
                type="number"
                min="1"
                max="150"
                step="1"
                value={this.state.tileCount}
                onChange={event => {
                  this.setState({
                    tileCount: parseInt(event.target.value, 10)
                  });
                }}
              />
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

    let collageLoader;
    if (this.state.slicing) {
      collageLoader = (
        <Spinner size="sm" className="slice-spinner" color="light" />
      );
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
            <div className="buttonField">
              <Button
                color="danger"
                className="collageButtons"
                onClick={() => {
                  this.setSlicing();
                }}
                disabled={!currentImage}
              >
                Collage Image
                {collageLoader}
              </Button>
              <Button
                color="danger"
                onClick={this.handleSave}
                className="collageButtons"
                disabled={!currentImage}
              >
                Pin Glitch
              </Button>
            </div>
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

Collager.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default Collager;
