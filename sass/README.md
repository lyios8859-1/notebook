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

## append()函数
>` append()` 函数是用来将某个值插入到列表中，并且处于最末位

```scss
append(10px 20px ,30px) === (10px 20px 30px)
append((10px,20px),30px) === (10px, 20px, 30px)
append(green,red) === (#008000 #ff0000)
append(red,(green,blue)) === (#ff0000 (#008000, #0000ff))
```

- 在 append() 函数中，可以显示的设置 $separator 参数，
  - 如果取值为 comma 将会以逗号分隔列表项
  - 如果取值为 space 将会以空格分隔列表项

```scss
append((blue green),red,comma) === (#0000ff, #008000, #ff0000)
append((blue green),red,space) === (#0000ff #008000 #ff0000)
append((blue, green),red,comma) === (#0000ff, #008000, #ff0000)
append((blue, green),red,space) === (#0000ff #008000 #ff0000)
append(blue,red,comma) === (#0000ff, #ff0000)
append(blue,red,space) === (#0000ff #ff0000)
```


## zip()函数
> zip()函数将多个列表值转成一个多维的列表

```scss
zip(1px 2px 3px,solid dashed dotted,green blue red) === ((1px "solid" #008000), (2px "dashed" #0000ff), (3px "dotted" #ff0000))
```

## index()函数

> `index()` 函数类似于索引一样，找到某个值在列表中所处的位置, 没有返回 `false`

```scss
index(1px solid red, 1px) === 1
index(1px solid red, solid) === 2
index(1px solid red, red) === 3
index(1px solid red,dotted) === false //列表中没有找到 dotted
```

## Introspection函数

- Introspection 函数包括了几个判断型函数：
  - type-of($value)：返回一个值的类型
  - unit($number)：返回一个值的单位
  - unitless($number)：判断一个值是否带有单位
  - comparable($number-1, $number-2)：判断两个值是否可以做加、减和合并


- type-of() 函数主要用来判断一个值是属于什么类型，返回值：
  - number 为数值型。
  - string 为字符串型。
  - bool 为布尔型。
  - color 为颜色型。

```scss
type-of(100) === "number"
type-of(100px) === "number"
type-of("asdf") === "string"
type-of(asdf) === "string"
type-of(true) === "bool"
type-of(false) === "bool"
type-of(#fff) === "color"
type-of(blue) === "color"
type-of(1 / 2 = 1) === "string"
```

### unit()函数
> `unit()` 函数主要是用来获取一个值所使用的单位，碰到复杂的计算时，其能根据运算得到一个“多单位组合”的值，不过只充许乘、除运算：

```scss
unit(100) === ""
unit(100px) === "px"
unit(20%) === "%"
unit(1em) === "em"
unit(10px * 3em) === "em*px"
unit(10px / 3em) === "px/em"
unit(10px * 2em / 3cm / 1rem) === "em/rem"
```

PS:但加、减碰到不同单位时，unit() 函数将会报错，除 px 与 cm、mm 运算之外

```scss
unit(1px + 1cm) === "px"
unit(1px - 1cm) === "px"
unit(1px + 1mm) === "px"

// 报错
unit(10px * 2em - 3cm / 1rem)  => SyntaxError: Incompatible units: 'cm' and 'px*em'.
unit(10px * 2em - 1px / 1rem)  => SyntaxError: Incompatible units: '' and 'em'.
unit(1px - 1em)  => SyntaxError: Incompatible units: 'em' and 'px'.
unit(1px - 1rem)  => SyntaxError: Incompatible units: 'rem' and 'px'.
unit(1px - 1%)  => SyntaxError: Incompatible units: '%' and 'px'.
unit(1cm + 1em) =>  SyntaxError: Incompatible units: 'em' and 'cm'.
```

### unitless()函数

> `unitless()` 函数判断一个值是否带有单位，如果不带单位返回的值为 `true`，带单位返回的值为 `false`

```scss
@mixin adjust-location($x, $y) {
  @if unitless($x) {    
    $x: 1px * $x;
  }
  @if unitless($y) {    
    $y: 1px * $y;
  }
  position: relative; 
  left: $x; 
  top: $y;
}

.botton{
    @include adjust-location(20px, 30);
}
```


### comparable()函数

> `comparable()` 函数判断两个数是否可以进行“加，减”以及“合并”。如果可以返回的值 `true`，如果不可以返回的值 `false`

```scss
comparable(2px,1px) === true
comparable(2px,1%) === false
comparable(2px,1em) === false
comparable(2rem,1em) === false
comparable(2px,1cm) === true
comparable(2px,1mm) === true
comparable(2px,1rem) === false
comparable(2cm,1mm) === true
```

## 三元条件函数: Miscellaneous

> `if($condition,$if-true,$if-false)`

当 `$condition` 条件成立时，返回的值为 `$if-true`，否则返回的是 `$if-false` 值。

```scss
if(true,1px,2px) === 1px
if(false,1px,2px) === 2px
```


## 使用 map 来管理变量

> 用个 `$` 加上命名空间来声明 `map`。后面紧接是一个小括号 ()，将数据以 `key:value` 的形式赋予，其中 `key` 和 `value` 是成对出现，**并且每对之间使用逗号 (,) 分隔，其中最后一组后面没有逗号**。

```scss
// 变量的定义
$default-color: #fff !default;
$primary-color: #22ae39 !default;

// Map 的定义
$color: (
  default: #fff,
  primary: #22ae39
);

// 嵌套的 Map
$theme-color: (
  default: (
    bgcolor: #fff,
    text-color: #444,
    link-color: #39f
  ),
  primary:(
    bgcolor: #000,
    text-color:#fff,
    link-color: #93f
  ),
  negative: (
    bgcolor: #f36,
    text-color: #fefefe,
    link-color: #d4e
  )
);
```

## 获取 Map 管理的变量属性值

- `map-get($map,$key)`：根据给定的 key 值，返回 map 中相关的值。
- `map-merge($map1,$map2)`：将两个 map 合并成一个新的 map。
- `map-remove($map,$key)`：从 map 中删除一个 key，返回一个新 map。
- `map-keys($map)`：返回 map 中所有的 key。
- `map-values($map)`：返回 map 中所有的 value。
- `map-has-key($map,$key)`：根据给定的 key 值判断 map 是否有对应的 value 值，如果有返回 true，否则返回 false。
- `keywords($args)`：返回一个函数的参数，这个参数可以动态的设置 key 和 value。

### map-get(\$map,$key) 函数

> 是根据 `$key `参数，返回 `$key` 在 `$map` 中对应的 value 值。如果 `$key` 不存在 `$map` 中，将返回 `null` 值。

```scss
// 定义 map 的数据结构管理变量
$social-colors: (
  dribble: #ea4c89,
  facebook: #3b5998,
  github: #171515,
  google: #db4437,
  twitter: #55acee
);

// 获取 map 的属性对应的值
.btn-dribble{
  color: map-get($social-colors,facebook);
}
```

### map-has-key(\$map,$key) 函数

> 返回一个布尔值。当 `$map` 中有这个 `$key`，则函数返回 `true`，否则返回 `false`。

```scss
$social-colors: (
  dribble: #ea4c89,
  facebook: #3b5998,
  github: #171515,
  google: #db4437,
  twitter: #55acee
);
@function colors($color){
  @if not map-has-key($social-colors,$color){
    @warn "No color found for `#{$color}` in $social-colors map. Property omitted.";
  }
  @return map-get($social-colors,$color);
}
.btn-dribble {
  color: colors(dribble);
}
.btn-facebook {
  color: colors(facebook);
}
.btn-github {
  color: colors(github);
}
.btn-google {
  color: colors(google);
}
.btn-twitter {
  color: colors(twitter);
}
.btn-weibo {
  color: colors(weibo);
}
```

优化：

```scss
@each $social-network,$social-color in $social-colors {
  .btn-#{$social-network} {
    color: colors($social-network);
  }
}
```


### map-keys($map) 函数

> 返回 $map 中的所有 key, 这些值赋予给一个变量，那他就是一个列表

```scss
$social-colors: (
  dribble: #ea4c89,
  facebook: #3b5998,
  github: #171515,
  google: #db4437,
  twitter: #55acee
);

$list: map-keys($social-colors);
// 等价于
$list: "dribble","facebook","github","google","twitter";

// 重新实现上一个实例（进一步优化）
@function colors($color){
  $names: map-keys($social-colors);
  @if not index($names,$color){
    @warn "Waring: `#{$color} is not a valid color name.`";
  }
  @return map-get($social-colors,$color);
}

// @each
@each $name in map-keys($social-colors){
  .btn-#{$name}{
    color: colors($name);
  }
}

// @for
@for $i from 1 through length(map-keys($social-colors)){
  .btn-#{nth(map-keys($social-colors),$i)} {
    color: colors(nth(map-keys($social-colors),$i));
  }
}
```

### map-values(\$map )

> 获取的是 `$map` 的所有 `value` 值

```scss
map-values($social-colors) === #ea4c89,#3b5998,#171515,#db4437,#55acee
```

### map-merge(\$map1,$map2)

> 将 `$map1` 和 `$map2` 合并，然后得到一个新的 `$map`

```scss
// scss
$color: (
  text: #f36,
  link: #f63,
  border: #ddd,
  backround: #fff
);
$typo:(
  font-size: 12px,
  line-height: 1.6,
  border: #ccc,
  background: #000
);

$newmap: map-merge($color,$typo);

// 新的$newmap
$newmap:(
  text: #f36,
  link: #f63,
  font-size: 12px,
  line-height: 1.6,
  border: #ccc,
  background: #000
);

// 用map-merge将两个maps合为一起传入一个tag中
$newMap:map-merge($color, $typo);
body{  
  @each $Prop,$val in $newMap{    
    #{$Prop}: #{$val};  
  }
}
```

PS：注意，如果 `$map1` 和 `$map2` 中有相同的 `$key` 名，那么将 `$map2` 中的 `$key` 会取代 `$map1` 中的

### map-remove(\$map,$key) 函数

> 用来删除当前 `$map` 中的某一个 `$key`，从而得到一个新的 map。其返回的值还是一个 map。
> 不能直接从一个 map 中删除另一个 map，仅能通过删除 map 中的某个 key 得到新 map。

```scss
$map:map-remove($social-colors,dribble);

// 返回的是一个新 map
$map:(
  facebook: #3b5998,
  github: #171515,
  google: #db4437,
  twitter: #55acee
);
```

PS: 如果删除的 key 并不存在于 `$map` 中，那么 `map-remove()` 函数返回的新 map 和以前的 map 一样

### keywords(\$args) 函数

> 类似动态创建 map 的函数。可以通过混合宏或函数的参数变创建 map。
> 参数也是成对出现，其中 `$args` 变成 key(会自动去掉$符号)，而 `$args` 对应的值就是 value

```scss
@mixin map($args...){
  @debug keywords($args);
}
@include map(
  $dribble: #ea4c89,
  $facebook: #3b5998,
  $github: #171515,
  $google: #db4437,
  $twitter: #55acee
);
// 命令终端可以看到一个输入的 @debug 信息：
 DEBUG: (dribble: #ea4c89, facebook: #3b5998, github: #171515, google: #db4437, twitter: #55acee)
```

## @import 

- `@import` 引入多个文件。例如：`@import "rounded-corners", "text-shadow";`

- 嵌套 `@import`

```scss
.example {
  color: red;
}

// 引用
#main {
  @import "example";
}

// 编译后的 css
#main .example {
  color: red;
}
```

## @extend 


## @at-root

> 多层嵌套中跳出来

```scss
// SCSS
.a {
  color: red;

  .b {
    color: orange;

    .c {
      color: yellow;

      @at-root .ddd {
        color: green;
      }
    }
  }  
}
// 编译后的css
a {
  color: red;
}

.a .b {
  color: orange;
}

.a .b .c {
  color: yellow;
}

.ddd {
  color: green;
}
```

## @warn 和 @debug 和 @error

- @warn 和 @debug 功能类似，调试 Sass。如：

```scss
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @warn "Assuming #{$x} to be in pixels";
    $x: 1px * $x;
  }
  @if unitless($y) {
    @warn "Assuming #{$y} to be in pixels";
    $y: 1px * $y;
  }
  position: relative; left: $x; top: $y;
}


.botton{
  @include adjust-location(20px, 30);
}


@mixin error($x){
  @if $x < 10 {
    width: $x * 10px;
  } @else if $x == 10 {
    width: $x;
  } @else {
    @error "你需要将#{$x}值设置在10以内的数";
  }
}

.test {
  @include error(15);
}
```

[参考](https://www.imooc.com/learn/436)