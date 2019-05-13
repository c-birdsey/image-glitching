import React from 'react';
import { mount } from 'enzyme';
import Profile from './Profile';

const testing = {
  id: 1,
  url:
    'http://res.cloudinary.com/drwjeyjxc/image/upload/v1557273995/images/swxori8eyzaatqwjirgc.png',
  original:
    'http://res.cloudinary.com/drwjeyjxc/image/upload/v1557729426/images/moinwhljt8j2wz7v8lyk.jpg',
  createdAt: '2019-05-08T00:06:35Z',
  createdBy: 1
};

describe('Profile tests', () => {
  describe('Profile interface', () => {
    let profile;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      profile = mount(<Profile />);
    });

    test('Annotation does not display on open', () => {
      const annotation = profile.find('#annotateComp');
      expect(annotation.exists()).toBe(false);
    });

    test('Annotation displays if glitch selected', () => {
      profile.setState({ currentGlitch: testing });
      const annotation = profile.find('#annotateComp');
      expect(annotation.exists()).toBe(true);
    });
  });
});
