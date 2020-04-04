export class Header {
  constructor () {
    const headerDom = document.createElement('header'); // 自动类型推断
    headerDom.innerHTML = '我是头部';
    document.body.appendChild(headerDom);
  }
}

export class Main {
  constructor () {
    const mainDom = document.createElement('main'); // 自动类型推断
    mainDom.innerHTML = '我是内容';
    document.body.appendChild(mainDom);
  }
}

export class Footer {
  constructor () {
    const footerDom = document.createElement('footer'); // 自动类型推断
    footerDom.innerHTML = '我是底部';
    document.body.appendChild(footerDom);
  }
}