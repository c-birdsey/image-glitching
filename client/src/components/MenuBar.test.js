import React from 'react';
import { mount } from 'enzyme';

import MenuBar from './MenuBar';
import { findButton, findButtonIcon } from '../setupTests';

describe('MenuBar tests', () => {
  describe('Glitcher interface', () => {
    let libGlitch;
    let status;
    let loggedIn;
    let IconButton;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      status = false;
      loggedIn = false;
      const profileCallback = jest.fn();
      const logInCallback = jest.fn();
      const logOutCallback = jest.fn();
      const homeCallback = jest.fn();
      IconButton = 'IconButton';
      libGlitch = mount(
        <MenuBar
          loggedIn={status}
          profile={profileCallback}
          home={homeCallback}
          logIn={logInCallback}
          logOut={logOutCallback}
        />
      );
    });

    test('Has GoogleLogin/Logout button', () => {
      if (loggedIn === false) {
        const button = findButton(libGlitch, /Login with Google/i);
        expect(button.exists()).toBe(true);
      } else if (loggedIn === true) {
        const button = findButton(libGlitch, /Logout/i);
        expect(button.exists()).toBe(true);
      }
    });

    test('Has Home Button', () => {
      const button = findButtonIcon(libGlitch, IconButton);
      expect(button.exists()).toBe(true);
    });

    // test('Home Button Works', () => {
    //   const button = findButtonIcon(libGlitch, IconButton);
    //   expect(button.onClick)
    // })
  });

  describe('PropTypes', () => {
    test('Has PropTypes defined', () => {
      expect(MenuBar).toHaveProperty('propTypes');
    });
  });
});
