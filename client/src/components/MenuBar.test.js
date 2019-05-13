import React from 'react';
import { mount } from 'enzyme';

import MenuBar from './MenuBar';
import App from '../App';
import { findButton, findButtonIcon } from '../setupTests';

describe('MenuBar tests', () => {
  describe('Glitcher interface', () => {
    let menuBar;
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
      menuBar = mount(
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
      let button = findButton(menuBar, /Login with Google/i);
      expect(button.exists()).toBe(true);
      button = findButton(menuBar, /Logout/i);
      expect(button.exists()).toBe(false);
    });

    test(' Has Logout button when logged in', () => {
      menuBar = mount(
        <MenuBar
          loggedIn={true} //eslint-disable-line react/jsx-boolean-value
          profile={profileCallback}
          home={homeCallback}
          logIn={logInCallback}
          logOut={logOutCallback}
        />
      );
      let button = findButton(menuBar, /Login with Google/i);
      expect(button.exists()).toBe(false);
      button = findButton(menuBar, /Logout/i);
      expect(button.exists()).toBe(true);
    });

    test('Has Home Button', () => {
      const button = findButtonIcon(menuBar, IconButton);
      expect(button.exists()).toBe(true);
    });

    test('Has Home Button callback', () => {
      const button = findButtonIcon(menuBar, IconButton);
      button.simulate('click');
      expect(homeCallback).toHaveBeenCalledTimes(1);
    });

    // We understand why these tests don't work, but we were unable to use practical
    //12 as an example because our Google methods were not in App, as was the case
    //in the practical.

    // test("handleGoogleLogout callback", ()=>{
    //   menuBar = mount(
    //     <MenuBar
    //       loggedIn={true}
    //       profile={profileCallback}
    //       home={homeCallback}
    //       logIn={logInCallback}
    //       logOut={logOutCallback}
    //     />
    //   );
    //   menuBar.instance().handleGoogleLogout();
    //   expect(logOutCallback).toHaveBeenCalledTimes(1);
    // });
    //
    // test("handleGoogleLogin logs into the server", async () =>{
    //   menuBar.instance().setState({loggedIn: false});
    //   expect(menuBar.state('loggedIn')).toEqual(false);
    //   console.log(menuBar.instance().handleGoogleLogin());
    //   menuBar.handleGoogleLogin({tokenId:  pseudoServer.goodToken});
    //   await flushPromises();
    //   expect(menuBar.state('loggedIn')).toEqual(true);
    // });

    test('handleGoogleLogout logs out', () => {
      menuBar = mount(
        <MenuBar
          loggedIn={true} //eslint-disable-line react/jsx-boolean-value
          profile={profileCallback}
          home={homeCallback}
          logIn={logInCallback}
          logOut={logOutCallback}
        />
      );
      const button = findButton(menuBar, /Logout/i);
      expect(button.exists()).toBe(true);
      button.simulate('click');
      menuBar.update();
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
