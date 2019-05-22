import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/Landing';
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import LibraryGlitch from './components/LibraryGlitch';
import SingleGlitch from './components/SingleGlitch';
import MenuBar from './components/MenuBar';
import MultipleGlitches from './components/MultipleImages';
import Profile from './components/Profile';
import Documentation from './components/Documentation';
import Collage from './components/Collager';

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
      loggedIn: false,

      //for dropdown button
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.ShowMultiple = this.ShowMultiple.bind(this);
  }

  //call back to switch to page showing multiple glitches
  ShowMultiple(array) {
    const imageArray = array;
    this.setState({ glitchArray: imageArray });
    this.setState({ mode: 'displayLibrary' });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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

      const dropdownButton = (
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret color="primary" className="Landing-button">
            Glitch Images
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => this.setState({ mode: 'uploadSingle' })}
            >
              Single Image
            </DropdownItem>
            <DropdownItem
              onClick={() => this.setState({ mode: 'uploadMultiple' })}
            >
              Library of Images
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      );

      const collageButton = (
        <Button
          className="Landing-button"
          color="primary"
          onClick={() => this.setState({ mode: 'collage' })}
        >
          Collage Images
        </Button>
      );

      const documentation = (
        <Button
          className="Landing-button"
          color="primary"
          onClick={() => this.setState({ mode: 'documentation' })}
        >
          Documentation and Credits
        </Button>
      );

      return (
        <div>
          {menuBar}
          {content}
          <div className="Landing-buttons">
            {dropdownButton} {collageButton} {documentation}
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
            profile={() => {
              this.setState({ mode: 'profile' });
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

    if (this.state.mode === 'collage') {
      return (
        <div>
          {menuBar}
          <Collage loggedIn={this.state.loggedIn} />
        </div>
      );
    }

    //Glitching a single image
    return (
      <div>
        {menuBar}
        <SingleGlitch id="singleComp" loggedIn={this.state.loggedIn} />
      </div>
    );
  }
}

export default App;
