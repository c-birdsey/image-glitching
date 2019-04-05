// code has a minor bug, sometimes it fails to preview image
// functionality is simplified.
// Prof. Andrews advised to manipulate dataURI instead of image's text

import React, { Component } from 'react';

class Glitch extends Component {
  constructor() {
    super();

    this.state = {};

    this.handleShow = this.handleShow.bind(this);
    this.handleGlitch = this.handleGlitch.bind(this);
  }

  handleShow() {
    const preview = document.querySelector('img');
    const file = document.getElementById('myfileinput').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function() {
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleGlitch() {
    const fileInput = document.getElementById('myfileinput');
    const preview = document.querySelector('img');
    // files is a FileList object
    const file = fileInput.files[0];

    console.log(file);

    if (file) {
      // create reader
      const reader = new FileReader();
      // reader.readAsText(file);

      reader.addEventListener(
        'load',
        function() {
          const charToDelete = 200; // on forward this value will be randomized
          const imageUrlOffset = 25;
          let data = reader.result;
          const rand = Math.random() * Math.floor(data.length);

          if (rand > imageUrlOffset) {
            data = data.replace(data.slice(rand, rand + charToDelete), '');
          } else {
            // prevents removing the url section of the data
            data = data.replace(
              data.slice(rand + charToDelete, rand + charToDelete * 2),
              ''
            );
          }

          console.log(data);
          preview.src = data;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Glitching. . .</h1>
        <input id="myfileinput" type="file" onChange={this.handleShow} />
        <img className="styled" src="" alt="preview . . ." height="200" />
        <button className="styled" onClick={this.handleGlitch}>
          Glitch
        </button>
      </div>
    );
  }
}

export default Glitch;
