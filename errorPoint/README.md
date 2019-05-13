# 易错点

## Nubmer.parseInt(可以转换的数字值, 基数)

```javascript
Number.parseInt("1", 2); // 1
Number.parseInt("1", 36); // 1

Number.parseInt("1", 1); // NaN
Number.parseInt("1", 37); // NaN
Number.parseInt("1", -1); // NaN
```

PS: 因此，parseInt 的第二个参数只能是 [2, 36] 的闭区间，才会对可以转换的数字值，进行进制转换。

```javascript
let arr = [1, 2, 3, 4];
let arrA = arr.map(Number.parseInt); // [1, NaN, NaN, NaN]
```

## 闭包

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(
    i => {
      console.log(i);
    },
    1000,
    i
  );
}

for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

结果：

![闭包](./闭包1.png "setTimeout 的第三个参数 i ")

```javascript
var a = 10;
(function a() {
  a = 20;
  console.log(a);
})();

var a = 10;
function b() {
  return function a() {
    a = 20;
    console.log(a);
  };
}
b()();
```

![闭包](./闭包2.png " var 变量的提升 ")
![闭包](./闭包3.png " var 变量的提升 ")

```javascript
var a = 10;
function a() {
  return function a() {
    a = 20;
    console.log(a);
  };
}
```

结果：

![闭包](./闭包4.png " var 变量的提升 ")
