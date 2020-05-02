const play_stop = document.querySelector('#play-stop');
const video = document.querySelector('#video');
const back_start = document.querySelector('#back-start');

const progress = document.querySelector('#progress');
const progressMove = progress.querySelector('.move');


play_stop.addEventListener('click', function (ev) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});
back_start.addEventListener('click', function (ev) {
  video.pause();
  video.currentTime = 0;
});

video.addEventListener('timeupdate', function (ev) {
  let scale = video.currentTime / video.duration;
  let maxWidth = progress.clientWidth;
  progressMove.style.width = maxWidth * scale + 'px';
});

video.addEventListener('ended', function (ev) {
  video.currentTime = 0;
});


