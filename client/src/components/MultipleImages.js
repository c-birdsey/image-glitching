import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './multiple.css';
import { saveAs } from 'file-saver';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

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
    const base64img = toBase64(element[1]);
    img.file(`glitch${i}.jpg`, base64img, { base64: true });
  });
  zip.generateAsync({ type: 'blob' }).then(content => {
    saveAs(content, 'glitch.zip');
  });
};

class Multiple extends Component {
  constructor(props) {
    super(props);

    const Selected = new Set();

    this.state = {
      imgArray: this.props.images,
      selected: Selected
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleSave = this.handleSave.bind(this);
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

  handleDownload() {
    const downloadArray = [];
    this.state.selected.forEach(i =>
      downloadArray.push(this.state.imgArray[i])
    );
    downloadZip(downloadArray);
  }

  handleSave() {
    // in case of Save All
    if (this.state.selected.size === 0) {
      const newSelected = this.state.selected;
      for (let i = 0; i < this.state.imgArray.length; i += 1) {
        newSelected.add(i);
      }
      this.setState({ selected: newSelected });
    }

    this.state.selected.forEach(i => {
      const image = this.state.imgArray[i];
      const originalString = image[0];
      const glitchString = image[1];
      const originalFile = base64ToImage(originalString);
      const glitchFile = base64ToImage(glitchString);

      const originalForm = new FormData();
      originalForm.append('image', originalFile);
      fetch('/api/image/original', {
        method: 'POST',
        body: originalForm
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then(data => {
          const glitchForm = new FormData();
          glitchForm.append('original', data.url);
          glitchForm.append('image', glitchFile);
          fetch('/api/image/glitch', {
            method: 'POST',
            body: glitchForm
          })
            .then(res => {
              if (!res.ok) {
                throw new Error(res.status_text);
              } else {
                // TODO: Add confirmation message
                this.props.back();
              }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });

    // removing all items in selected to avoid change in buttons selected.
    this.setState({ selected: new Set() });
  }

  render() {
    const array = this.state.imgArray;
    let i = 0; //used for unique keys
    const images = array.map(elem => {
      return (
        <Container key={i.toString()} fluid>
          <Row className="displayRow">
            <Col
              xs={12}
              sm={6}
              md={6}
              className="justify-content-center originalElement"
            >
              <p>
                <b>Original Image</b>
              </p>
              <img src={elem[0]} alt="" />
            </Col>
            <Col xs={12} sm={6} md={6} className="glitchedElement">
              <p>
                <b>Glitched Image</b>
              </p>
              <Container key={i} onClick={this.handleChange(i)}>
                <img className={`glitched-${i}`} src={elem[1]} alt="" />
                <Container className="checkBoxMulti">
                  <Checkbox checked={this.state.selected.has(i++)} />
                </Container>
              </Container>
            </Col>
          </Row>
        </Container>
      );
    });

    return (
      <Container className="multImages" fluid>
        <Row>
          <Col xs={6} sm={6} md={7}>
            <legend className="legend">
              <b>Glitched Library:</b>
            </legend>
            <p className="about">
              Browse through your library of glitched images below. Select the
              glitched you would like to save or download via the checkboxes in
              the upper right corners, and use the buttons to the right to add
              them to your glitch library, or download locally as a .zip file.
            </p>
          </Col>
          <Col xs={6} sm={6} md={5} className="text-right buttonBar">
            {this.state.selected.size === 0 && (
              <Button
                className="buttons"
                size="sm"
                color="primary"
                onClick={() => {
                  this.props.back();
                }}
              >
                Back to Glitcher
              </Button>
            )}
            {this.state.selected.size === 0 && (
              <Button
                className="buttons"
                size="sm"
                color="primary"
                onClick={() => {
                  downloadZip(this.state.imgArray);
                }}
              >
                Download All
              </Button>
            )}
            {this.props.loggedIn && this.state.selected.size === 0 && (
              <Button
                className="buttons"
                size="sm"
                color="primary"
                onClick={this.handleSave}
              >
                Save All
              </Button>
            )}
            {this.state.selected.size !== 0 && (
              <Button
                outline
                className="buttons"
                onClick={this.handleDownload}
                size="sm"
                color="primary"
              >
                Download Selected
              </Button>
            )}
            {this.props.loggedIn && this.state.selected.size !== 0 && (
              <Button
                outline
                className="buttons"
                size="sm"
                color="primary"
                onClick={this.handleSave}
              >
                Save Selected
              </Button>
            )}
          </Col>
        </Row>
        {images}
      </Container>
    );
  }
}

Multiple.propTypes = {
  images: PropTypes.array.isRequired,
  back: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export default Multiple;
