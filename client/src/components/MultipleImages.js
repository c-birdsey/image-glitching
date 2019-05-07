import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './multiple.css';
import { saveAs } from 'file-saver';
import Checkbox from '@material-ui/core/Checkbox';
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
    console.log(element);
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
    console.log(newSelected);
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
    console.log('saving');
  }

  render() {
    const array = this.state.imgArray;
    let i = 0; //used for unique keys
    console.log(array);
    const images = array.map(elem => {
      i++;
      return (
        <Container key={i.toString()} fluid>
          <Row className="displayRow">
            <Col
              xs={12}
              sm={6}
              md={5}
              className="justify-content-center originalElement"
            >
              <p>
                <b>Original Image</b>
              </p>
              <img src={elem[0]} alt="" />
            </Col>
            <Col xs={12} sm={6} md={5} className="glitchedElement">
              <p>
                <b>Glitched Image</b>
              </p>
              <Container key={i} onClick={this.handleChange(i)}>
                <img src={elem[1]} alt="" />
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
              Browse through your library of glitched images below. You can
              download a single glitch with the link to the right of the image,
              or you can downlaod the entire library as a .zip file with the
              button to the right.
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
                Download Glitch
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
                Save Glitch
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
