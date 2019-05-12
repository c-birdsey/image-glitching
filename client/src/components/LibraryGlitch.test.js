/* eslint-disable no-unused-vars */

import React from 'react';
import { shallow, mount } from 'enzyme';
import LibraryGlitch from './LibraryGlitch';
import { findButton, sampleImage, flushPromises } from '../setupTests';

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

    test('slider movement', () => {
      const sliders = libGlitch.find('input[type="range"]');
      sliders.forEach(slider =>
        slider.simulate('change', { target: { value: '99' } })
      );
    });

    test('placeholder image', () => {
      libGlitch.setState({ originalFiles: [] });
      expect(libGlitch.exists('.folder-icon')).toEqual(false);
      libGlitch.setState({ originalFiles: [sampleImage] });
      expect(libGlitch.exists('.folder-icon')).toEqual(true);
    });

    test('loading icon', () => {
      libGlitch.setState({ glitchLoading: false });
      expect(libGlitch.exists('.loading-icon')).toEqual(false);
      libGlitch.setState({ glitchLoading: true });
      expect(libGlitch.exists('.loading-icon')).toEqual(true);
    });
  });

  /* describe('Glitch function', () => {
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

    test('Clicking Glitch button should call glitchLib and callback', async () => {
      const spy = jest.spyOn(libGlitch.instance(), 'glitchLib');
      const button = findButton(libGlitch, /Glitch Images/i);
      button.simulate('click');
      await flushPromises();
      expect(spy).toHaveBeenCalled();
      expect(completeCallback).toHaveBeenCalled(); 
    }); 

    test('glitchLib should call renderImage', async () => {
      const spy = jest.spyOn(libGlitch.instance(), 'renderImage');
      libGlitch.instance().glitchLib(); 
      await flushPromises();
      expect(spy).toHaveBeenCalled();
    });
  }); 
  */

  describe('Glitcher radio buttons', () => {
    let libGlitch;
    let status;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      status = false;
      libGlitch = shallow(
        <LibraryGlitch callback={completeCallback} loggedIn={status} />
      );
    });

    test('Set controlled', () => {
      const control = libGlitch.find('.control-radio');
      control.simulate('change');
      expect(libGlitch.state('glitchControlled')).toBe('');
    });

    test('Set controlled', () => {
      const control = libGlitch.find('.random-radio');
      control.simulate('change');
      expect(libGlitch.state('glitchControlled')).toBe('disabled');
    });
  });

  describe('PropTypes', () => {
    test('Has PropTypes defined', () => {
      expect(LibraryGlitch).toHaveProperty('propTypes');
    });
  });
});
