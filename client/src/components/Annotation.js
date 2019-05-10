import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Annotation.css';
import Editor from './Editor';
import { saveAs } from 'file-saver';

export function Comment(props) {
  const {
    comment: { content, time }
  } = props;

  return (
    <div className="comment-container">
      <div className="comment-text">{content}</div>
      <p className="comment-time">{new Date(time).toLocaleString()}</p>
      <hr className="divider" />
    </div>
  );
}
function toBase64(url) {
  const base64 = url.replace(/^data:image\/[a-z]+;base64,/, '');
  return base64;
}

const downloadZip = props => {
  const JSZip = require('jszip');
  const zip = new JSZip();
  const download = zip.folder('GlitchAndAnnotations');
  const base64img = toBase64(props[0]);
  download.file(`image.jpg`, base64img, { base64: true });
  download.file('Annotations/Annotations.txt', props[1], {
    type: 'text/plain;charset=utf-8'
  });
  zip.generateAsync({ type: 'blob' }).then(content => {
    saveAs(content, 'GlitchAndAnnotations.zip');
  });
};

class Annotation extends Component {
  constructor(props) {
    super(props);

    const example = {
      content:
        "Follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is The story follows the world of a human's body which is",
      time: new Date('2019-01-01T00:00:00.000000Z')
    };
    this.state = {
      annotations: [example],
      editing: false
    };

    this.handleEditorReturn = this.handleEditorReturn.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
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

  handleDelete() {
    console.log('delete from server');
    this.props.Return();
  }
  handleDownload() {
    const toDownload = [];
    let allAnnotations = '';
    this.state.annotations.forEach(entry => {
      allAnnotations +=
        'Entry: ' + entry.content + '\n' + 'Edited: ' + entry.time + '\n \n'; //eslint-disable-line no-useless-concat
    });
    toDownload.push(this.props.Picture);
    toDownload.push(allAnnotations);
    downloadZip(toDownload);
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
      <Container className="editor-container">
        {editing && <Editor complete={this.handleEditorReturn} />}
      </Container>
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
      <Container className="content">
        <Row className="glitches-row">
          <Col xs={12} md={10} lg={6} className="img-col">
            <h2>Original Image</h2>
            <div className="img-container">
              <img className="pic" src={this.props.Picture} alt="" />
            </div>
          </Col>
          <Col xs={12} md={10} lg={6} className="img-col">
            <h2>Glitched Image</h2>
            <div className="img-container">
              <img className="pic" src={this.props.Picture} alt="" />
            </div>
          </Col>
        </Row>
        <Row xs={12} md={12} lg={12} className="glitch-buttons">
          {returnButton}
          {deleteButton}
        </Row>
        <Row className="annotation-row">
          <Col xs={12} md={12} lg={12}>
            <h2>Annotations</h2>
            <Container fluid className="annotation-box">
              {comments}
            </Container>
          </Col>
        </Row>
        <Row className="anno-buttons">
          {addButton}
          {downloadButton}
        </Row>
        <Row className="add-row">{editing && editorSection}</Row>
      </Container>
    );
  }
}

export default Annotation;
