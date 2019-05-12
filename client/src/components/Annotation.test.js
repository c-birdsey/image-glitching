import React from 'react';
import { mount } from 'enzyme';
import Annotation from './Annotation.js';
import { findButton, sampleImage } from '../setupTests';

describe('PropTypes in Annotation', () => {
  test('Has PropTypes defined', () => {
    expect(Annotation).toHaveProperty('propTypes');
  });
});

describe('Annotation Test', () => {
  describe('Buttons are displayed', () => {
    let Annotation;
    const returnCallback = jest.fn();
    beforeEach(() => {});
  });
});
