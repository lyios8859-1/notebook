
// const domArr = [];
// let time = 100;
// let nowStop = 0;
// let finalNum = Math.floor(Math.random() * 10);
// let stopNum = 40 + finalNum;
// let timer = null;

// const _init = (i) => {
//   const dom = document.createElement('div');
//   dom.setAttribute('class', 'normal');
//    dom.innerHTML = i;
//   document.body.appendChild(dom);
//   domArr.push(dom);
// };
// for (let i = 0; i < 10; i++) {
//   _init(i);
// }
// function run () {
//   let nowStop = 0;
//   let finalNum = Math.floor(Math.random() * 10);
//   let stopNum = 40 + finalNum;
//   timer = setInterval(function () {
//     let domstop = nowStop % 10;
//     if (domstop === 0) {
//       domArr[9].setAttribute('class', 'normal');
//     } else {
//       domArr[domstop - 1].setAttribute('class', 'normal');
//     }

//     domArr[domstop].setAttribute('class', 'active');

//     if (nowStop > stopNum) {
//       clearInterval(timer);
//     }

//     nowStop++;
//   }, 100);
// }

// run();




// 观察者模式实现减慢
const domArr = [];
let timer = null;
let time = 100;
let nowStop = 0;
let finalNum = Math.floor(Math.random() * 10);
console.log(finalNum);
let stopNum = 40 + finalNum;

const Observer = {
  _message: {},
  regist: function (type, fn) {
    // 订阅消息
    if (!this._message[type]) {
      this._message[type] = [fn];
    } else {
      this._message[type].push(fn);
    }
  },

  fire: function (type) {
    // 触发
    let len = this._message[type].length;
    for (let i = 0; i < len; i++) {
      this._message[type][i].call(this);
    }
  },
  remove: function (type) {
    let i = this._message[type].length - 1;
    for (; i >= 0; i++) {
      this._message[type][i] === fn && this._message[type].splice(i, 1);
    }
  }
}


function init () {
  const _init = (i) => {
    const dom = document.createElement('div');
    dom.setAttribute('class', 'normal');
    dom.innerHTML = i;
    document.body.appendChild(dom);
    domArr.push(dom);
  };
  for (let i = 0; i < 10; i++) {
    _init(i);
  }
  // 慢慢停下来
  Observer.regist('runOver', function () {
    time += 100;
    runner('stop');
    runner('run');
  });
  runner('run');
}

init();


function runner (command) {
  const runmode = (domstop) => {
    if (domstop === 0) {
      domArr[9].setAttribute('class', 'normal');
    } else {
      domArr[domstop - 1].setAttribute('class', 'normal');
    }
    domArr[domstop].setAttribute('class', 'active');
  };
  const runcontroll = (command) => {
    if (command === 'run') {
      clearInterval(timer);
      timer = setInterval(() => {
        let domstop = nowStop % 10;
        if (domstop === 0 && nowStop !== 0) {
          Observer.fire('runOver');
        }
        runmode(domstop);
        if (nowStop > stopNum) {
          clearInterval(timer);
        }
        nowStop++;
      }, time);
    } else if (command === 'stop') {
      clearInterval(timer);
    }
  };

  runcontroll(command);
}