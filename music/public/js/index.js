let oLRC = {
  ti: "", //歌曲名
  ar: "", //演唱者
  al: "", //专辑名
  by: "", //歌词制作人
  offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
  ms: [] //歌词数组{t:时间,c:歌词}
};

function createLrcObj(lrc) {
  // 需要清空
  oLRC.ti = "";
  oLRC.ar = "";
  oLRC.al = "";
  oLRC.by = "";
  oLRC.offset = "";
  oLRC.ms = [];
  if (lrc.length == 0) return;
  let lrcs = lrc.split('\n');//用回车拆分成数组
  for (let i in lrcs) {//遍历歌词数组
    lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
    let t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
    let s = t.split(":");//分离:前后文字
    if (isNaN(parseInt(s[0]))) { //不是数值
      for (let i in oLRC) {
        if (i != "ms" && i == s[0].toLowerCase()) {
          oLRC[i] = s[1];
        }
      }
    } else { //是数值
      let arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
      let start = 0;
      for (let k in arr) {
        start += arr[k].length; //计算歌词位置
      }
      let content = lrcs[i].substring(start);//获取歌词内容
      for (let k in arr) {
        let t = arr[k].substring(1, arr[k].length - 1);//取[]间的内容
        let s = t.split(":");//分离:前后文字
        oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
          t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
          c: content
        });
      }
    }
  }
  oLRC.ms.sort(function (a, b) {//按时间顺序排序
    return a.t - b.t;
  });

  // for (let i in oLRC) { //查看解析结果
  //   console.log(i, ":", oLRC[i]);
  // }
  // 解析后的歌词位于oLRC对象的ms数组中：
  // oLRC.ms[i].t 是第i行歌词的时间，以秒计；
  // oLRC.ms[i].c 是第i行歌词。
}
// createLrcObj(lrc);


function showLRC() {
  let html = "";
  let lrcDiv = document.querySelector("#lrc");
  if (lrcDiv.children > 0) {
    lrcDiv.innerHTML = "";
  }
  for (let i in oLRC.ms) {//遍历ms数组，把歌词加入列表
    html += '<div class="lrcline">' + oLRC.ms[i].c + '</div>';
  }
  console.log(html);
  lrcDiv.innerHTML = html;
}
// showLRC();
function getLrcList(url, lrc) {
  $.ajax({
    type: 'post',
    url: url,
    data: { lrcFile: lrc },
    success: function (lrc) {
      createLrcObj(lrc);
      showLRC();
    }
  });
}


window.onload = function () {
  getLrcList('/lrc/getLrc', 1);

  const playDom = document.querySelector('#palyOrPause');
  const mutedDom = document.querySelector('#isMuted');
  const selectPrevDom = document.querySelector('#prev');
  const selectNextDom = document.querySelector('#next');
  const lrcDom = document.querySelector('#lrc');
  const lrc = lrcDom.children;
  const playProgressDom = document.querySelector('#playProgress');
  const playTimeDom = document.querySelector('#playTimer');
  const C_POS = 30; // 偏移量，最好是歌词行高的倍数
  let currentLineNo = 0;//当前播放到哪一行
  let timer = null;

  const player = new AudioPlayer();

  //高亮显示歌词当前行及文字滚动控制，行号为 currentLineNo
  function lineHigh() {

    //文字滚动，设置滚动条的位置
    let curPositon = lrcDom.clientHeight / 2 / lrc[currentLineNo].offsetHeight;
    let postion = Math.ceil(curPositon) * lrc[currentLineNo].offsetHeight + C_POS;
    lrcDom.scrollTo(0, lrc[currentLineNo].offsetTop - postion);

    if (currentLineNo > 0) {
      //去掉上一行的高亮样式
      lrc[currentLineNo - 1].classList.remove('lineHigh');
    }
    //高亮显示当前行
    lrc[currentLineNo].classList.add('lineHigh');

    // for (let i = 0; i < oLRC.ms.length; i++) {
    //   lrc[i].style.backgroundColor = null;
    //   lrc[i].style.color = null;
    // }
    // lrc[currentLineNo].style.backgroundColor = "#ccc";
    // lrc[currentLineNo].style.color = "blue";

  }

  //滚回到开头，用于播放结束时
  function goback() {
    getLrcList('/lrc/getLrc', 2);
    lrcDom.scrollTo(0, 0);
    currentLineNo = 0;
  }

  // 格式化时间
  function formatTimer(time) {
    //分钟
    let minute = time / 60;
    let minutes = parseInt(minute);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    //秒
    let second = time % 60;
    let seconds = Math.round(second);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    // 总共时长的秒数
    let allTime = parseInt(minutes * 60 + seconds);
    return {
      s: allTime,
      f: minutes + ":" + seconds
    };
  }


  //播放时间
  function addtime(currentTime, durations) {
    timer = setTimeout(() => {
      playTimeDom.innerHTML = formatTimer(currentTime).f + " / " + formatTimer(durations).f;

      //  (audio.currentTime / audio.duration).toFixed(4) * 100 + "%"
      let progressPercent = (formatTimer(currentTime).s / formatTimer(durations).s).toFixed(4) * 100 + 10;
      if (progressPercent >= 100) {
        progressPercent = 100;
      }
      playProgressDom.style.width = Math.round(progressPercent) + "%";
      console.log('.>>', Math.round(progressPercent));
    }, 1000);
  }

  playDom.onclick = function (ev) {
    // 播放
    let isPlayOrPause = player.playOrPause(() => {
      goback();
      lineHigh();
    });

    // 播放进度
    console.log(">>>>", playProgressDom);

    let curLineTime = 0; // 歌词的文件的当前时间
    player.playCurrentTime((currentTime, durations) => {
      // currentTime 表示当前播放的时间
      if (currentLineNo == oLRC.ms.length) {
        return;
      }
      addtime(currentTime, durations);
      curLineTime = oLRC.ms && oLRC.ms[currentLineNo]['t'];
      if (parseFloat(curLineTime) <= currentTime) {
        //高亮当前行
        lineHigh();
        // 行数
        currentLineNo++;
      }
    });
  };

  // 暂停
  mutedDom.onclick = function (ev) {
    let isMuted = player.setMuted();
    console.log('>>', isMuted);
  }
  // 上一首
  selectPrevDom.onclick = function (ev) {
    player.selectPrevOrNext(ev.target.dataset.prev);
  }
  // 下一首
  selectNextDom.onclick = function (ev) {
    player.selectPrevOrNext(ev.target.dataset.next);
  }
};
