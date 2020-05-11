class AudioPlayer {
  constructor(mp3List) {
    // 控制播放暂停的变量，默认暂停 false
    this.isPlayOrPause = false;
    this.audio = null;
    // 控制那一首的索引
    this.selectIndex = 0;

    this.mp3Container = mp3List;
  }
  /**
   * 播放/暂停
   */
  playOrPause() {
    if (!this.isPlayOrPause) {
      // 播放
      this.palyMusic((data) => {
        console.log('当前歌曲播放完毕', data);
        // 播放下一首
        this.selectPrevOrNext('next', this.audio);
      });
      // 暂停
      this.isPlayOrPause = true;
    } else {
      // 暂停
      this.pauseMusic(this.audio);
      // 播放
      this.isPlayOrPause = false;
    }
    return this.isPlayOrPause;
  }
  /**
   * 播放
   */
  palyMusics() {
    this.init();
    this.audio.play();
  }

  init() {
    // 这两个顺序不能反了
    this.audio = new Audio();
    this.initPlayer(this.mp3Container[0]);
  }
  // 回调函数判断是否播放玩一首
  palyMusic(callback) {
    this.palyMusics(this.audio);
    /*判断声音(音乐)是否播放完成，播放完成之后执行回调函数*/
    this.audio.addEventListener('ended', () => {
      callback && callback('over');
    }, false);
  }

  /**
   * 暂停
   */
  pauseMusic() {
    this.audio.pause();
  }

  // 是否静音
  isMuted() {
    return this.audio.muted = !this.audio.muted;
  }

  // 创建一个播放器
  initPlayer(playSrc) {
    this.audio.src = playSrc;
  }

  // 上一首，下一首
  selectPrevOrNext(type) {
    let mp3Count = this.mp3Container.length;
    if (type === 'prev') {
      console.log('上一首');
      this.selectIndex = (this.selectIndex - 1 + mp3Count) % mp3Count;
    } else if (type === 'next') {
      console.log('下一首');
      this.selectIndex = (this.selectIndex + 1 + mp3Count) % mp3Count;
    }
    console.log('index>>', this.selectIndex);
    if (!this.audio) {
      this.palyMusics();
    }
    this.audio.src = this.mp3Container[this.selectIndex];

    this.palyMusic((data) => {
      console.log('当前歌曲播放完毕', data);
      // 播放下一首
      this.selectPrevOrNext('next', this.audio);
    });
  }

  // 歌词处理滚动需要监听 ontimeupdate
  lrcScroll(callback) {
    let currentTime = '';
    this.audio.ontimeupdate = () => {
      currentTime = this.audio.currentTime;
      callback && callback(currentTime);
    };
  }
}


/**
 * console.log('当前播放时间', audio.currentTime); //当前播放时间
  console.log('总时长：', audio.duration) //总时间


  https://blog.csdn.net/qq_34182808/article/details/84347393
*/