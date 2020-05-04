import Component from './Component.js';
const MyReact = {
  createElemtnt,
  Component
};

function createElemtnt (tag, attrs, ...childrens) {

  return {
    tag,
    attrs,
    childrens
  }
}

export default MyReact;