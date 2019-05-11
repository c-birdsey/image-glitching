import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/Landing';
import { Button } from 'reactstrap';
import LibraryGlitch from './components/LibraryGlitch';
import SingleGlitch from './components/SingleGlitch';
import MenuBar from './components/MenuBar';
import MultipleGlitches from './components/MultipleImages';
import Profile from './components/Profile';
import Documentation from './components/Documentation';

class App extends Component {
  constructor() {
    super();

    this.state = {
      //mode options are: landing, login, displayLibrary, uploadMultiple,
      //  profile, documentation
      mode: 'landing',

      //this stores the array of glitched images and originals from LibraryGlitch
      //Passed down to multiple images displayer
      glitchArray: [],

      // keep the state if user is logged in or not
      loggedIn: false
    };

    this.ShowMultiple = this.ShowMultiple.bind(this);
  }

  //call back to switch to page showing multiple glitches
  ShowMultiple(array) {
    const imageArray = array;
    this.setState({ glitchArray: imageArray });
    this.setState({ mode: 'displayLibrary' });
  }

  render() {
    let content;
    const menuBar = (
      <div className="App-menu">
        <MenuBar
          id="menuBar"
          home={() => this.setState({ mode: 'landing' })}
          profile={() => this.setState({ mode: 'profile' })}
          logIn={() => this.setState({ loggedIn: true })}
          logOut={() => this.setState({ loggedIn: false, mode: 'landing' })}
          loggedIn={this.state.loggedIn}
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

      const multipleImageButton = (
        <Button
          className="Landing-button"
          color="primary"
          onClick={() => this.setState({ mode: 'uploadMultiple' })}
        >
          Glitch Library of Images
        </Button>
      );

      const documentation = (
        <Button
          className="Landing-button"
          color="primary"
          onClick={() => this.setState({ mode: 'documentation' })}
        >
          Documentation
        </Button>
      );

      return (
        <div>
          {menuBar}
          {content}
          <div className="Landing-buttons">
            {singleImageButton} {multipleImageButton} {documentation}
          </div>
        </div>
      );
    }

    if (this.state.mode === 'profile') {
      return (
        <div>
          {menuBar}
          <Profile id="profileComp" />
        </div>
      );
    }

    if (this.state.mode === 'documentation') {
      return (
        <div>
          {menuBar}
          <Documentation id="documentationComp" />
        </div>
      );
    }

    //
    if (this.state.mode === 'displayLibrary') {
      return (
        <div>
          {menuBar}
          <MultipleGlitches
            id="multiglitchComp"
            images={this.state.glitchArray}
            loggedIn={this.state.loggedIn}
            back={() => {
              this.setState({ mode: 'uploadMultiple' });
            }}
          />
        </div>
      );
    }

    // we are uploading a library of images
    // no major styling for the glitch class so edit it as prefered
    if (this.state.mode === 'uploadMultiple') {
      return (
        <div>
          {menuBar}
          <LibraryGlitch
            id="libraryComp"
            callback={this.ShowMultiple}
            loggedIn={this.state.loggedIn}
          />
        </div>
      );
    }

    //Glitching a single image
    return (
      <div>
        {menuBar}
        <SingleGlitch loggedIn={this.state.loggedIn} />
      </div>
    );
  }
}

export default App;
