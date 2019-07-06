class AudioPlayer {
  constructor() {
    // 控制播放暂停的变量，默认暂停 false
    this.isPlayOrPause = false;
    this.audio = new Audio();
    // 控制那一首的索引
    this.selectIndex = 0;

    this.mp3Container = ['./mp3/0.mp3', './mp3/1.mp3', './mp3/2.mp3', './mp3/3.mp3', './mp3/4.mp3', './mp3/5.mp3'];
    this.audio.src = this.mp3Container[0];
  }

  /**
   * 播放/暂停
   */
  playOrPause(callback) {
    if (!this.isPlayOrPause) {
      // 播放
      this.palyMusic((data) => {
        console.log('当前歌曲播放完毕', data);
        // 播放下一首
        this.selectPrevOrNext('next');
        callback && callback();
      });
      // 暂停
      this.isPlayOrPause = true;
    } else {
      // 暂停
      this.pauseMusic();
      // 播放
      this.isPlayOrPause = false;
    }
    return this.isPlayOrPause;
  }

  // 回调函数判断是否播放完一首
  palyMusic(callback) {
    this.palyMusicing();
    // 判断声音(音乐)是否播放完成，播放完成之后执行回调函数
    this.audio.addEventListener('ended', () => {
      callback && callback('over');
    }, false);
  }

  setCurrentTime(percnet) {
    // p 表示点击所在的比率 （p * this.audio.duration）等于当前时间
    this.audio.currentTime = percnet * this.audio.duration;
    this.palyMusicing();
  }

  /**
   * 播放
   */
  palyMusicing() {
    this.audio.play();
  }

  /**
   * 暂停
   */
  pauseMusic() {
    this.audio.pause();
  }

  // 是否静音
  setMuted() {
    return this.audio.muted = !this.audio.muted;
  }

  // 设置播放的音乐文件地址
  setSrc(src) {
    this.audio.src = src;
  }

  // 上一首，下一首
  selectPrevOrNext(type, callback) {
    let mp3Count = this.mp3Container.length;

    if (type === 'prev') {
      console.log('上一首');
      this.selectIndex = (this.selectIndex - 1 + mp3Count) % mp3Count;
    } else if (type === 'next') {
      console.log('下一首');
      this.selectIndex = (this.selectIndex + 1 + mp3Count) % mp3Count;
    }
    console.log('index>>', this.selectIndex, this.mp3Container[this.selectIndex]);

    callback && callback(this.selectIndex);
    this.setSrc(this.mp3Container[this.selectIndex]);
    this.palyMusic();
  }

  // 歌词处理滚动需要监听 ontimeupdate
  playCurrentTime(callback) {
    // 播放的当前时间，单位为秒
    let currentTime = '';
    let duration = this.getDuration();
    this.audio.ontimeupdate = () => {
      currentTime = this.audio.currentTime;
      callback && callback(currentTime, duration);
    };
  }


  // 监听是否音乐加载完成,才获取时间
  loadComplate(callback) {

  }

  // 获取总时长
  getDuration() {
    return this.audio.duration;
  }

}


/**
  // 监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
  audio.addEventListener("canplay", function(){
    document.getElementById('audio_length_total').innerHTML=transTime(audio.duration);
  });
  https://blog.csdn.net/qq_34182808/article/details/84347393
*/