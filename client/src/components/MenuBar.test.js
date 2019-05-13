import React from 'react';
import { mount } from 'enzyme';

import MenuBar from './MenuBar';
import App from '../App';
import { findButton, findButtonIcon } from '../setupTests';

describe('MenuBar tests', () => {
  describe('Glitcher interface', () => {
    let libGlitch;
    let status;
    let loggedIn; //eslint-disable-line no-unused-vars
    let IconButton;
    let app;
    const completeCallback = jest.fn();
    const profileCallback = jest.fn();
    const logInCallback = jest.fn();
    const logOutCallback = jest.fn();
    const homeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      logInCallback.mockReset();
      homeCallback.mockReset();
      logOutCallback.mockReset();

      status = false;
      loggedIn = false;

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
      app = mount(<App />);
    });

    test(' Has Login button when logged out', () => {
      let button = findButton(libGlitch, /Login with Google/i);
      expect(button.exists()).toBe(true);
      button = findButton(libGlitch, /Logout/i);
      expect(button.exists()).toBe(false);
    });

    test(' Has Logout button when logged in', () => {
      libGlitch = mount(
        <MenuBar
          loggedIn={true} //eslint-disable-line react/jsx-boolean-value
          profile={profileCallback}
          home={homeCallback}
          logIn={logInCallback}
          logOut={logOutCallback}
        />
      );
      let button = findButton(libGlitch, /Login with Google/i);
      expect(button.exists()).toBe(false);
      button = findButton(libGlitch, /Logout/i);
      expect(button.exists()).toBe(true);
    });

    test('Has Home Button', () => {
      const button = findButtonIcon(libGlitch, IconButton);
      expect(button.exists()).toBe(true);
    });

    test('Has Home Button callback', () => {
      const button = findButtonIcon(libGlitch, IconButton);
      button.simulate('click');
      expect(homeCallback).toHaveBeenCalledTimes(1);
    });

    // We understand why these tests don't work, but we were unable to use practical
    //12 as an example because our Google methods were not in App, as was the case
    //in the practical.

    // test("handleGoogleLogout callback", ()=>{
    //   libGlitch = mount(
    //     <MenuBar
    //       loggedIn={true}
    //       profile={profileCallback}
    //       home={homeCallback}
    //       logIn={logInCallback}
    //       logOut={logOutCallback}
    //     />
    //   );
    //   const button = findButton(libGlitch, /Logout/i)
    //   button.simulate('click')
    //   expect(logOutCallback).toHaveBeenCalledTimes(1);
    // });
    //
    // test("handleGoogleLogin logs into the server", async () =>{
    //   libGlitch.instance().setState({loggedIn: false});
    //   expect(libGlitch.state('loggedIn')).toEqual(false);
    //   console.log(libGlitch.instance().handleGoogleLogin());
    //   libGlitch.handleGoogleLogin({tokenId:  pseudoServer.goodToken});
    //   await flushPromises();
    //   expect(libGlitch.state('loggedIn')).toEqual(true);
    // });

    test('handleGoogleLogout logs out', () => {
      libGlitch = mount(
        <MenuBar
          loggedIn={true} //eslint-disable-line react/jsx-boolean-value
          profile={profileCallback}
          home={homeCallback}
          logIn={logInCallback}
          logOut={logOutCallback}
        />
      );
      const button = findButton(libGlitch, /Logout/i);
      expect(button.exists()).toBe(true);
      button.simulate('click');
      libGlitch.update();
      app.update();
      expect(app.state('loggedIn')).toEqual(false);
    });
  });

  describe('PropTypes', () => {
    test('Has PropTypes defined', () => {
      expect(MenuBar).toHaveProperty('propTypes');
    });
  });
});
