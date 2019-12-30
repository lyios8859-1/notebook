# sass 基础

## @if {} @else if{}@else{}

> 除了 `@if` 之，还可以配合 `@else if` 和 `@else` 一起使用

```scss
// SCSS 写法
@mixin blockOrHidden($boolean:true) {
  @if $boolean {
    @debug "$boolean is #{$boolean}";
      display: block;
    }
    @else {
      @debug "$boolean is #{$boolean}";
      display: none;
    }
}
.block {
  @include blockOrHidden;
}
.hidden{
  @include blockOrHidden(false);
}

// 编译后的css
.block {
  display: block;
}
.hidden {
  display: none;
}
```

## @for循环
> `@for $i from <start> through <end>`
> `@for $i from <start> to <end>`

- $i 表示变量
- start 表示起始值
- end 表示结束值

PS: 区别: 关键字 through 表示包括 end 这个数，而 to 则不包括 end 这个数。

```scss
// through 关键字
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
// 编译后的CSS
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}

// to 关键字
@for $i from 1 to 3 {
  .item-#{$i} { width: 2em * $i; }
}

// 编译后的css
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
```

PS：`#{$i}` 是一个字符串，是变量i的值; 而 `$i` 是一个变量

- 实例： @for应用在网格系统生成各个格子 class

```scss
// SCSS 
$grid-prefix: span !default;
$grid-width: 60px !default;
$grid-gutter: 20px !default;

%grid {
  float: left;
  margin-left: $grid-gutter / 2;
  margin-right: $grid-gutter / 2;
}

// through 写法
@for $i from 1 through 12 {
  .#{$grid-prefix}#{$i}{
    width: $grid-width * $i + $grid-gutter * ($i - 1);
    @extend %grid;
  }  
}

// to 写法
@for $i from 1 to 13 {
  .#{$grid-prefix}#{$i}{
    width: $grid-width * $i + $grid-gutter * ($i - 1);
    @extend %grid;
  }  
}

// 编译后的css
.span1, .span2, .span3, .span4, .span5, .span6, .span7, .span8, .span9, .span10, .span11, .span12 {
  float: left;
  margin-left: 10px;
  margin-right: 10px;
}
.span1 {
  width: 60px;
}
.span2 {
  width: 140px;
}
.span3 {
  width: 220px;
}
.span4 {
  width: 300px;
}
.span5 {
  width: 380px;
}
.span6 {
  width: 460px;
}
.span7 {
  width: 540px;
}
.span8 {
  width: 620px;
}
.span9 {
  width: 700px;
}
.span10 {
  width: 780px;
}
.span11 {
  width: 860px;
}
.span12 {
  width: 940px;
}
```

PS：`through` 与 `to` 的区别：只是 `@for` 中的 `<end>` 取值不同。
- 配合 `through` 的 `<end>` 值是 12，其遍历出来的终点值也是 12，和 `<end>` 值一样。
- 配合 `to` 的 `<end>` 值是 13，其遍历出来的终点值是 12，就是` <end>` 对就的值减去 1。

## @while循环

```scss
// SCSS
$types: 4;
$type-width: 20px;

@while $types > 0 {
    .while-#{$types} {
        width: $type-width + $types;
    }
    $types: $types - 1;
}

// 编译后的css
.while-4 {
  width: 24px;
}
.while-3 {
  width: 23px;
}
.while-2 {
  width: 22px;
}
.while-1 {
  width: 21px;
}
```

PS: `$types:$types -1;` 这里 -1 之间需要有空格。不留空格的话，会把 `$types-1` 当做一个变量表达式，当前上下文没有这个变量，会报错。

## @each循环
> @each 循环就是去遍历一个列表，然后从列表中取出对应的值。
> `@each $var in <list>`

```scss
// SCSS
//定义一个列表数据
$list: tom jerry cat dog;

@mixin animal-images {
    @each $animal in $list {
        .photo-#{$animal} {
            background: url("/images/#{$animal}.png") no-repeat;
        }
    }
}
.animal-bio {
    @include animal-images;
}

// 编译后的css
.animal-bio .photo-tom {
  background: url("/images/tom.png") no-repeat;
}
.animal-bio .photo-jerry {
  background: url("/images/jerry.png") no-repeat;
}
.animal-bio .photo-cat {
  background: url("/images/cat.png") no-repeat;
}
.animal-bio .photo-dog {
  background: url("/images/dog.png") no-repeat;
}
```

## 字符串函数-unquote()函数

> unquote() 函数主要是用来删除一个字符串中的引号，如果这个字符串没有带有引号，将返回原始的字符串。

```scss
// SCSS
.test1 {
    content:  unquote('Hello Sass!') ;
}
.test2 {
    content: unquote("'Hello Sass!");
}
.test3 {
    content: unquote("I'm Web Designer");
}
.test4 {
    content: unquote("'Hello Sass!'");
}
.test5 {
    content: unquote('"Hello Sass!"');
}
.test6 {
    content: unquote(Hello Sass);
}

// 编译后的 css
.test1 {
  content: Hello Sass!; }
.test2 {
  content: 'Hello Sass!; }
.test3 {
  content: I'm Web Designer; }
.test4 {
  content: 'Hello Sass!'; }
.test5 {
  content: "Hello Sass!"; }
.test6 {
  content: Hello Sass; }
```

PS: `unquote()` 函数只能删除字符串**最前和最后的引号**（双引号或单引号），而无法删除字符串中间的引号。如果字符没有带引号，返回的将是字符串本身。

## 字符串函数-To-upper-case()、To-lower-case()

- `To-upper-case()` 函数将字符串小写字母转换成大写字母

```scss
// SCSS
.test {
  text: to-upper-case(aaaaa);
  text: to-upper-case(aA-aAAA-aaa);
}

// 编译后的css
.test {
  text: AAAAA;
  text: AA-AAAA-AAA;
}
```

- `To-lower-case()` 函数将字符串转换成小写字母

```scss
// SCSS
.test {
  text: to-lower-case(AAAAA);
  text: to-lower-case(aA-aAAA-aaa);
}

// 编译后的css
.test {
  text: aaaaa;
  text: aa-aaaa-aaa;
}
```

## 数字函数-percentage()

> percentage()函数主要是将一个不带单位的数字转换成百分比形式

```scss
// SCSS
.header {
    width : percentage(.2)
}

//编译后的 css
.header{
    width : 20%
}

// percentage(2px / 10px) => 20%
// percentage(2em / 10em) => 20%
// percentage(.2) => 20%
```

PS: `percentage(2px / 10em)` 编译报错： `SyntaxError: $value: 0.2px/em is not a unitless number for ‘percentage'`

## 数字函数-round()函数

> 将一个数四舍五入为一个最接近的整数

## 数字函数-ceil()函数

> ceil() 函数将一个数转换成最接近于自己的整数，会将一个大于自身的任何小数转换成大于本身 1 的整数。也就是只做入的计算，不做舍的计算。

## 数字函数-floor()函数

> floor() 函数刚好与 ceil() 函数功能相反，其主要将一个数去除其小数部分，并且不做任何的进位。也就是只做舍的计算，不做入的计算。

## 数字函数-abs()函数

> abs() 函数会返回一个数的绝对值。

## 数字函数-min()函数、max()函数

> 取最值

```scss
min(1,2,1%,3,300%) === 1%

min(1px,2,3px) === 1px

max(1em,2em,6em) === 6em
```

## 数字函数-random()函数

> random() 函数是用来获取一个随机数

## length()函数

> length() 函数主要用来返回一个列表中有几个值

```scss
length(10px) === 1

length(10px 20px (border 1px solid) 2em) === 4

length(border 1px solid) === 3
```

## nth()函数

> `nth($list,$n)`, 指定列表中某个位置的值, `$n` 必须大于0

```scss
nth(10px 20px 30px, 1) === 10px

nth((Helvetica,Arial,sans-serif),2) === "Arial"
```

[参考](https://www.imooc.com/learn/436)