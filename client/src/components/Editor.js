import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSave() {
    const now = new Date();
    const newComment = {
      content: this.state.content,
      time: now.toISOString()
    };
    this.props.complete(newComment);
  }

  handleCancel() {
    this.props.complete();
  }

  render() {
    const { content } = this.state;

    return (
      <Form id="editorComp">
        <FormGroup>
          <Label for="Comment">
            <h3 className="comment-title">New Comment</h3>
          </Label>
          <Input
            id="comment"
            name="textInput"
            type="textarea"
            placeholder="Enter your new comment here"
            cols="80"
            rows="5"
            value={content}
            onChange={e => this.setState({ content: e.target.value })}
          />
        </FormGroup>
        <div>
          <Button
            color="danger"
            disabled={content === ''}
            onClick={this.handleSave}
          >
            Save
          </Button>{' '}
          <Button color="danger" onClick={this.handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    );
  }
}

export default Editor;
