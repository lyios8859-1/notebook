import Vue from 'vue';
let Time = {
  //获取当前时间戳
  getUnix() {
    let date = new Date();
    return date.getTime();
  },

  //获取今天0点0分0秒的时间戳
  getTodayUnix() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },

  //获取今年1月1日0点0秒的时间戳
  getYearUnix() {
    let date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  //获取标准年月日
  getLastDate(time) {
    let date = new Date(time);
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  },

  //转换时间
  getFormateTime(timestamp, isDate) {
    let now = this.getUnix();
    let today = this.getTodayUnix();
    let year = this.getYearUnix();
    let timer = (now - timestamp) / 1000;
    let tip = '';

    if (timer <= 0) {
      tip = '刚刚';
    } else if (Math.floor(timer / 60) <= 0) {
      tip = '刚刚';
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前';
    } else if (timer >= 3600 && (timestamp - today >= 0)) {
      tip = Math.floor(timer / 3600) + '小时前';
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前';
    } else {
      tip = this.getLastDate(timestamp);
    }
    return tip;
  }
}
function getFormateTime1(time) {
  if (!time) {
    return "时间戳没有传递";
  }
  const date3 = new Date().getTime() - new Date(time).getTime();
  const days = Math.floor(date3 / (24 * 3600 * 1000));

  // 计算出小时数
  const leave1 = date3 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);
  // alert(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
  if (days !== 0) {
    if (days > 365) {
      return `${Math.floor(days / 365)}年前`;
    } else if (days > 30) {
      return `${Math.floor(days / 30)}月前`;
    } else if (days < 0) {
      return "刚刚";
    }
    return `${days}天前`;
  } else if (hours !== 0) {
    return `${hours}小时前`;
  } else if (minutes !== 0) {
    return `${minutes}分钟前`;
  } else if (seconds !== 0) {
    return `${seconds}秒前`;
  } else if (seconds === 0) {
    return "刚刚";
  }
}

let directive = {
  name: 'time',
  directives: {
    // 执行一次
    bind(el, binding) {
      console.log(el, binding)
      el.innerHTML = Time.getFormateTime(binding.value);
      el.__timeout__ = setInterval(() => {
        el.innerHTML = Time.getFormateTime(binding.value);
      }, 60000);
    },
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
      // 聚焦元素
      el.focus();
      console.log('inserted')
    },
    // 更新
    updated() {
      console.log('updatedddd')
    },
    unbind(el) {
      console.log('unbind');
      clearInterval(el.__timeout__)
    }
  }
}


Vue.directive(directive.name, directive.directives);