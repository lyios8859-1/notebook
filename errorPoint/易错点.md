# Nubmer.parseInt(可以转换的数字值, 基数)

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
