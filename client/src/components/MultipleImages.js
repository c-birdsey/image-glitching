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

//function to package images from array into zip for download
//using jszip framework-- install with npm install jszip in client dir
const downloadZip = props => {
  var JSZip = require('jszip');
  var zip = new JSZip();
  var img = zip.folder('Glitches');
  var array = props;
  var i = 0;
  array.forEach(function(element) {
    i = i + 1;
    img.file(`glitch${i}.jpg`, getImgData(require(`./${element[1]}.jpg`)), {
      base64: true
    });
  });
  zip.generateAsync({ type: 'blob' }).then(function(content) {
    saveAs(content, 'glitches.zip');
  });
};

//function to convert img path to data URI-- not working
//this won't be neceessary once we decide how data is pulled from server
function getImgData(imgURL) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var image = new Image();
  image.src = imgURL;
  image.onload = function() {
    context.drawImage(image, 100, 100);
  };
  var imgData = canvas.toDataURL(image);
  return imgData;
}

class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      imgArray: [['test', 'test1'], ['test', 'test1'], ['test', 'test1']]
    };
  }

  render() {
    let array = this.state.imgArray;
    let images = array.map(image => {
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
