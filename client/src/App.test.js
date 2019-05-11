import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { findButton } from './setupTests';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App tests', () => {
  describe('App interface', () => {
    let app;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      app = mount(<App />);
    });

    test('Opens to front page', () => {
      const singleButton = findButton(app, /Glitch Single Image/i);
      expect(singleButton.exists()).toBe(true);
      const libraryButton = findButton(app, /Glitch Library of Images/i);
      expect(libraryButton.exists()).toBe(true);
      const docButton = findButton(app, /Documentation/i);
      expect(docButton.exists()).toBe(true);
    });

    test('Menu bar render', () => {
      const menubar = app.find('#menuBar');
      expect(menubar.exists()).toBe(true);
    });

    test('Properly handles change to profile', () => {
      app.setState({ loggedIn: true, mode: 'profile' });
      const landingpage = findButton(app, /Glitch Single Image/i);
      expect(landingpage.exists()).toBe(false);
      const profile = app.find('#profileComp');
      expect(profile.exists()).toBe(true);
    });

    test('Properly handles change to library upload', () => {
      app.setState({ loggedIn: true, mode: 'uploadMultiple' });
      const landingpage = findButton(app, /Glitch Single Image/i);
      expect(landingpage.exists()).toBe(false);
      const library = app.find('#libraryComp');
      expect(library.exists()).toBe(true);
    });

    test('Properly handles change to view multiple glitches', () => {
      app.setState({ loggedIn: true, mode: 'displayLibrary' });
      const landingpage = findButton(app, /Glitch Single Image/i);
      expect(landingpage.exists()).toBe(false);
      const library = app.find('#multiglitchComp');
      expect(library.exists()).toBe(true);
    });

    test('Properly handles change to view documentation', () => {
      app.setState({ loggedIn: true, mode: 'documentation' });
      const landingpage = findButton(app, /Glitch Single Image/i);
      expect(landingpage.exists()).toBe(false);
      const doc = app.find('#documentationComp');
      expect(doc.exists()).toBe(true);
    });

    test('Buttons work', () => {
      const landingpage = findButton(app, /Glitch Single Image/i);
      expect(landingpage.exists()).toBe(true);
      landingpage.simulate('click');
      expect(app.state().mode).toBe('uploadSingle');
    });
    //
    // test('Has Options Menu', () => {
    //   const form = singleGlitch.find('#inputForm');
    //   expect(form.exists()).toBe(true);
    //   const amount = singleGlitch.find('#glitchAmount');
    //   expect(amount.exists()).toBe(true);
    //   const quality = singleGlitch.find('#glitchQuality');
    //   expect(quality.exists()).toBe(true);
    //   const distortion = singleGlitch.find('#glitchDistortion');
    //   expect(distortion.exists()).toBe(true);
    //   const control = singleGlitch.find('#not_a_real_ID');
    //   expect(control.exists()).toBe(false);
    // });
    //
    // test('Can Change to Controlled Glitch', () => {
    //   const radio = singleGlitch.find('#controlled').first();
    //   expect(radio.exists()).toBe(true);
    //   radio.simulate('change');
    //   expect(singleGlitch.state().glitchControlled).toEqual('');
    // });
    //
    // test('No Download Button Originally', () => {
    //   const button = findButton(singleGlitch, /Download Selected/i);
    //   expect(button.exists()).toBe(false);
    // });
    //
    // test('Displays pinned glitches properly', () => {
    //   singleGlitch.setState({ currentImage: sampleImage });
    //   const button = findButton(singleGlitch, /Randomize/i);
    //   button.simulate('click');
    //   expect(singleGlitch.state().savedGlitches).toEqual([]);
    //   const pin = findButton(singleGlitch, /Pin Glitch/i);
    //   pin.simulate('click');
    //   expect(singleGlitch.state().savedGlitches).toEqual([sampleImage]);
    //   const img = singleGlitch.find('#savedGlitch');
    //   expect(img.exists()).toBe(true);
    // });
    //
    // test('Download Button Appears When Image Selected', () => {
    //   singleGlitch.setState({ currentImage: testimg });
    //   const button = findButton(singleGlitch, /Randomize/i);
    //   button.simulate('click');
    //   expect(singleGlitch.state().savedGlitches).toEqual([]);
    //   const pin = findButton(singleGlitch, /Pin Glitch/i);
    //   pin.simulate('click');
    //   expect(singleGlitch.state().savedGlitches).toEqual([testimg]);
    //   const img = singleGlitch.find('#savedGlitch');
    //   expect(img.exists()).toBe(true);
    //   img.simulate('click');
    //   const dwbutton = findButton(singleGlitch, /Download Selected/i);
    //   expect(dwbutton.exists()).toBe(true);
    //   dwbutton.simulate('click');
    // });
    //
    // // test('Glitch Changes Image', async () => {
    // //   const imagebefore = testimg;
    // //   singleGlitch.setState({ currentImage: testimg });
    // //   const button = findButton(singleGlitch, /Randomize/i);
    // //   button.simulate('click').then();
    // //   const pin = findButton(singleGlitch, /Pin Glitch/i);
    // //   pin.simulate('click');
    // //   expect(singleGlitch.state().savedGlitches[0]).not.toEqual(imagebefore);
    // // });
    //
    // test('Can Pin Glitches', () => {
    //   singleGlitch.setState({ currentImage: sampleImage });
    //   const button = findButton(singleGlitch, /Randomize/i);
    //   button.simulate('click');
    //   expect(singleGlitch.state().savedGlitches).toEqual([]);
    //   const pin = findButton(singleGlitch, /Pin Glitch/i);
    //   pin.simulate('click');
    //   expect(singleGlitch.state().savedGlitches).toEqual([sampleImage]);
    // });
  });

  // describe('PropTypes', () => {
  //   test('Has PropTypes defined', () => {
  //     expect(SingleGlitch).toHaveProperty('propTypes');
  //   });
  // });
});
