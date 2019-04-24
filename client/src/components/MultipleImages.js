import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button
  /*Form,
  FormGroup,
  Label,
  Input,
  FormText*/
} from 'reactstrap';
import './multiple.css';
import { saveAs } from 'jszip';

//function to convert img path to data URI-- not working
//this won't be neceessary once we decide how data is pulled from server
function getImgData(imgURL) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const image = new Image();
  image.src = imgURL;
  image.onload = function() {
    context.drawImage(image, 100, 100);
  };
  const imgData = canvas.toDataURL(image);
  return imgData;
}

//function to package images from array into zip for download
//using jszip framework-- install with npm install jszip in client dir
const downloadZip = props => {
  const JSZip = require('jszip');
  const zip = new JSZip();
  const img = zip.folder('Glitches');
  const array = props;
  let i = 0;
  array.forEach(element => {
    i = i + 1;
    img.file(`glitch${i}.jpg`, getImgData(require(`./${element[1]}.jpg`)), {
      base64: true
    });
  });
  zip.generateAsync({ type: 'blob' }).then(content => {
    saveAs(content, 'glitches.zip');
  });
};

class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      imgArray: [['test', 'test1'], ['test', 'test1'], ['test', 'test1']]
    };
  }

  render() {
    const array = this.state.imgArray;
    const images = array.map(image => {
      return (
        <Container fluid>
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
              <img key={image[0]} src={require(`./${image[0]}.jpg`)} alt="" />
            </Col>
            <Col xs={12} sm={6} md={5} className="glitchedElement">
              <p>
                <b>Glitched Image</b>
              </p>
              <img key={image[1]} src={require(`./${image[1]}.jpg`)} alt="" />
            </Col>
            <Col xs={12} sm={12} md={2} className="download text-center">
              <a href={require(`./${image[1]}.jpg`)} download="glitch">
                Download Glitch
              </a>
            </Col>
          </Row>
        </Container>
      );
    });
    return (
      <Container className="multImages" fluid>
        <Row>
          <Col xs={10} sm={10} md={10}>
            <legend>
              <b>Glitched Library:</b>
            </legend>
          </Col>
          <Col xs={2} sm={2} md={2} className="text-center downloadAll">
            <Button
              size="md"
              color="primary"
              onClick={() => {
                downloadZip(this.state.imgArray);
              }}
            >
              Download All
            </Button>
          </Col>
        </Row>
        {images}
      </Container>
    );
  }
}

export default Multiple;
