var trimHtml = require('trim-html');

module.exports = {
  section: function (name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  },
  // 日期格式化
  format: function (date, options) {
    return new Date(date).format(options || "yyyy-MM-dd");
  },
  // 截取的内容
  substring: function (content, end) {
    var obj = trimHtml(content, {limit: end});
    return obj.html;
  },
  // UUID
  LyUuid: function(len, radix) {
    return LyUuid(len, radix);
  }

};


/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg: (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
  var o = {
    "Y+": this.getFullYear(),
    "M+": this.getMonth() + 1,
    // 月份
    "d+": this.getDate(),
    // 日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
    // 小时
    "H+": this.getHours(),
    // 小时
    "m+": this.getMinutes(),
    // 分
    "s+": this.getSeconds(),
    // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3),
    // 季度
    "S": this.getMilliseconds()
    // 毫秒
  };
  var week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
      .substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt
      .replace(
        RegExp.$1,
        ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期"
          : "周")
          : "")
        + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
        : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

/*
*UUID生成 LyUuid(生成的字符长度，基数)
  //8 character ID (base=2)
  LyUuid(8, 2)  //  "01001010"
  // 8 character ID (base=10)
  LyUuid(8, 10) // "47473046"
  // 8 character ID (base=16)
  LyUuid(8, 16) // "098F4D35"
**/
function LyUuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
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
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}