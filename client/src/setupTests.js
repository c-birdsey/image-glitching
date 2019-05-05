/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const sampleImage = [{ src: null }];

export const sampleImages = [
  { src: null },
  { src: null },
  { src: null },
  { src: null },
  { src: null }
];
