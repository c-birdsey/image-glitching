import React from 'react';
import { mount } from 'enzyme';
import MultipleImages from './MultipleImages.js';
import { sampleImages, findButton } from '../setupTests';

describe('PropTypes in Glitched Library', () => {
  test('Has PropTypes defined', () => {
    expect(MultipleImages).toHaveProperty('propTypes');
  });
});

describe('Buttons display and Functionality', () => {
  let multi;

  describe('buttons state when not loggedIn', () => {
    beforeEach(async () => {
      multi = mount(
        <MultipleImages images={sampleImages} back={jest.fn} loggedIn={false} />
      );
    });

    test('Glitch Library has Back to Glitcher button', () => {
      const button = findButton(multi, /Back to Glitcher/i);
      expect(button.exists()).toBe(true);
    });

    test('Glitch Library has Download All button', () => {
      const button = findButton(multi, /Download All/i);
      expect(button.exists()).toBe(true);
    });

    test('Glitch Library has Save All button', () => {
      const button = findButton(multi, /Save All/i);
      expect(button.exists()).toBe(false);
    });

    test('Glitch Library has Download Selected button', () => {
      const button = findButton(multi, /Download Selected/i);
      expect(button.exists()).toBe(false);
    });

    test('Glitch Library has Save Selected button', () => {
      const button = findButton(multi, /Save Selected/i);
      expect(button.exists()).toBe(false);
    });
  });

  describe('buttons state when loggedIn', () => {
    beforeEach(async () => {
      multi = mount(
        <MultipleImages images={sampleImages} back={jest.fn} loggedIn />
      );
    });

    test('Glitch Library has Back to Glitcher button', () => {
      const button = findButton(multi, /Back to Glitcher/i);
      expect(button.exists()).toBe(true);
    });

    test('Glitch Library has Download All button', () => {
      const button = findButton(multi, /Download All/i);
      expect(button.exists()).toBe(true);
    });

    test('Glitch Library has Save All button', () => {
      const button = findButton(multi, /Save All/i);
      expect(button.exists()).toBe(true);
    });

    test('Glitch Library has Download Selected button', () => {
      const button = findButton(multi, /Download Selected/i);
      expect(button.exists()).toBe(false);
    });

    test('Glitch Library has Save Selected button', () => {
      const button = findButton(multi, /Save Selected/i);
      expect(button.exists()).toBe(false);
    });
  });
});
