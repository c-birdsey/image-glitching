import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/Landing';
import { Button } from 'reactstrap';
import LibraryGlitch from './components/LibraryGlitch';
import SingleGlitch from './components/SingleGlitch';
import MenuBar from './components/MenuBar';
import Login from './components/Login';
import MultipleGlitches from './components/MultipleImages';
import Profile from './components/Profile';

class App extends Component {
  constructor() {
    super();

    this.state = {
      //mode options are: landing, login, displayLibrary, uploadMultiple, profile
      mode: 'landing',

      //this stores the array of glitched images and originals from LibraryGlitch
      //Passed down to multiple images displayer
      glitchArray: [],

      // keep the state if user is logged in or not
      loggedIn: true
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
          home={() => this.setState({ mode: 'landing' })}
          profile={() => this.setState({ mode: 'profile' })}
          logIn={() => this.setState({ loggedIn: true })}
          logOut={() => this.setState({ loggedIn: false })}
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

      return (
        <div>
          {menuBar}
          {content}
          <div className="Landing-buttons">
            {singleImageButton} {multipleImageButton}
          </div>
        </div>
      );
    }

    if (this.state.mode === 'profile') {
      return (
        <div>
          {menuBar}
          <Profile />
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

    //
    if (this.state.mode === 'displayLibrary') {
      return (
        <div>
          {menuBar}
          <MultipleGlitches
            images={this.state.glitchArray}
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
          <LibraryGlitch callback={this.ShowMultiple} />
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
