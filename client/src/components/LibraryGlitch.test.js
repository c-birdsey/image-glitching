/* eslint-disable no-unused-vars */

import React from 'react';
import { mount } from 'enzyme';

import LibraryGlitch from './LibraryGlitch';
import { findButton, sampleImage, sampleImages } from '../setupTests';

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

    test('has glitch button', () => {
      const button = findButton(libGlitch, /Glitch Images/i);
      expect(button.exists()).toBe(true);
      button.simulate('click');
    });

    test('displays amount input', () => {
      const amount = libGlitch.find('.amount');
      expect(amount.exists()).toBe(true);
    });

    test('displays quality input', () => {
      const amount = libGlitch.find('.quality');
      expect(amount.exists()).toBe(true);
    });

    test('displays distortion input', () => {
      const amount = libGlitch.find('.distortion');
      expect(amount.exists()).toBe(true);
    });

    test('Has random option', () => {
      const amount = libGlitch.find('.random');
      expect(amount.exists()).toBe(true);
    });

    test('Has controlled option', () => {
      const amount = libGlitch.find('.controlled');
      expect(amount.exists()).toBe(true);
    });
  });

  describe('uploading', () => {
    test('handleShow saves orig images', () => {});

    test('handleShow sets a placeholder', () => {});
  });

  describe('glitching functionality', () => {
    test('renderImage returns promise', () => {});

    test('glitching calls callback', () => {});
  });

  describe('PropTypes', () => {
    test('Has PropTypes defined', () => {
      expect(LibraryGlitch).toHaveProperty('propTypes');
    });
  });
});
