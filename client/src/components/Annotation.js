import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Annotation.css';
import Editor from './Editor';

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

    const example = {
      content:
        "ows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is",
      time: new Date('2019-01-01T00:00:00.000000Z')
    };
    this.state = {
      annotations: [example],
      editing: false
    };

    this.handleEditorReturn = this.handleEditorReturn.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  handleEditorReturn(newComment) {
    if (newComment) {
      const newAnnotations = this.state.annotations;
      newAnnotations.push(newComment);
      this.setState({ annotations: newAnnotations });
    }
    this.setState({ editing: false });
  }

  handleNew() {
    this.setState({ editing: true });
  }

  render() {
    const { Return } = this.props;
    const { editing, annotations } = this.state;

    const comments = annotations.map(element => {
      return <Comment comment={element} />;
    });

    const returnButton = (
      <Button color="danger" onClick={Return} className="return-button">
        Return to Library
      </Button>
    );

    const addButton = (
      <Button color="danger" className="add-button" onClick={this.handleNew}>
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

    const editorSection = (
      <Row>
        <Col>
          <Container className="editor-container">
            {editing && <Editor complete={this.handleEditorReturn} />}
          </Container>
        </Col>
      </Row>
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
              <img className="glitch-pic" src={this.props.Picture} alt="" />
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
        {editing && editorSection}
      </Container>
    );
  }
}

export default Annotation;
