import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Annotation.css';
import placeholder from './sqr.jpg';

class Annotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Annotations: []
    };
  }

  render() {
    const returnButton = (
      <Button
        color="danger"
        onClick={this.handleReturn}
        className="return-button"
      >
        Return to Library
      </Button>
    );

    const deleteButton = (
      <Button
        color="danger"
        onClick={this.handleDelete}
        className="delete-button"
      >
        Delete Glitch
      </Button>
    );

    return (
      <Container fluid>
        <Row>
          <Col xs={12} sm={5} md={5} lg={4} className="glitch-img">
            <img className="glitch-pic" src={placeholder} alt="" />
            <div>
              {returnButton}
              {deleteButton}
            </div>
          </Col>
          <Col xs={12} sm={5} md={5} lg={6} className="annotations-area">
            <div className="annotation-text">
              <h2>
                Annotations
                <Button size="sm" color="danger" className="add-button">
                  Add New
                </Button>
              </h2>
              <Container fluid className="annotation-box">
                The story follows the world of a human's body which is
                represented as cities with roughly 37.2 trillion anthropomorphic
                cells who work together endlessly daily to run their world.
                Everyday, they struggle to remove and resist against pathogenic
                cells such as germs and bacteria from invading the body. The
                story follows the world of a human's body which is represented
                as cities with roughly 37.2 trillion anthropomorphic cells who
                work together endlessly daily to run their world. Everyday, they
                struggle to remove and resist against pathogenic cells such as
                germs and bacteria from invading the body. The story follows the
                world of a human's body which is represented as cities with
                roughly 37.2 trillion anthropomorphic cells who work together
                endlessly daily to run their world. Everyday, they struggle to
                remove and resist against pathogenic cells such as germs and
                bacteria from invading the body. The story follows the world of
                a human's body which is represented as cities with roughly 37.2
                trillion anthropomorphic cells who work together endlessly daily
                to run their world. Everyday, they struggle to remove and resist
                against pathogenic cells such as germs and bacteria from
                invading the body.
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Annotation;
