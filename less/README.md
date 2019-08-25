# Less 学习笔记

> LESS 将 CSS 赋予了动态语言的特性，如 变量， 继承， 运算， 函数.

## 变量

```less
@nice-color: #353232;
@light-blue: @nice-color + #111;

header { color: @light-blue; }
```

## 混合

```less
// 公共样式
.borderStryle {
  border: 1px solid red;
}

// 调用公共样式
footer {
  color: #ccc;
  // 调用
  .borderStryle;
}
```

## 带参数混合

```less
// 带参数
.borderRadius (@radius) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}

// 调用
header {
  .borderRadius(4px);
}
footer {
  .borderRadius(6px);  
}

// 带参数，并设置默认值
.borderRadius (@radius: 10px) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}

// 调用
header {
  .borderRadius;
}
```

## @arguments 变量

```less
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
  box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  -webkit-box-shadow: @arguments;
}

// 调用
.box-shadow(2px, 5px);
```

## when 判断

```less
.loop(20);
.loop(@n, @i: 0) when (@i =< @n) {
  @size: @i*2;

  .pt-@{size} { padding-top: unit(@size, px) !important; }
  .pr-@{size} { padding-right: unit(@size, px) !important; }
  .pb-@{size} { padding-bottom: unit(@size, px) !important; }
  .pl-@{size} { padding-left: unit(@size, px) !important; }

  .mt-@{size} { margin-top: unit(@size, px) !important; }
  .mr-@{size} { margin-right: unit(@size, px) !important; }
  .mb-@{size} { margin-bottom: unit(@size, px) !important; }
  .ml-@{size} { margin-left: unit(@size, px) !important; }

  .fs-@{size} { font-size: unit(@size, px) !important; }

  .loop(@n, (@i + 1));
}

// e.g. pt-2 pt-16 pt-40 fs-16 fs-24等等
```
