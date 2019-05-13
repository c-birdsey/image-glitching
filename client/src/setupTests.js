/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

export const sampleImage = { src: './components/Glitch.png' };
export const sampleSrc =
  'data:image/png;base64,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';
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

export const pseudoServer = {
  stats: {},

  goodToken: 'good',
  badToken: 'bad',

  login: function(options) {
    if (!options || !(options.method === 'POST')) {
      return this.error(400, 'Should only connect via POST');
    }

    if (!options.headers || !options.headers.Authorization) {
      return this.error(400, 'Request should include authorization');
    }

    if (options.headers.Authorization === `Bearer ${this.goodToken}`) {
      return {
        ok: true
      };
    } else {
      return this.error(403, 'Not authorized');
    }
  }
};

export const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};
