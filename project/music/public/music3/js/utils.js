
/**
要先判断readyState的状态（有四个状态）
0，请求未初始化；

1，服务器连接已建立；

2，请求已接收；

3，请求处理中；

4，请求已完成，且响应已就绪

当readyState等于4时，你又要判断status的状态
请求成功时status状态 200-300（不包括300） ，还有304（是缓存）（具体状态可以去参考文档）
在成功（失败）的回掉函数里面将xhr.responseText的值返回出去。

*/
var $ = {};
$.ajax = ajax;

function ajax(options) {

  // 解析参数
  options = options || {};
  if (!options.url) return;
  options.type = options.type || 'get';
  options.timeout = options.timeout || 1000;
  // 1, 创建ajax
  if (window.XMLHttpRequest) {

    // 高级浏览器和ie7以上
    var xhr = new XMLHttpRequest();
  } else {
    //ie6,7,8
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // 2, 连接
  var str = options.data && jsonToUrl(options.data);
  if (options.type === 'get') {
    xhr.open('get', `${options.url}?${str}`, true);
    // 3, 发送
    xhr.send();
  } else {
    alert(3);
    xhr.open('post', options.url, true);
    // 请求头
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // 3, 发送
    xhr.send(str);
  }

  // 4, 接收
  xhr.onreadystatechange = function () {
    // 5, 完成
    if (xhr.readyState === 4) {
      // 清除定时器
      clearTimeout(timer);
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
        // 成功
        options.success && options.success(xhr.responseText);
      } else {
        options.error && options.error(xhr.status);
      }
    }
  };
  // 超时
  if (options.timeout) {
    var timer = setTimeout(function () {
      alert("超时了");
      xhr.abort(); // 终止
    }, options.timeout);
  }
}

// json转url
function jsonToUrl(json) {
  var arr = [];
  json.t = Math.random();
  for (var name in json) {
    arr.push(name + '=' + encodeURIComponent(json[name]));
  }
  return arr.join('&');
}