// 获取光标位置
function getCursortPosition(textDom) {
    var cursorPos = 0;
    if (document.selection) {
        // IE Support
        textDom.focus();
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -textDom.value.length);
        cursorPos = selectRange.text.length;
    } else if (textDom.selectionStart || textDom.selectionStart == '0') {
        // Firefox support
        cursorPos = textDom.selectionStart;
    }
    return cursorPos;
}
// 设置光标位置
function setCaretPosition(textDom, pos) {
    if (textDom.setSelectionRange) {
        // IE Support
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    } else if (textDom.createTextRange) {
        // Firefox support
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}
// 获取选中文字
function getSelectText() {
    var userSelection, text;
    if (window.getSelection) {
        // Firefox support
        userSelection = window.getSelection();
    } else if (document.selection) {
        // IE Support
        userSelection = document.selection.createRange();
    }
    if (!(text = userSelection.text)) {
        text = userSelection;
    }
    return text;
}
/**
 * 选中特定范围的文本
 * 参数：
 *     textDom  [JavaScript DOM String] 当前对象
 *     startPos  [Int]  起始位置
 *     endPos  [Int]  终点位置
 */
function setSelectText(textDom, startPos, endPos) {
    var startPos = parseInt(startPos),
        endPos = parseInt(endPos),
        textLength = textDom.value.length;
    if (textLength) {
        if (!startPos) {
            startPos = 0;
        }
        if (!endPos) {
            endPos = textLength;
        }
        if (startPos > textLength) {
            startPos = textLength;
        }
        if (endPos > textLength) {
            endPos = textLength;
        }
        if (startPos < 0) {
            startPos = textLength + startPos;
        }
        if (endPos < 0) {
            endPos = textLength + endPos;
        }
        if (textDom.createTextRange) {
            // IE Support
            var range = textDom.createTextRange();
            range.moveStart("character", -textLength);
            range.moveEnd("character", -textLength);
            range.moveStart("character", startPos);
            range.moveEnd("character", endPos);
            range.select();
        } else {
            // Firefox support
            textDom.setSelectionRange(startPos, endPos);
            textDom.focus();
        }
    }
}
/**
 * 在光标后插入文本
 * 参数：
 *     textDom  [JavaScript DOM String] 当前对象
 *     value  [String]  要插入的文本
 */
function insertAfterText(textDom, value) {
    var selectRange;
    if (document.selection) {
        // IE Support
        textDom.focus();
        selectRange = document.selection.createRange();
        selectRange.text = value;
        textDom.focus();
    } else if (textDom.selectionStart || textDom.selectionStart == '0') {
        // Firefox support
        var startPos = textDom.selectionStart;
        var endPos = textDom.selectionEnd;
        var scrollTop = textDom.scrollTop;
        textDom.value = textDom.value.substring(0, startPos) + value + textDom.value.substring(endPos, textDom.value.length);
        textDom.focus();
        textDom.selectionStart = startPos + value.length;
        textDom.selectionEnd = startPos + value.length;
        textDom.scrollTop = scrollTop;
    } else {
        textDom.value += value;
        textDom.focus();
    }
}

/*
根据不同的设备宽度在根元素上设置不同的字体大小。
设置1rem为1/10屏幕宽度。
 */
;
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 540) { // 最大宽度
            width = 540;
        }        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();

})(window);

/**
 * MobileWeb 通用功能助手，包含常用的 UA 判断、页面适配、search 参数转 键值对。
 * 该 JS 应在 head 中尽可能早的引入，减少重绘。
 *
 * fixScreen 方法根据两种情况适配，该方法自动执行。
 *      1. 定宽： 对应 meta 标签写法 -- <meta name="viewport" content="target-densitydpi=device-dpi,width=750">
 *          该方法会提取 width 值，主动添加 scale 相关属性值。
 *          注意： 如果 meta 标签中指定了 initial-scale， 该方法将不做处理（即不执行）。
 *      2. REM: 不用写 meta 标签，该方法根据 dpr 自动生成，并在 html 标签中加上 data-dpr 和 font-size 两个属性值。
 *          该方法约束：IOS 系统最大 dpr = 3，其它系统 dpr = 1，页面每 dpr 最大宽度（即页面宽度/dpr） = 750，REM 换算比值为 16。
 *          对应 css 开发，任何弹性尺寸均使用 rem 单位，rem 默认宽度为 视觉稿宽度 / 16;
 *              scss 中 $ppr(pixel per rem) 变量写法 -- $ppr: 750px/16/1rem;
 *                      元素尺寸写法 -- html { font-size: $ppr*1rem; } body { width: 750px/$ppr; }。
 */
window.mobileUtil = (function(win, doc) {
    var UA = navigator.userAgent,
        isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid, // 据说某些国产机的UA会同时包含 android iphone 字符
        isMobile = isAndroid || isIos; // 粗略的判断

    return {
        isAndroid: isAndroid,
        isIos: isIos,
        isMobile: isMobile,

        isNewsApp: /NewsApp\/[\d\.]+/gi.test(UA),
        isWeixin: /MicroMessenger/gi.test(UA),
        isQQ: /QQ\/\d/gi.test(UA),
        isYixin: /YiXin/gi.test(UA),
        isWeibo: /Weibo/gi.test(UA),
        isTXWeibo: /T(?:X|encent)MicroBlog/gi.test(UA),

        tapEvent: isMobile ? 'tap' : 'click',

        /**
         * 缩放页面
         */
        fixScreen: function() {
            var metaEl = doc.querySelector('meta[name="viewport"]'),
                metaCtt = metaEl ? metaEl.content : '',
                matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
                matchWidth = metaCtt.match(/width=([^,\s]+)/);

            if (!metaEl) { // REM
                var docEl = doc.documentElement,
                    maxwidth = docEl.dataset.mw || 750, // 每 dpr 最大页面宽度
                    dpr = isIos ? Math.min(win.devicePixelRatio, 3) : 1,
                    scale = 1 / dpr,
                    tid;

                docEl.removeAttribute('data-mw');
                docEl.dataset.dpr = dpr;
                metaEl = doc.createElement('meta');
                metaEl.name = 'viewport';
                metaEl.content = fillScale(scale);
                docEl.firstElementChild.appendChild(metaEl);

                var refreshRem = function() {
                    var width = docEl.getBoundingClientRect().width;
                    if (width / dpr > maxwidth) {
                        width = maxwidth * dpr;
                    }
                    var rem = width / 16;
                    docEl.style.fontSize = rem + 'px';
                };

                win.addEventListener('resize', function() {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }, false);
                win.addEventListener('pageshow', function(e) {
                    if (e.persisted) {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, 300);
                    }
                }, false);

                refreshRem();
            } else if (isMobile && !matchScale && (matchWidth && matchWidth[1] != 'device-width')) { // 定宽
                var width = parseInt(matchWidth[1]),
                    iw = win.innerWidth || width,
                    ow = win.outerWidth || iw,
                    sw = win.screen.width || iw,
                    saw = win.screen.availWidth || iw,
                    ih = win.innerHeight || width,
                    oh = win.outerHeight || ih,
                    ish = win.screen.height || ih,
                    sah = win.screen.availHeight || ih,
                    w = Math.min(iw, ow, sw, saw, ih, oh, ish, sah),
                    scale = w / width;

                if (scale < 1) {
                    metaEl.content = metaCtt + ',' + fillScale(scale);
                }
            }

            function fillScale(scale) {
                return 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
            }
        },

        /**
         * 转href参数成键值对
         * @param href {string} 指定的href，默认为当前页href
         * @returns {object} 键值对
         */
        getSearch: function(href) {
            href = href || win.location.search;
            var data = {},
                reg = new RegExp("([^?=&]+)(=([^&]*))?", "g");
            href && href.replace(reg, function($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data;
        }
    };
})(window, document);

// 默认直接适配页面
//mobileUtil.fixScreen();


//解析URL各部分的通用方法
function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function() {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}


// 验证中英文
function check_en_ch(_value) {
    var reg_en_num = /^[0-9A-Za-z\'\"\,\.\!\?\:\s|“|”|‘|’|！|＂|．|？|：|。|，]+/;
    var reg_en_num_nonull = /[0-9A-Za-z\'\"\,\.\!\?\:|“|”|‘|’|！|＂|．|？|：|。|，]/;
    var reg_container_en = /[A-Za-z]/;
    var reg_chinese = /^[0-9\u4E00-\u9FA5\"\,\.\!\?\:\s|“|”|‘|’|！|＂|．|？|：|。|，]+/;
    var chinese_arr = [];
    var english_arr = [];
    var cn_limit_num = 9,
        cn_total_num = 20,
        en_limit_num = 16,
        en_total_num = 30;
    if (_value == null || _value == "") {
        alert("请输入您的定制语");
        return false;
    }

    if (reg_container_en.test(_value)) { //如果包括英文
        if (reg_en_num.test(_value)) { //如果是以英文或数字开头
            if (_value == _value.match(reg_en_num)[0]) { //通过全英文数字
                if (_value.length > 42) { //如果超过42个字符
                    alert("英文字符不能超过30个");
                    return false;
                }
                if (_value.split("\n").length > 3) { //如果行数超过5个
                    alert("英文输入不能超过3行");
                    return false;
                }
                //存储成功
                // sessionStorage.setItem("custom_word",_value);
            } else { //英文前中文后
                alert("请输入纯中文或纯英文的定制语,不包括特殊符号");
                return false;
            }
        } else { //包括英文中文数字 ，中文在前
            alert("请输入纯中文或纯英文的定制语,不包括特殊符号");
            return false;
        }
    } else {
        //包括中文数字
        if (_value.match(reg_chinese) == _value) { //全汉字数字通过
            if (_value.indexOf("\n") >= 0) { //有换行
                alert("请不要换行输入");
                return false;
            } else { //没有换行
                if (_value.length > cn_total_num) {
                    alert("中文字体不超过20个，请重新输入");
                    return false;
                }

                var split_num = Math.ceil(_value.length / cn_limit_num);
                for (var j = 0; j < split_num; j++) {
                    chinese_arr[j] = _value.substring(j * cn_limit_num, (j + 1) * cn_limit_num);
                }
                _value = chinese_arr.join("\n");

            }
            //存储成功
            //sessionStorage.setItem("custom_word",_value);
        } else { //失败3 中文加特殊符号
            alert("您输入的定制语中含有不支持的特殊字符，请重新输入");
            return false;
        }
    }
    return true;
}


//window.addEvent("resize", myFn.debounce(500));
//防止重复提交
Function.implement({
    debounce: function(wait, immediate) {
        var timeout,
            func = this;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
});

//判断图片是否加载完成
function loadImage(url, callback) {
    var img = new Image(); //创建一个Image对象，实现图片的预下载
    img.src = url;

    if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img);
        return; // 直接返回，不用再处理onload事件
    }
    img.onload = function() { //图片下载完毕时异步调用callback函数。
        callback.call(img); //将回调函数的this替换为Image对象
    };
};

/**
 //对图片多个判断是否加载完成
 var imgdefereds=[];
$('img').each(function(){
 var dfd=$.Deferred();
 $(this).bind('load',function(){
  dfd.resolve();
 }).bind('error',function(){
 //图片加载错误，加入错误处理
 // dfd.resolve();
 })
 if(this.complete) setTimeout(function(){
  dfd.resolve();
 },1000);
 imgdefereds.push(dfd);
})
$.when.apply(null,imgdefereds).done(function(){
    callback();
});



 */

/*
用JavaScript获取页面上被选中的文字的技巧:API:	
event.selection = window.getSelection();
这里的selection实际上是个对象，但如果我们使用 .toString()或强行转化成字符串，我们将得到被选中的文字。

 */
$(document).ready(function() {
    $(".contenttext").mouseup(function(e) {
        var txt;
        var parentOffset = $(this).offset();
        var x = e.pageX - parentOffset.left;
        var y = e.pageY - parentOffset.top;
        txt = window.getSelection();
        if (txt.toString().length > 1) {
            alert(txt);
        }
    });
});

/**
 * 判断闰年函数
 * @param  {number} year 要判断的年份
 * @return {bool} 返回布尔值
 *
 * 其实只要满足下面几个条件即可、
 * 1.普通年能被4整除且不能被100整除的为闰年。如2004年就是闰年,1900年不是闰年
 * 2.世纪年能被400整除的是闰年。如2000年是闰年，1900年不是闰年
 */
function leapYear(year) {
    return !(year % (year % 100 ? 4 : 400));
}

//获取鼠标位置
function mousePosition(e) {
    //IE9以上的浏览器获取　　
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
}

/**
 <div id="chk_list">
    <input type="checkbox" name="choose">跳舞
    <input type="checkbox" name="choose">跳水
    <input type="checkbox" name="choose"/>跳棋
    <input type="checkbox" name="choose"/>跑步
</div>
<input type="checkbox" name="allChecked" id="allChecked" onclick="SelectAll()"/>全选/取消

 */
//反选,全选
function SelectAll() {
    var checkboxs = document.getElementById("chk_list").children;
    for (var i = 0; i < checkboxs.length; i++) {
        var e = checkboxs[i];
        e.checked = !e.checked;
    }
}

//跨浏览器兼容问题
var Util = {
    //添加类名
    add: function(ele, type, hand) {
        if (ele.addEventListener) {
            ele.addEventListener(type, hand, false);
        } else if (ele.attachEvent) {
            ele.attachEvent("on" + type, hand);
        } else {
            ele["on" + type] = hand;
        }
    },
    //删除类名
    remove: function(ele, type, hand) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, hand, false);
        } else if (ele.detachEvent) {
            ele.detachEvent("on" + type, hand);
        } else {
            ele["on" + type] = null;;
        }
    },
    //兼容事件对象
    getEvent: function(event) {
        return event ? event : window.event;
    },
    //兼容获取当前标签
    getTarget: function(event) {
        return event.target || event.srcElement;
    }
}


//检验身份证
function checkIdCard() {
    var vcity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" },
        card = $('#card_no').val(),
        errorwrap = $('#card_no').parent().next();
    if (card === '') { //是否为空
        errorwrap.html('<i class="icon_no"></i><em class="c_error">请输入身份证号，身份证号不能为空</em>');
        document.getElementById('card_no').focus;
        return false;
    }

    if (isCardNo(card) === false) { //校验长度，类型
        errorwrap.html('<i class="icon_no"></i><em class="c_error">您输入的身份证号码不正确，请重新输入</em>');
        document.getElementById('card_no').focus;
        return false;
    }

    if (checkProvince(card) === false) { //检查省份
        errorwrap.html('<i class="icon_no"></i><em class="c_error">您输入的身份证号码不正确,请重新输入</em>');
        document.getElementById('card_no').focus;
        return false;
    }
    if (checkBirthday(card) === false) { //校验生日
        errorwrap.html('<i class="icon_no"></i><em class="c_error">您输入的身份证号码生日不正确,请重新输入</em>');
        document.getElementById('card_no').focus();
        return false;
    }

    if (checkParity(card) === false) { //检验位的检测
        errorwrap.html('<i class="icon_no"></i><em class="c_error">您的身份证校验位不正确,请重新输入</em>');
        document.getElementById('card_no').focus();
        return false;
    }
    errorwrap.html('<i class="icon_yes"></i>');
    return true;

    //检查号码是否符合规范，包括长度，类型
    function isCardNo(card) { //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(card) === false) {
            return false;
        }
        return true;
    }

    //检查生日是否正确

    function checkBirthday(card) {
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len == '15') {
            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/,
                arr_data = card.match(re_fifteen),
                year = arr_data[2],
                month = arr_data[3],
                day = arr_data[4],
                birthday = new Date('19' + year + '/' + month + '/' + day);
            return verifyBirthday('19' + year, month, day, birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len == '18') {
            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
                arr_data = card.match(re_eighteen),
                year = arr_data[2],
                month = arr_data[3],
                day = arr_data[4],
                birthday = new Date(year + '/' + month + '/' + day);
            return verifyBirthday(year, month, day, birthday);
        }

        return false;

    }
    //校验日期
    function verifyBirthday(year, month, day, birthday) {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
            //判断年份的范围（3岁到100岁之间)
            var time = now_year - year;
            if (time >= 3 && time <= 100) {
                return true;
            }
            return false;
        }
        return false;
    }

    //取身份证前两位,校验省份
    function checkProvince(card) {
        var province = card.substr(0, 2);
        if (vcity[province] == undefined) {
            return false;
        }
        return true;
    }

    //校验位的检测
    function checkParity(card) {
        //15位转18位
        card = changeFivteenToEighteen(card);
        var len = card.length;
        if (len == '18') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2),
                arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'),
                cardTemp = 0,
                i,
                valnum;
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[cardTemp % 11];
            if (valnum == card.substr(17, 1)) {
                return true;
            }
            return false;
        }
        return false;
    }

    //15位转18位身份证号
    function changeFivteenToEighteen(card) {
        if (card.length == '15') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2),
                arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'),
                cardTemp = 0,
                i;
            card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            card += arrCh[cardTemp % 11];
            return card;
        }
        return card;
    }
}


//JS正则表达式 替换括号,尖括号等
function toTxt(str) {
    var RexStr = /\<|\>|\"|\'|\&/g
    str = str.replace(RexStr, function(MatchStr) {
        switch (MatchStr) {
            case "<":
                return "<";
                break;
            case ">":
                return ">";
                break;
            case "\"":
                return "";
                break;
            case "'":
                return "'";
                break;
            case "&":
                return "&";
                break;
            default:
                break;
        }
    })
    return str;
}

/*
//判断URL实现菜单高亮显示 
//参数说明: 
1.menuId : 链接组所在ID; 
2.classCur : 高亮显示时的样式class名. 
调用方法: 

window.onload=function highThis(){highURL("youId","youhighclass");} 
*/
function highURL(menuId, classCur) {
    if (!document.getElementById) return false;
    if (!document.getElementById(menuId)) return false;
    if (!document.getElementsByTagName) return false;
    var menuId = document.getElementById(menuId);
    var links = menuId.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var menuLink = links[i].href;
        var currentLink = window.location.href;
        if (currentLink.indexOf(menuLink) != -1) {
            links[i].className = classCur;
        }
    }
}


/**
 * var uuid = "cms"+guid();
 * [S4 生成UUID]
 */
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

/**
 * 全局唯一标识符（GUID，Globally Unique Identifier）也称作 UUID(Universally Unique IDentifier) 。

GUID是一种由算法生成的二进制长度为128位的数字标识符。
GUID 的格式为“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”，其中的 x 是 0-9 或 a-f 范围内的一个32位十六进制数。
在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID。

GUID 的总数达到了2^128（3.4×10^38）个，所以随机生成两个相同GUID的可能性非常小，但并不为0。
GUID一词有时也专指微软对UUID标准的实现。

 [guid description]
 * @return {[type]} [description]
 */
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function timeUUID(str){
    var str = str + "-" || "ly-";
    var date = new Date();
    var timestamp = date.getTime();// 时间戳
    var day = date.getDay();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    var randomnum = Math.round(Math.random() * 10000);
    var uuid = str + day + hours + minutes + seconds + milliseconds + timestamp + randomnum ;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var date = new Date();
    var timestamp = date.getTime();// 时间戳
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = timestamp;
 
    var uuid = s.join("");
    return uuid;
}
/**
 * [uuidfreelength 指定长度的uuid]
 * @param  {[type]} len   [生成的长度]
 * @param  {[type]} radix [进制数（基数）]
 * @return {[type]}       [description]
 */
function uuidfreelength(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}