/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const sampleImage = { src: './components/Glitch.png' };

export const sampleImages = [{ src: null }, { src: null }, { src: null }];

/*
    Used to find the variety of buttons seen in use so far.
*/
export const findButton = (comp, labelRegEx) => {
  // Find <input type="button" ... />
  let button = comp
    .find('input[type="button"]')
    .filterWhere(n => labelRegEx.test(n.prop('value')));
  if (button.length === 0) {
    // If that didn't work, look for "<button> ..."
    button = comp
      .find('button')
      .filterWhere(
        n => labelRegEx.test(n.text()) || labelRegEx.test(n.prop('value'))
      );
  }
  return button;
};
export const findButtonIcon = (comp, IconName) => {
  // Find <input type="button" ... />
  let button = comp.find(IconName);
  if (button.length === 0) {
    // If that didn't work, look for "<button> ..."
    button = comp
      .find('button')
      .filterWhere(
        n => IconName.test(n.text()) || IconName.test(n.prop('value'))
      );
  }
  return button;
};
