import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/Landing';
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
        <input
          className="Landing-button"
          type="button"
          value="Glitch Single Image"
          onClick={() => this.setState({ mode: 'upload' })}
        />
      );

      const multipleImageButton = (
        <input
          className="Landing-button"
          type="button"
          value="Glitch Library of Images"
        />
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
