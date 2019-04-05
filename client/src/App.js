import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/Landing';
import { Button } from 'reactstrap';
import Glitch from './components/Glitch';
//import Uploader from './components/Uploader';

class App extends Component {
  constructor() {
    super();

    this.state = {
      mode: 'landing'
    };
  }

  render() {
    let content;
    if (this.state.mode === 'landing') {
      content = <LandingPage />;

      const singleImageButton = (
        <Button
          className="Landing-button"
          color="primary"
          onClick={() => this.setState({ mode: 'upload' })}
        >
          Glitch Single Image
        </Button>
      );

      const multipleImageButton = (
        <Button className="Landing-button" color="primary">
          Glitch Library of Images
        </Button>
      );

      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-menu">Menu Placeholder</h1>
          </header>
          {content}
          <div className="Landing-buttons">
            {singleImageButton} {multipleImageButton}
          </div>
        </div>
      );
    }

    // we are uploading
    // no major styling for the glitch class so edit it as prefered
    return (
      <div>
        <header className="App-header">
          <h1 className="App-menu">Menu Placeholder</h1>
        </header>
        <Glitch />
      </div>
    );
  }
}

export default App;
