const [_x, _y] = [Symbol.for("_x"), Symbol.for("_y")];

class Test {
  constructor(x = 2, y = 4) {
    this[_x] = x;
    this[_y] = y;
  }
  // 这种访问方式 对象.length 即可
  get length() {
    const [x, y] = [this[_x], this[_y]];
    return Math.sqrt(x * x + y * y);
  }
}

const test = new Test();
let result = test.length;
console.log(result);

console.log(test[_x], test[_y]); // 这种还是可以访问的哦
console.log(test._x, test._y); // 这种是不可以访问的哦 undefined
