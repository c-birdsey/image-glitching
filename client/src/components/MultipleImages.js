//import React, { Component } from 'react';
/*import {
  Container,
  Row,
  Col
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
//import './multiple.css';
import testImg from './test.jpg';

//to do: a function to iterate through array of objects and pull originals and
//glitched images passed as props from Glitch.js
function BuildDisplay(props) {
  //props will be an array of objects but for now will use a placeholder
  let testRange = 3;
  const testDisplay = document.createElement('Container');
  testDisplay.setAttribute('id', 'baseDisplay');
  testDisplay.setAttribute('className', 'displayContainer');

  for (testRange; testRange > 0; testRange--) {
    */ /* console.log(testRange); 
        var row = document.createElement("Row");
        row.setAttribute("className", "displayRow");
        var colOrig = document.createElement("Col");
        colOrig.setAttribute("className", "originalElement");
        var colGlitch = document.createElement("Col");
        colGlitch.setAttribute("className", "glitchedElement");
        var img = document.createElement("img");
        img.src = {testImg}; 
        img.setAttribute("alt", "Image");
        img.setAttribute("height", "200");
        img.setAttribute("width", "auto");
        document.getElementById("glitchedElement").appendChild(img);
        document.getElementById("originalElement").appendChild(img);
        document.getElementById("displayRow").appendChild(colOrig);
        document.getElementById("displayRow").appendChild(colGlitch);
        
        /*var newElement = (
            <Row className="displayRow">
                <Col className="originalElement">
                    <img src={testImg} alt="" height="200" width="auto" /> 
                </Col>
                <Col className="glitchedElement">
                    <img src={testImg} alt="" height="200" width="auto" /> 
                </Col>
            </Row>
        );*/ /*
    const row = document.createElement('div');
    document.getElementById('baseDisplay').appendChild(row);
  }
  return testDisplay;
}

class Multiple extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    let display;
    display = BuildDisplay();
    return { display };
    */ /*<div>
                <p>TESTING</p>
                <Container className="displayContainer" id="baseDisplay">
                    <Row className="displayRow">
                        <Col className="originalElement">
                            <img src="../test.jpg" alt="" height="100" width="100" /> 
                        </Col>
                        <Col className="glitchedElement">
                            <img src="../test.jpg" alt="" height="100" width="100" /> 
                        </Col>
                    </Row>
                </Container>
            </div>*/ /*
  }
}

export default Multiple;*/
