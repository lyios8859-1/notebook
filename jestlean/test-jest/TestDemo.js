const createElementDom = () => {
  const dom = document.createElement('h1');
  dom.setAttribute('class', 'JestDom');
  document.body.appendChild(dom);
};

export default createElementDom;