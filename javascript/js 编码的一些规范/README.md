# 常用的规范
1、分号结尾

```javascript
function test() {
  return
  {}
  // 该函数返回undefined
}
function test() {
  return {}
  // 该函数返回的是对象
}
// good
function test() {
  return {};
}
```

2、换行
运算符后换行，下一行两个层级缩进

```javascript
test(a, b, c, d,
  e, f, d);
```

3、变量赋值后的换行后，和赋值运算符对齐

```javascript
let a = a1 + a2 + a3 + a4 +
    a5 + a5 + a7;
```

4、空行
方法之间
方法的局部变量和第一条语句之间
多行或者单行注释之前
方法的逻辑片段

5、变量和函数
变量(Camel Case)驼峰命名，且前缀是名词，这样为了和函数区分
函数驼峰命名，且前缀是动词，这样为了和变量区分

```javascript
// good
let count = 10;
let myName = "Timy";
function isEmpty(){}
function getName(){}
function setConfig(){}
function hasValue(){}
```


5、常量（不可变）
大写字母和下划线命名

```javascript
const MAX_RANGE = 34;
const URL = "http://www.baidu.com/";
```

6、构造函数

Pascal Case(帕斯卡命名)

```javascript
// good
function Animale(){}
class People{}
```

7、引号
双引号包裹单引号

```javascript
let str ="I am Timy, '^-^',...";
```

8、小数

```javascript
let price = 3.00;
let money = 43.0;
```

9、null
对于对象初始化

```javascript
let obj = null;
obj = new Man();

// 函数返回对象是不存在，返回 null
function test() {
  if(...){}
  return null;
}
```

10、数组，对象的直接俩定义

```javascript
// bad
let arr = new Array();
let obj = new Object();
// goog
let arr = [];
let obj = {};
```

11、大括号
函数名和左边的小括号没有空格，右边的小括号和右边的大括号有空格

```javascript
// bad
function test()
{
  // ...
}
// good
function test() {
  // ...
}
```

12、立即函数

```javascript
// good
let value = (function(){
  return "good";
})();
// better
let value = (function(){
  return "better";
}());
```

13、for 循环

```javascript
// bad
for (let i = 0; i <  arr.lenght; i++) {}
// good
let arr = [1, 3, 5, 4];
for (let i = 0, len = arr.lenght; i < len; i++) {}
```

14、for...in
建议用来循环对象，它循环对象的属性（键名），会把实例对象和原型链中的键循环出来
一般循环对象属性（键名）的话判断是否需要循环原型的属性（键名）

```javascript
let obj = {
  name: "Tom",
  age: 4
};

for(let key in obj) {
  // 判断是否只循环自有属性不包含原型的
  if(obj.hasOwnProperty(key)) {
    // ...
  }
}
```

15、相等
使用 `===` 或 `!==` 或 `Object.is()`;

16、Javascript修改样式 css 和 javascript 分离

```javascript
// bad
el.style.color = "red";
el.style.left = "12px";
// just so so
el.style.cssText = "color:red;left:12px";
// good 
.test1{
  background: red;
  width: 100px;
  height: 100px;
}
.test2{
  border: 1px solid blue;
}
testDom.className += "test1 ";
testDom.className += "test2 "

// 或者使用html5的API
testDom.classList.add("test1", "test2");

// 对于定位的话，CSS 中默认，此种方式修改 
el.style.left = "12px";
```

17、对于对象的属性的命名空间

```javascript
let lyGlobal = {
  namespace: function(ns) {
    let parts = ns.split("."),
      _this = this;
    for(let i = 0, len = parts.length; i < len; i++) {
      console.log(!_this[parts[i]])
      if(!_this[parts[i]]) {
        // _this[parts[i]] = Object.create(null);
        _this[parts[i]] = {};
      }
      _this = _this[parts[i]];
    }
    return _this;
  }
};

const a = lyGlobal.namespace("ly.name").name = {};
a.name = "AAAA"
console.log(a);
console.log(lyGlobal);
lyGlobal.ly.name = "Timy";
console.log(lyGlobal.ly.name);
// 每次调用namespace()来声明将要使用命名空间，是不会对已存在的命名空间造成破坏的。这样使用的时候不必要再去判断对象属性是否存在的问题。
```

18、事件处理

```javascript
// good
const EventUtil = {
  // 绑定事件(事件处理目标元素，事件类型，处理函数)
  addHandler: function(target, type, handler){
    if(target.addEventListener){
        		target.addEventListener(type, handler, false);
      	}else if(target.attachEvent){
      target.attachEvent("on"+type,handler);
      	}else{
        		target["on"+type]=handler;
      	}
  },
  // 溢出事件(事件处理目标元素，事件类型，处理函数)
  removeHandler: function(target,type,handler){
    if(target.removeEventListener){
      target.removeEventListener(type,handler,false);
    }else if(elem.detachEvent){
      target.detachEvent("on" + type, handler);
    }else{
      target["on" + type] = null;
    }
    },
  // 获取兼容所有浏览器的事件对象
    getEvent: function(event) {
     	return event ? event : window.event;
    },
  // 获取触发事件的对象元素
    getTarget:function(event) {
     	return event.target || event.srcElement;
    },
  // 阻止默认动作
    preventDefault:function(event){
    if(event,preventDefault){
        		event.preventDefault();
     	 } else {
       		 event.returnValue = false;
      	}
    },
  // 阻止事件冒泡行为
    stopPropagation:function(event){
     	if(event.stopPropagation){
        		event.stopPropagation();
      	} else {
        		event.cancelBubble=true;
      }
    }
  };

let lyApplication = {
  
  // 事件的处理在这个函数
  handleClick: function(event){
    const ev = event || window.event;
    this.showLoading(ev.clientX, event.clientY);
  },
  // 业务的处理在这个函数
  showContent: function(x, y) {
    const oDiv = document.querySelector("#test");
    oDiv.style.left = x + "px";
    oDiv.style.top = y + "px";
    oDiv.classList.add("show", "test");
  }
};
EventUtil.addHandler(document, "click", function(event){
  lyApplication.showContent(event);
});
```

19、检测DOM对象

```javascript
if(dom !== null){
  // ...
}
```

20、检测数组

```javascript
function isArray(arr) {
  if(typeof Array.isArray === "function") {
    return Array.isArray(arr);
  } else {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
}
```

21、判断属性存在的方法：最好使用 `in` 因为不会读取属性对应的值
使用 `obj[key]`会读取值，那么这个值是 `0`，`""`(空字符串)，`false`，`null`，`undefined` 都会为假

```javascript
let obj = {
  age: 0
};
if("age" in obj){
  // ...
}
```

22、实例属性判断 `hasOwnProperty()`
对于继承Object的javascript对象都可以使用 `hasOwnProperty()`判断，
但是IE8已经以下的DOM对象不存在还是 `in` 判断

```javascript
if("hasOwnProperty" in Object && Object.hasOwnProperty(key)){
  // ...
}
```
