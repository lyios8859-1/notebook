import Util from './Util.js';

const referenceUtilClass = (a, b) => {
  const util = new Util();
  util.add(a, b);
  util.minus(a, b);
};

export default referenceUtilClass;