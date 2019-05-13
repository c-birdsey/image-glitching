import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Annotation.css';
import Editor from './Editor';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';

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
    this.state = {
      annotations: [],
      editing: false
    };

    this.handleEditorReturn = this.handleEditorReturn.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  componentDidMount() {
    fetch(`/api/image/${this.props.Picture.id}/comments`, {
      headers: new Headers({ Accept: 'application/json' })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then(comments => {
        this.setState({ annotations: comments });
      })
      .catch(err => console.log(err));
  }

  handleEditorReturn(newComment) {
    if (newComment) {
      fetch(`/api/image/${this.props.Picture.id}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then(comment => {
          const newAnnotations = this.state.annotations;
          newAnnotations.push(comment);
          this.setState({ annotations: newAnnotations });
        })
        .catch(err => console.log(err));
    }
    this.setState({ editing: false });
  }

  removeComment(oldComment) {
    fetch(`/api/comments/${oldComment.id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        const newAnnotations = this.state.annotations.filter(
          comment => comment.id !== oldComment.id
        );
        this.setState({ annotations: newAnnotations });
      })
      .catch(err => console.log(err));
  }

  handleNew() {
    this.setState({ editing: true });
  }

  handleDelete() {
    this.props.deleteGlitch(this.props.Picture);
    this.props.Return();
  }

  handleDownload() {
    const toDownload = [];
    let allAnnotations = '';
    this.state.annotations.forEach(entry => {
      allAnnotations +=
        `Entry: ${entry.content}\n` +
        `Edited: ${new Date(entry.time).toLocaleString()}\n \n`; //eslint-disable-line no-useless-concat
    });
    toDownload.push(this.props.Picture);
    toDownload.push(allAnnotations);
    downloadZip(toDownload);
  }

  render() {
    const { Return } = this.props;
    const { editing, annotations } = this.state;
    const comments = annotations.map(element => {
      return (
        <div key={element.id} className="comment-container">
          <div className="comment-text">{element.body}</div>
          <div className="row">
            <button
              className="btn btn-link"
              onClick={() => {
                this.removeComment(element);
              }}
            >
              Delete
            </button>
            <p className="comment-time">
              {new Date(element.createdAt).toLocaleString()}
            </p>
          </div>
          <hr className="divider" />
        </div>
      );
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
              <img className="pic" src={this.props.Picture.original} alt="" />
            </div>
          </Col>
          <Col xs={12} md={10} lg={6} className="img-col">
            <h2>Glitched Image</h2>
            <div className="img-container">
              <img className="pic" src={this.props.Picture.url} alt="" />
            </div>
          </Col>
        </Row>
        <Row xs={12} md={12} lg={12} className="glitch-buttons">
          {returnButton}
          {deleteButton}
          <p className="glitch-time ml-auto mr-3">
            <span className="font-weight-bold">Created: </span>
            {new Date(this.props.Picture.createdAt).toLocaleString()}
          </p>
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

Annotation.propTypes = {
  Return: PropTypes.func.isRequired,
  Picture: PropTypes.object.isRequired,
  deleteGlitch: PropTypes.func.isRequired
};

export default Annotation;
