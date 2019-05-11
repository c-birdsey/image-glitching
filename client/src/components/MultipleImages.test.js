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

  describe('buttons display state when not loggedIn and checkbox functionality(switching of buttons)', () => {
    beforeEach(async () => {
      multi = mount(
        <MultipleImages images={sampleImages} back={jest.fn} loggedIn={false} />
      );
    });

    describe('Back to Glitcher button', () => {
      test('Glitch Library has Back to Glitcher button', () => {
        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(true);
      });

      // since sampleImages has three items, then there will be three glitched images with class name glitched-1, -3, -5.
      test('Disappearance of Back to Glitcher when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Back to Glitcher when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(true);
      });
    });

    describe('Download All button', () => {
      test('Glitch Library has Download All button', () => {
        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(true);
      });

      test('Disappearance of Download All button when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Download All button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(true);
      });

      test('Download All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-1');
        img.simulate('click');

        img = multi.find('.glitched-3');
        img.simulate('click');

        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(false);
      });
    });

    describe('Save All button', () => {
      test('Glitch Library has Save All button', () => {
        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(false);
      });

      test('Disappearance of Save All button when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Save All button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(false);
      });

      test('Save All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-1');
        img.simulate('click');

        img = multi.find('.glitched-3');
        img.simulate('click');

        img.simulate('click');

        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(false);
      });
    });

    describe('Download Selected button', () => {
      test('Glitch Library has Download Selected button', () => {
        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Disappearance of Download Selected button when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(true);
      });

      test('Appearance of Download Selected button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Download All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-1');
        img.simulate('click');

        img = multi.find('.glitched-3');
        img.simulate('click');

        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(true);
      });
    });

    describe('Save Selected button', () => {
      test('Glitch Library has Save Selected button', () => {
        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Disappearance of Save Selected button when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Save Selected button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Save Selected button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-1');
        img.simulate('click');

        img = multi.find('.glitched-3');
        img.simulate('click');

        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(false);
      });
    });
  });

  describe('buttons display state when loggedIn and checkbox functionality(switching of buttons)', () => {
    beforeEach(async () => {
      multi = mount(
        <MultipleImages images={sampleImages} back={jest.fn} loggedIn />
      );
    });

    describe('Back to Glitcher button', () => {
      test('Glitch Library has Back to Glitcher button', () => {
        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(true);
      });

      // since sampleImages has three items, then there will be three glitched images with class name glitched-1, -3, -5.
      test('Disappearance of Back to Glitcher when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Back to Glitcher when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(true);
      });
    });

    describe('Download All button', () => {
      test('Glitch Library has Download All button', () => {
        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(true);
      });

      test('Disappearance of Download All button when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Download All button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(true);
      });

      test('Download All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-1');
        img.simulate('click');

        img = multi.find('.glitched-3');
        img.simulate('click');

        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(false);
      });
    });

    describe('Save All button', () => {
      test('Glitch Library has Save All button', () => {
        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(true);
      });

      test('Disappearance of Save All button when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Save All button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(true);
      });

      test('Save All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-1');
        img.simulate('click');

        img = multi.find('.glitched-3');
        img.simulate('click');

        img.simulate('click');

        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(false);
      });
    });

    describe('Download Selected button', () => {
      test('Glitch Library has Download Selected button', () => {
        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Disappearance of Download Selected button when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(true);
      });

      test('Appearance of Download Selected button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Download All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-1');
        img.simulate('click');

        img = multi.find('.glitched-3');
        img.simulate('click');

        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(true);
      });
    });

    describe('Save Selected button', () => {
      test('Glitch Library has Save Selected button', () => {
        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Save Selected button when image is selected/ clicked', () => {
        const img = multi.find('.glitched-1');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(true);
      });

      test('Disappearance of Save Selected button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-1');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Save Selected button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-1');
        img.simulate('click');

        img = multi.find('.glitched-3');
        img.simulate('click');

        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(true);
      });
    });
  });
});
