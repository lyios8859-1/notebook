# 数学基础知识

> 将角度转换为弧度：`var radians = degrees * (Math.PI / 180);`
> 将弧度转换为角度：`var degrees = radians * (180 / Math.PI);`

## javascript 计算两条直线的夹角

```js
const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const dot = x1 * x2 + y1 * y2;
  const det = x1 * y2 - y1 * x2;
  const angle = Math.atan2(det, dot) / Math.PI * 180;
  return (angle + 360) % 360;
}

// (x0, y0) 表示两条直线相交的点坐标(一般作为坐标原点)
const angle = getAngle({
  x: x1 - x0,
  y: y1 - y0,
}, {
  x: x2 - x0,
  y: y2 - y0,
});
console.log(angle);

Math.atan(0.5) = 26.57°; // 计算出角度
```
