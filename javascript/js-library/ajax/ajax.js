;
(function(win) {
    var _lyAjax = {};
    //向外暴露这么一个全局变量，就是这个函数的命名空间
    win._lyAjax = _lyAjax;

    //=======================属性=======================
    _lyAjax.version = "0.0.1";
    _lyAjax.author = "新月";
    _lyAjax.description = "";

    //=======================方法=======================
    _lyAjax.get = function() {
        var argLength = arguments.length;
        var URL, json, callback;
        if (argLength == 2 && typeof arguments[0] == "string" && typeof arguments[1] == "function") {
            //两个参数
            URL = arguments[0];
            callback = arguments[1];
            // 调用核心函数来发出Ajax请求
            _lyAjax._doAjax("get", URL, null, null, callback);
        } else if (argLength == 3 && typeof arguments[0] == "string" && typeof arguments[1] == "object" && typeof arguments[2] == "function") {
            //3个参数
            URL = arguments[0];
            json = arguments[1];
            callback = arguments[2];
            //调用核心函数来发出Ajax请求
            _lyAjax._doAjax("get", URL, json, null, callback);
        } else {
            throw new Error("get方法参数错误！");
        }
    }

    _lyAjax.post = function() {
        var argLength = arguments.length;
        if (argLength == 3 && typeof arguments[0] == "string" && typeof arguments[1] == "object" && typeof arguments[2] == "function") {
            //3个参数
            var URL = arguments[0];
            var json = arguments[1];
            var callback = arguments[2];
            //传给我们的核心函数来发出Ajax请求
            _lyAjax._doAjax("post", URL, json, null, callback);
        } else {
            throw new Error("post方法参数错误！");
        }
    }

    //post方式提交所有表单
    _lyAjax.postAllForm = function(URL, formId, callback) {
        var params = _lyAjax._formSerialize(formId);
        _lyAjax._doAjax("post", URL, null, params, callback);
    }

    //=======================内部方法=====================
    //将JSON转换为URL查询参数写法
    //json={"id":12,"name":"新月"}
    //返回id=12&name=新月
    _lyAjax._JSONtoURLparams = function(json) {
        var arrParts = []; //每个小部分的数组
        for (key in json) {
            arrParts.push(key + "=" + encodeURIComponent(json[key]));
        }
        return arrParts.join("&");
    }

    // 核心的发出Ajax请求的方法,可以传一个json进来。也可以直接传输一个序列化的串进来。
    _lyAjax._doAjax = function(method, URL, json, params, callback) {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
        	// 兼容IE
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback("文件没有找到" + xhr.status, null);
                }
            }
        }

        // 根据请求类型进行判断
        if (method == "get") {
            //如果用户传输了json格式处理
            if (json) {
                var combineChar = URL.indexOf("?") == -1 ? "?" : "&";
                URL += combineChar + _lyAjax._JSONtoURLparams(json);
            }

            //增加一个随机数参数，防止缓存
            var combineChar = URL.indexOf("?") == -1 ? "?" : "&";
            URL += combineChar + Math.random().toString().substr(2);

            xhr.open("get", URL, true);
            xhr.send(null);
        } else if (method == "post") {
            //增加一个随机数参数，防止缓存
            var combineChar = URL.indexOf("?") == -1 ? "?" : "&";
            URL += combineChar + Math.random().toString().substr(2);

            xhr.open("post", URL, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            if (json) {
                xhr.send(_lyAjax._JSONtoURLparams(json));
            } else if (params) {
                xhr.send(params);
            }
        }
    }

    _lyAjax._formSerialize = function(formId) {
        //得到表单
        var oForm = document.getElementById(formId);
        //得到按钮
        var oBtn = document.getElementById("btn");
        //得到所有表单控件
        var fields = oForm.elements;
        //表单控件的数量
        var fieldLength = fields.length;
        //存放每个部分的数组
        var partsArray = new Array();
        //遍历所有的控件
        for (var i = 0; i < fieldLength; i++) {
            //得到你遍历到的这个控件
            var field = fields[i];
            var k = field.name;
            var v = "";

            //根据这是一个什么控件来决定v
            switch (field.type) {
                case "button":
                case "submit":
                case "reset":
                    break;
                case "select-one":
                    //遍历这个单选列表的所有option
                    var options = field.options;
                    //这个单选列表的option的个数
                    var optionsLength = options.length;
                    //遍历所有的option，查看那个选项被selected了
                    //被selected了的那个选项的value，就是总value
                    for (var j = 0; j < optionsLength; j++) {
                        if (options[j].selected) {
                            v = options[j].value;
                            partsArray.push(k + "=" + v);
                        }
                    }
                    break;
                case "radio":
                case "checkbox":
                    if (!field.checked) {
                        break;
                    }
                case "text":
                default:
                    v = field.value;
                    partsArray.push(k + "=" + v);
                    break;
            }
        }
        return partsArray.join("&");
    }
})(window);