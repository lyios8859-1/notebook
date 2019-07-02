
// 控制播放暂停的变量，默认暂停 false
let isPlayOrPause = false;
/**
 * 播放/暂停
 */
function playOrPause(audio) {
  if (!isPlayOrPause) {
    // 播放
    palyMusic(audio);
    // 暂停
    isPlayOrPause = true;
  } else {
    // 暂停
    pauseMusic(audio);
    // 暂停
    isPlayOrPause = false;
  }
}
/**
 * 播放
 */
function palyMusic(audio) {
  audio.play();
}

/**
 * 暂停
 */
function pauseMusic(audio) {
  audio.pause();
}


function isMuted(audio) {
  audio.muted = !audio.muted;
}

// 创建一个播放器
function createPlayer(playSrc) {
  const audio = document.createElement('audio');
  audio.setAttribute('src', playSrc);
  return audio;
}


let mp3Container = ['./mp3/1.mp3', './mp3/2.mp3', './mp3/3.mp3', './mp3/4.mp3', './mp3/5.mp3'];
// 控制那一首的索引
let selectIndex = 0;

// 上一首，下一首
function selectPrevOrNext(type, audioDom) {
  if (type === 'prev') {
    console.log('上一首');
    selectIndex = (selectIndex - 1 + mp3Container.length) % mp3Container.length;
  } else if (type === 'next') {
    console.log('下一首');
    selectIndex = (selectIndex + 1 + mp3Container.length) % mp3Container.length;
  }
  console.log('index>>', selectIndex);
  audioDom.setAttribute('src', mp3Container[selectIndex]);
  palyMusic(audioDom);
}
window.onload = function () {
  const playDom = document.querySelector('#palyOrPause');
  const audioDom = document.querySelector('#audio');
  const mutedDom = document.querySelector('#isMuted');
  const selectPrevDom = document.querySelector('#prev');
  const selectNextDom = document.querySelector('#next');
  playDom.onclick = function (ev) {
    playOrPause(audioDom);
  };
  mutedDom.onclick = function (ev) {
    isMuted(audioDom);
  }
  // 上一首
  selectPrevDom.onclick = function (ev) {
    selectPrevOrNext(ev.target.dataset.prev, audioDom);
  }
  // 下一首
  selectNextDom.onclick = function (ev) {
    selectPrevOrNext(ev.target.dataset.next, audioDom);
  }
};