import React from 'react';
import { mount } from 'enzyme';

import SingleGlitch from './SingleGlitch';
import { findButton, sampleImage } from '../setupTests';

const image2base64 = require('image-to-base64');

describe('Single Glitcher tests', () => {
  describe('Glitcher interface', () => {
    let singleGlitch;
    let status;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      status = false;
      singleGlitch = mount(
        <SingleGlitch callback={completeCallback} loggedIn={status} />
      );
    });

    test('Has Glitch button', () => {
      const button = findButton(singleGlitch, /Glitch Image/i);
      expect(button.exists()).toBe(true);
    });

    test('Glitch Changes Image', () => {
      singleGlitch.setState({ currentImage: sampleImage });
      const button = findButton(singleGlitch, /Glitch Image/i);
      button.simulate('click');
      image2base64(sampleImage['src'])
        .then(response => {
          console.log(response); //iVBORw0KGgoAAAANSwCAIA...
        })
        .catch(error => {
          console.log(error); //Exepection error....
        });
      expect(singleGlitch.state().currentImage).not.toEqual(sampleImage);
    });

    test('Can Pin Glitches', () => {
      singleGlitch.setState({ currentImage: sampleImage });
      const button = findButton(singleGlitch, /Glitch Image/i);
      button.simulate('click');
      expect(singleGlitch.state().savedGlitches).toEqual([]);
      const pin = findButton(singleGlitch, /Pin Glitch/i);
      pin.simulate('click');
      expect(singleGlitch.state().savedGlitches).toEqual([sampleImage]);
    });
  });

  describe('PropTypes', () => {
    test('Has PropTypes defined', () => {
      expect(SingleGlitch).toHaveProperty('propTypes');
    });
  });
});
