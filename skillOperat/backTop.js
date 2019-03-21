// 直接调用scorllToTop();
const scorllToTop = _ => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  if (top > 0) {
    window.requestAnimationFrame(scorllToTop);
    window.scrollTo(0, top - top / 8);
  }
};
