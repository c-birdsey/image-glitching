import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Annotation.css';
import placeholder from './sqr.jpg';

export function Comment(props) {
  const {
    comment: { content, time }
  } = props;

  return (
    <div className="comment-container">
      <div className="comment-text">{content}</div>
      <p className="comment-time">{new Date(time).toLocaleString()}</p>
    </div>
  );
}

class Annotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Annotations: []
    };
  }

  render() {
    const { Return } = this.props;
    const date = new Date('2019-01-01T00:00:00.000000Z');
    const example = {
      content:
        "ows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is",
      time: date
    };
    const arrayexample = [example, example, example];
    const comments = arrayexample.map(element => {
      return <Comment comment={element} />;
    });

    const returnButton = (
      <Button color="danger" onClick={Return} className="return-button">
        Return to Library
      </Button>
    );

    const addButton = (
      <Button color="danger" className="add-button">
        Add New Comment
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

    const downloadButton = (
      <Button
        color="danger"
        onClick={this.handleDownload}
        className="download-button"
      >
        Download Glitch with Comments
      </Button>
    );

    return (
      <Container fluid className="content">
        <Row>
          <Col xs={12} md={6} lg={5} className="glitch-img">
            <div className="left-area">
              <img className="glitch-pic" src={placeholder} alt="" />
              <div>
                {returnButton}
                {deleteButton}
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} lg={7} className="annotations-area">
            <div className="annotation-text">
              <h2>Annotations</h2>
              <Container fluid className="annotation-box">
                {comments}
              </Container>
              <div className="buttons-area">
                {addButton}
                {downloadButton}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Annotation;
