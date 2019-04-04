import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/Landing';
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
    } else if (this.state.mode === 'upload') {
      //ignore for now, forward compatible with uploading page
      //content = <Uploader />;
      content = <LandingPage />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-menu">Menu Placeholder</h1>
        </header>
        {content}
      </div>
    );
  }
}

export default App;
