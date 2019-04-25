import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/Landing';
import { Button } from 'reactstrap';
import LibraryGlitch from './components/LibraryGlitch';
import SingleGlitch from './components/SingleGlitch';
import MenuBar from './components/MenuBar';
import Login from './components/Login';
import MultipleGlitches from './components/MultipleImages';

class App extends Component {
  constructor() {
    super();

    this.state = {
      mode: 'uploadMultiple',
      //this stores the array of glitched images and originals from LibraryGlitch
      //Passed down to multiple images displayer
      glitchArray: null
    };

    this.ShowMultiple = this.ShowMultiple.bind(this);
  }

  //call back to switch to page showing multiple glitches
  ShowMultiple(glitchArray) {
    console.log('testing');
    let imageArray = glitchArray;
    this.setState({ glitchArray: imageArray });
    this.setState({ mode: 'glitch_library' });
  }

  render() {
    let content;
    const menuBar = (
      <div className="App-menu">
        <MenuBar
          home={() => this.setState({ mode: 'landing' })}
          login={() => this.setState({ mode: 'login' })}
        />
      </div>
    );
    if (this.state.mode === 'landing') {
      content = <LandingPage />;

      const singleImageButton = (
        <Button
          className="Landing-button"
          color="primary"
          onClick={() => this.setState({ mode: 'uploadSingle' })}
        >
          Glitch Single Image
        </Button>
      );

      //incomplete-- will add handler when we figure out how to handle libs
      const multipleImageButton = (
        <Button
          className="Landing-button"
          color="primary"
          onClick={() => this.setState({ mode: 'uploadMultiple' })}
        >
          Glitch Library of Images
        </Button>
      );

      return (
        <div className="App">
          {menuBar}
          {content}
          <div className="Landing-buttons">
            {singleImageButton} {multipleImageButton}
          </div>
        </div>
      );
    }

    if (this.state.mode === 'login') {
      return (
        <div>
          {menuBar}
          <Login home={() => this.setState({ mode: 'landing' })} />
        </div>
      );
    }

    if (this.state.mode === 'glitch_library') {
      return (
        <div>
          {menuBar}
          <MultipleGlitches images={this.state.glitchArray} />
        </div>
      );
    }

    // we are uploading a library of images
    // no major styling for the glitch class so edit it as prefered
    if (this.state.mode === 'uploadMultiple') {
      return (
        <div>
          {menuBar}
          <LibraryGlitch callback={this.ShowMultiple} />
        </div>
      );
    }

    //Glitching a single image
    return (
      <div>
        {menuBar}
        <SingleGlitch />
      </div>
    );
  }
}

export default App;
