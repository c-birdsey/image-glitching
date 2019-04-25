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
import { saveAs } from 'file-saver';

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

    this.state = {
      imgArray: this.props.images
    };
  }

  render() {
    const array = this.state.imgArray;
    const images = array.map(elem => {
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
              <img src={elem[0]} alt="" />
            </Col>
            <Col xs={12} sm={6} md={5} className="glitchedElement">
              <p>
                <b>Glitched Image</b>
              </p>
              <img src={elem[1]} alt="" />
            </Col>
            <Col xs={12} sm={12} md={2} className="download text-center">
              <a href={elem[1]} download="glitch">
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
          <Col xs={6} sm={6} md={7}>
            <legend>
              <b>Glitched Library:</b>
            </legend>
          </Col>
          <Col xs={6} sm={6} md={5} className="text-right buttonBar">
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
          </Col>
        </Row>
        {images}
      </Container>
    );
  }
}

export default Multiple;
