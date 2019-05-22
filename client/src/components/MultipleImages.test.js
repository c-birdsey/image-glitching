//const { toBase64 } = require('./MultipleImages')
import React from 'react';
import { mount } from 'enzyme';
import MultipleImages from './MultipleImages.js';
import { sampleImages, findButton, sampleSrc } from '../setupTests';
import { toBase64 } from './MultipleImages.js';

describe('PropTypes in Glitched Library', () => {
  test('Has PropTypes defined', () => {
    expect(MultipleImages).toHaveProperty('propTypes');
  });
});

describe('Images and Buttons display plus functionality', () => {
  let multi;
  const backCallback = jest.fn();

  describe('All Images are displayed', () => {
    beforeEach(async () => {
      multi = mount(
        <MultipleImages
          images={sampleImages}
          back={backCallback}
          loggedIn={false}
        />
      );
    });

    test('Glitched images are displayed', () => {
      let img = multi.find('.glitched-0');
      expect(img.exists()).toBe(true);

      img = multi.find('.glitched-1');
      expect(img.exists()).toBe(true);

      img = multi.find('.glitched-2');
      expect(img.exists()).toBe(true);
    });
  });

  describe('buttons display state when not loggedIn and checkbox functionality(switching of buttons)', () => {
    beforeEach(async () => {
      multi = mount(
        <MultipleImages
          images={sampleImages}
          back={backCallback}
          loggedIn={false}
        />
      );
    });

    describe('Back to Glitcher button', () => {
      test('Glitch Library has Back to Glitcher button', () => {
        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(true);
      });

      // since sampleImages has three items, then there will be three glitched images with class name glitched-1, -3, -5.

      test('Disappearance of Back to Glitcher when image is selected/ clicked', () => {
        const img = multi.find('.glitched-0');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Back to Glitcher when image is selected/clicked again', () => {
        const img = multi.find('.glitched-0');
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
        const img = multi.find('.glitched-0');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Download All button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-0');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(true);
      });

      test('Download All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-0');
        img.simulate('click');

        img = multi.find('.glitched-1');
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
        const img = multi.find('.glitched-0');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Save All button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-0');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(false);
      });

      test('Save All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-0');
        img.simulate('click');

        img = multi.find('.glitched-1');
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
        const img = multi.find('.glitched-0');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(true);
      });

      test('Appearance of Download Selected button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-0');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Download All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-0');
        img.simulate('click');

        img = multi.find('.glitched-1');
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
        const img = multi.find('.glitched-0');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Save Selected button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-0');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Save Selected button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-0');
        img.simulate('click');

        img = multi.find('.glitched-1');
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
        <MultipleImages images={sampleImages} back={backCallback} loggedIn />
      );
    });

    describe('Back to Glitcher button', () => {
      test('Glitch Library has Back to Glitcher button', () => {
        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(true);
      });

      // since sampleImages has three items, then there will be three glitched images with class name glitched-1, -3, -5.
      test('Disappearance of Back to Glitcher when image is selected/ clicked', () => {
        const img = multi.find('.glitched-0');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Back to Glitcher/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Back to Glitcher when image is selected/clicked again', () => {
        const img = multi.find('.glitched-0');
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
        const img = multi.find('.glitched-0');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(false);
      });

      test('Appearance of Download All button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-0');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Download All/i);
        expect(button.exists()).toBe(true);
      });

      test('Download All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-0');
        img.simulate('click');

        img = multi.find('.glitched-1');
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
        const img = multi.find('.glitched-0');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Save All/i);
        expect(button.exists()).toBe(true);
      });

      test('Save All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-0');
        img.simulate('click');

        img = multi.find('.glitched-1');
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
        const img = multi.find('.glitched-0');
        expect(img.exists()).toBe(true);
        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(true);
      });

      test('Appearance of Download Selected button when image is selected/clicked again', () => {
        const img = multi.find('.glitched-0');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Download Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Download All button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-0');
        img.simulate('click');

        img = multi.find('.glitched-1');
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
        const img = multi.find('.glitched-0');
        img.simulate('click');
        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(false);
      });

      test('Save Selected button remains undisplayed when some images are still selected', () => {
        let img = multi.find('.glitched-0');
        img.simulate('click');

        img = multi.find('.glitched-1');
        img.simulate('click');

        img.simulate('click');

        const button = findButton(multi, /Save Selected/i);
        expect(button.exists()).toBe(true);
      });
    });
  });

  describe('Back to Glitcher invokes callback', () => {
    beforeEach(async () => {
      backCallback.mockReset();
      multi = mount(
        <MultipleImages images={sampleImages} back={backCallback} loggedIn />
      );
    });

    test('callback', () => {
      const button = findButton(multi, /Back to Glitcher/i);
      button.simulate('click');
      expect(backCallback).toHaveBeenCalledTimes(1);
    });
  });
  describe('toBase64 tests', () => {
    test('toBase64 removes beginning tag of URL', () => {
      const tester = toBase64(sampleSrc);
      expect(tester).not.toEqual(sampleSrc);
    });

    test('toBase64 returns something', () => {
      const tester = toBase64(sampleSrc);
      expect(tester).not.toBeUndefined();
    });
  });
  // describe('handleSave tests', () => {
  //   beforeEach(async () => {
  //     multi = mount(
  //       <MultipleImages
  //         images={sampleImages}
  //         back={backCallback}
  //         loggedIn={false}
  //       />
  //     );
  //   });
  //   test('resets state', () =>{
  //     let saveSet = new Set([sampleImage]);
  //     multi.setState({'selected': saveSet});
  //     handleSave();
  //     let setReference = new Set();
  //     expect(multi.state('selected')).toBe(setReference);
  //   });
  // });
});
