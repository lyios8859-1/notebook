function $(sArg) {
    return new lyQuery(sArg);
};

/**
 * 核心函数
 * @param  {[type]} sArg [传递的参数]
 * @return {[type]}      [description]
 */
function lyQuery(sArg) {
    // 用来保存选中的元素
    this.elements = [];
    switch (typeof sArg) {
        case 'function':
            myAddEvent(window, 'load', sArg);
            break;
        case 'string':
            // 判断第一个字符
            switch (sArg.charAt(0)) {
                case '#': // ID
                    var obj = document.getElementById(sArg.substring(1));
                    this.elements.push(obj);
                    break;
                case '.': // class
                    this.elements = getByClass(document, sArg.substring(1));
                    break;
                default: // tagName
                    this.elements = document.getElementsByTagName(sArg);
            }
            break;
        case 'object':
            this.elements.push(sArg);
    }
};

/**
 * 扩展插件
 * @param  {[type]}   name [插件的名称]
 * @param  {Function} fn   [插件的操作]
 * @return {[type]}        [description]
 */
lyQuery.prototype.extend = function(name, fn) {
    lyQuery.prototype[name] = fn;
};

/**
 * 单击事件
 * @param  {Function} fn [点击需要执行的函数]
 * @return {[type]}      [description]
 */
lyQuery.prototype.click = function(fn) {
    var i = 0;
    for (i = 0; i < this.elements.length; i++) {
        myAddEvent(this.elements[i], 'click', fn);
    }
};

/**
 * 元素的显示
 * @return {[type]} [description]
 */
lyQuery.prototype.show = function() {
    var i = 0;
    for (i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    }
};

lyQuery.prototype.hide = function() {
    var i = 0;
    for (i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
    }
};

lyQuery.prototype.hover = function(fnOver, fnOut) {
    var i = 0;
    for (i = 0; i < this.elements.length; i++) {
        myAddEvent(this.elements[i], 'mouseover', fnOver);
        myAddEvent(this.elements[i], 'mouseout', fnOut);
    }
};

/**
 * 获取和设置样式
 * @param  {[type]} attr  [元素属性]
 * @param  {[type]} value [获取的属性值]
 * @return {[type]}       [description]
 */
lyQuery.prototype.css = function(attr, value) {
    if (arguments.length == 2) { // 设置样式
        var i = 0;
        for (i = 0; i < this.elements.length; i++) {
            this.elements[i].style[attr] = value;
        }
    } else { // 获取样式
        if (typeof attr == 'string') {
            return getStyle(this.elements[0], attr);
        } else { // 支持传递json格式
            for (i = 0; i < this.elements.length; i++) {
                var k = '';
                for (k in attr) {
                    this.elements[i].style[k] = attr[k];
                }
            }
        }
    }
    return this;
};

/**
 * 获取元素的属性或者值
 * @param  {[type]} attr  [元素的属性]
 * @param  {[type]} value [属性值]
 * @return {[type]}       [元素的属性]
 */
lyQuery.prototype.attr = function(attr, value) {
    if (arguments.length == 2) {
        var i = 0;
        for (i = 0; i < this.elements.length; i++) {
            this.elements[i][attr] = value;
        }
    } else {
        return this.elements[0][attr];
    }
    return this;
};

/**
 * 切换
 * @return {[type]} [description]
 */
lyQuery.prototype.toggle = function() {
    var i = 0;
    var _arguments = arguments;
    for (i = 0; i < this.elements.length; i++) {
        addToggle(this.elements[i]);
    }

    function addToggle(obj) {
        var count = 0;
        myAddEvent(obj, 'click', function() {
            _arguments[count++ % _arguments.length].call(obj);
        });
    }
};

/**
 * 获取某个元素对象
 * @param  {[type]} n [第一个]
 * @return {[type]}   [元素对象]
 */
lyQuery.prototype.eq = function(n) {
    return $(this.elements[n]);
};

/**
 * 查找某个父元素的某种元素
 * @param  {[type]} str [需要查找的元素]
 * @return {[type]}     [description]
 */
lyQuery.prototype.find = function(str) {
    var i = 0;
    var aResult = [];

    for (i = 0; i < this.elements.length; i++) {
        switch (str.charAt(0)) {
            case '.': // class
                var aEle = getByClass(this.elements[i], str.substring(1));

                aResult = aResult.concat(aEle);
                break;
            default: // 标签
                var aEle = this.elements[i].getElementsByTagName(str);
                appendArr(aResult, aEle);
        }
    }
    // 链式调用
    var newlyQuery = $();
    newlyQuery.elements = aResult;
    return newlyQuery;
};

/**
 * 获取元素的索引
 * @return {[type]} [返回索引值]
 */
lyQuery.prototype.index = function() {
    return getIndex(this.elements[0]);
};


/**
 * 获取某个父元素下的所有元素的索引
 * @param  {[type]} obj [父元素对象]
 * @return {[type]}     [索引值]
 */
function getIndex(obj) {
    var aBrother = obj.parentNode.children;
    var i = 0;
    for (i = 0; i < aBrother.length; i++) {
        if (aBrother[i] == obj) {
            return i;
        }
    }
};

/**
 * 组织默认事件
 * @param  {[type]}   evType [事件]
 * @param  {Function} fn  [函数]
 * @return {[type]}       [description]
 */
lyQuery.prototype.bind = function(evType, fn) {
    var i = 0;

    for (i = 0; i < this.elements.length; i++) {
        myAddEvent(this.elements[i], evType, fn);
    }
};


/**
 *  $(document).mousemove(function(){
            this.onmousemove = function(ev) {
                console.log( mousePos(ev) )
            };
        });
 * @param {*} fn 
 */
lyQuery.prototype.mousemove = function (fn) {
    for (var i = 0; i < this.elements.length; i++) {
        myAddEvent(this.elements[i], 'mousemove', fn);
    }
};

/**
 * [each forEach模拟]
 * @param  {[type]}   object   [行操作的对象]
 * @param  {Function} callback [进行操作的函数fn]
 * @param  {[type]}   args     [函数的参数]
 * @return {[type]}            [description]
 */
lyQuery.prototype.each =  function (object, callback, args) {
//该方法有三个参数:进行操作的对象obj，进行操作的函数fn，函数的参数args
var name, i = 0,length = object.length;
if (args) {
  if (length == undefined) {
    for (name in object) {
      if (callback.apply(object[name], args) === false) {
        break;
      }
    }
  }
  else{
    for (; i < length;) {
      if (callback.apply(object[i++], args) === false) {
        break;
      }
    }
  }
}
else{
  if (length == undefined) {
    for (name in object) {
      if (callback.call(object[name], name, object[name]) === false) {
        break;
      }
    }
  }
  else{
    for (var value = object[0]; i < length && callback.call(value, i, value) !==false; value = object[++i]) {}
      /*
      object[0]取得jQuery对象中的第一个DOM元素，通过for循环，
      得到遍历整个jQuery对象中对应的每个DOM元素，通过 callback.call( value,i,value);
      将callback的this对象指向value对象，并且传递两个参数,i表示索引值，value表示DOM元素；
      其中callback是类似于 function(index, elem) { ... } 的方法。
      所以就得到 $("...").each(function(index, elem){ ... });
      */
    }
  }
  return object;
};


// // 简单的each
// var each = function (arr, fn) {
//     for (var i = 0; i < arr.length; i++) { 
//         var val = arr[i]; 
//         if (fn.call(val, i, val, arr)) { 
//             return false; 
//         } 
//     } 
// } 







// 获取鼠标位置
function mousePos (e) {
    // IE9以上的浏览器获取　　
    if (e.pageX || e.pageY) {　　
        return {
            x: e.pageX,
            y: e.pageY
        };　　
    }　　
    //IE9以下
    //IE中document文档实际并不在(0,0)的位置，在它周围有一个小（通常有2px）边框，document.body.clientLeft和document.body.clientTop包含了这个边框的宽度　　
    return {
        x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: e.clientY + document.body.scrollTop - document.body.clientTop　　
    };　　
};

/**
 * 事件绑定
 * @param  {[type]}   obj [事件的绑定对象]
 * @param  {[type]}   evType [事件类型]
 * @param  {Function} fn  [函数回调]
 * @return {[type]}       [description]
 */
function myAddEvent(obj, evType, fn) {
    if (obj.attachEvent) {
        obj.attachEvent('on' + evType, function(ev) {
            if (false == fn.call(obj)) {
                ev.cancelBubble = true;
                return false;
            }
            return ev;
        });
    } else {
        obj.addEventListener(evType, function(ev) {
            if (false == fn.call(obj)) {
                ev.cancelBubble = true;
                ev.preventDefault();
            }
            return ev;
        }, false);
    }
}
/**
 * 获取className下的所有元素
 * @param  {[type]} oParent [父元素对象]
 * @param  {[type]} sClass  [需要匹配的className]
 * @return {[type]}         [返回所有与className相同的数组]
 */
function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];
    var i = 0;
    for (i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClass) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
};

/**
 * 获取样式
 * @param  {[type]} obj  [对象]
 * @param  {[type]} attr [元素的属性]
 * @return {[type]}      [返回样式]
 */
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
};

/**
 * 两个数组的连接
 * @param  {[type]} arr1 [数组1]
 * @param  {[type]} arr2 [数组2]
 * @return {[type]}      [返回合成后的新数组]
 */
function appendArr(arr1, arr2) {
    var i = 0;
    for (i = 0; i < arr2.length; i++) {
        arr1.push(arr2[i]);
    }
}