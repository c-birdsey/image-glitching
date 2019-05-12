import React from 'react';
import { mount } from 'enzyme';
import Editor from './Editor';
import { findButton } from '../setupTests';

describe('Editor test', () => {
  describe('Editor Page', () => {
    let edit;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      edit = mount(<Editor complete={completeCallback} />);
    });

    test('Displays', () => {
      const text = edit.find('#editorComp');
      expect(text.exists()).toBe(true);
    });

    test('Changing text changes the state', () => {
      const text = edit.find('#comment');
      expect(text.exists()).toBe(true);
      text
        .last()
        .simulate('change', { target: { name: 'textInput', value: 'test' } });
      expect(edit.state().content).toBe('test');
    });

    test("Save doesn't crash", () => {
      const text = edit.find('#comment');
      expect(text.exists()).toBe(true);
      text
        .last()
        .simulate('change', { target: { name: 'textInput', value: 'test' } });
      expect(edit.state().content).toBe('test');
      const button = findButton(edit, /Save/i);
      button.simulate('click');
    });

    test("Cancel doesn't crash", () => {
      const text = edit.find('#comment');
      expect(text.exists()).toBe(true);
      text
        .last()
        .simulate('change', { target: { name: 'textInput', value: 'test' } });
      expect(edit.state().content).toBe('test');
      const button = findButton(edit, /Cancel/i);
      button.simulate('click');
    });
  });
});
