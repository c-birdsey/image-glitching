import React from 'react';
import { mount } from 'enzyme';
import Documentation from './Documentation';

describe('Documentation test', () => {
  describe('Documentation Page', () => {
    let doc;
    let status;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      status = false;
      doc = mount(<Documentation />);
    });

    test('Displays', () => {
      const text = doc.find('#documentation');
      expect(doc.exists()).toBe(true);
    });
  });
});
