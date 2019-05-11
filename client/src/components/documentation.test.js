import React from 'react';
import { mount } from 'enzyme';
import Documentation from './Documentation';

describe('Documentation test', () => {
  describe('Documentation Page', () => {
    let doc;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      doc = mount(<Documentation />);
    });

    test('Displays', () => {
      const text = doc.find('#documentation');
      expect(text.exists()).toBe(true);
    });
  });
});
