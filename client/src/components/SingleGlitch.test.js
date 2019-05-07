import React from 'react';
import { mount } from 'enzyme';

import SingleGlitch from './SingleGlitch';
import { findButton } from '../setupTests';

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
  });

  describe('PropTypes', () => {
    test('Has PropTypes defined', () => {
      expect(SingleGlitch).toHaveProperty('propTypes');
    });
  });
});
