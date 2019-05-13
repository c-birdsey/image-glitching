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
  const deleteCallback = jest.fn();
  const testImage = {
    id: 1,
    url:
      'http://res.cloudinary.com/drwjeyjxc/image/upload/v1557273995/images/swxori8eyzaatqwjirgc.png',
    original:
      'http://res.cloudinary.com/drwjeyjxc/image/upload/v1557729426/images/moinwhljt8j2wz7v8lyk.jpg',
    createdAt: '2019-05-08T00:06:35Z',
    createdBy: 1
  };

  beforeEach(async () => {
    Annot = mount(
      <Annotation
        Return={returnCallback}
        Picture={testImage}
        deleteGlitch={deleteCallback}
      />
    );
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
          collection.find(comment => comment.body === '1234')
        ).toBeUndefined();

        editor
          .find('textarea')
          .simulate('change', { target: { value: '1234' } });
        const cancelButton = findButton(editor, /Cancel/i);
        cancelButton.simulate('click');

        collection = Annot.state('annotations');
        expect(
          collection.find(comment => comment.body === '1234')
        ).toBeUndefined();

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
