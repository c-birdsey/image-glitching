import React from 'react';
import { mount } from 'enzyme';
import Annotation from './Annotation.js';
import { findButton } from '../setupTests';
import Editor from './Editor.js';

describe('PropTypes in Annotation', () => {
  test('Has PropTypes defined', () => {
    expect(Annotation).toHaveProperty('propTypes');
  });
});

describe('Annotation Test', () => {
  let Annot;
  const returnCallback = jest.fn();
  const testImage =
    'data:image/png;base64,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';

  beforeEach(async () => {
    Annot = mount(<Annotation Return={returnCallback} Picture={testImage} />);
  });

  describe('Test Buttons', () => {
    test('Has Delete Button', () => {
      const button = findButton(Annot, /Delete Glitch/i);
      expect(button.exists()).toBe(true);
    });

    test('Has Return Button', () => {
      const button = findButton(Annot, /Return to Library/i);
      expect(button.exists()).toBe(true);
    });

    test('Has add new Button', () => {
      const button = findButton(Annot, /Add New Comment/i);
      expect(button.exists()).toBe(true);
    });

    test('Has download Button', () => {
      const button = findButton(Annot, /Download Glitch with Comments/i);
      expect(button.exists()).toBe(true);
    });

    test('Clicking return Button invokes callback', () => {
      const button = findButton(Annot, /Return/i);
      button.simulate('click');
      expect(returnCallback).toHaveBeenCalledTimes(1);
    });

    // test('Clicking download Button calls the download function', () => {
    //     const spy = jest.spyOn(Annot.instance(),'handleDownload')
    //     const button = findButton(Annot, /Download Glitch with Comments/i);
    //     button.simulate('click');
    //     Annot.update();
    //     expect(spy).toHaveBeenCalled();
    // })

    // test('Clicking download Button calls the download function', () => {
    //     expect(Annot.state().editing).toBe(false);
    //     Annot.instance().handleNew();
    //     expect(Annot.state().editing).toBe(true);

    // })

    test('does not have Editor at startup', () => {
      expect(Annot).not.toContainExactlyOneMatchingElement(Editor);
    });

    test('does not have save button at startup', () => {
      const button = findButton(Annot, /Save/i);
      expect(button.exists()).toBe(false);
    });

    test('does not have cancel button at startup', () => {
      const button = findButton(Annot, /Cancel/i);
      expect(button.exists()).toBe(false);
    });

    describe('Test new comment', () => {
      beforeEach(async () => {
        const button = findButton(Annot, /Add New Comment/i);
        button.simulate('click');
      });

      test('Clicking on add button renders the editor', () => {
        expect(Annot).toContainMatchingElement(Editor);
      });

      test('has save button', () => {
        const button = findButton(Annot, /Save/i);
        expect(button.exists()).toBe(true);
      });

      test('has cancel button', () => {
        const button = findButton(Annot, /Cancel/i);
        expect(button.exists()).toBe(true);
      });

      test("Clicking 'Cancel' does not create a new comment", async () => {
        expect(Annot).toContainExactlyOneMatchingElement(Editor);
        const editor = Annot.find(Editor);

        let collection = Annot.state('annotations');

        expect(
          collection.find(comment => comment.content === '1234')
        ).toBeUndefined();

        editor
          .find('textarea')
          .simulate('change', { target: { value: '1234' } });
        const cancelButton = findButton(editor, /Cancel/i);
        cancelButton.simulate('click');

        collection = Annot.state('annotations');
        expect(
          collection.find(comment => comment.content === '1234')
        ).toBeUndefined();

        expect(Annot).not.toContainExactlyOneMatchingElement(Editor);
      });

      test("Clicking 'Save' does create a new comment", async () => {
        expect(Annot).toContainExactlyOneMatchingElement(Editor);
        const editor = Annot.find(Editor);

        let collection = Annot.state('annotations');

        expect(
          collection.find(comment => comment.content === '1234')
        ).toBeUndefined();

        editor
          .find('textarea')
          .simulate('change', { target: { value: '1234' } });
        const saveButton = findButton(editor, /Save/i);
        saveButton.simulate('click');

        collection = Annot.state('annotations');
        expect(
          collection.find(comment => comment.content === '1234')
        ).toBeDefined();

        expect(Annot).not.toContainExactlyOneMatchingElement(Editor);
      });

      test('Editor has <textarea> with placeholder', () => {
        expect(Annot).toContainExactlyOneMatchingElement(Editor);
        const editor = Annot.find(Editor);
        expect(editor).toContainExactlyOneMatchingElement('textarea');
        const extractInput = editor.find('textarea');
        expect(extractInput).toHaveProp('placeholder');
        expect(extractInput.prop('value')).toBeFalsy();
      });

      test('Save button is disabled if comment is empty', () => {
        expect(Annot).toContainExactlyOneMatchingElement(Editor);
        const editor = Annot.find(Editor);
        const extractInput = editor.find('textarea');
        expect(extractInput.prop('value')).toBeFalsy();
        const button = findButton(editor, /save/i);
        expect(button.prop('disabled')).toBeTruthy();
      });
    });
  });
});
