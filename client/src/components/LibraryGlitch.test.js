import React from 'react';
import { mount } from 'enzyme';

import LibraryGlitch from './LibraryGlitch';
import { findButton } from '../setupTests';

//const images = sampleImages;

//baseline tests, will add more
describe('Library Glitcher tests', () => {
  describe('Glitcher interface', () => {
    let libGlitch;
    let status;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      status = false;
      libGlitch = mount(
        <LibraryGlitch callback={completeCallback} loggedIn={status} />
      );
    });

    test('Has Glitch button', () => {
      const button = findButton(libGlitch, /Glitch Images/i);
      expect(button.exists()).toBe(true);
    });
  });

  describe('PropTypes', () => {
    test('Has PropTypes defined', () => {
      expect(LibraryGlitch).toHaveProperty('propTypes');
    });
  });
});
