const MyReact = {
  createElemtnt
};

function createElemtnt (tag, attrs, ...childrens) {

  return {
    tag,
    attrs,
    childrens
  }
}

export default MyReact;