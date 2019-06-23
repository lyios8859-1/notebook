function reomveImgSrc() {
  let imgs = document.getElementsByTagName('img');
  let imgsArr = [].slice.call(imgs);
  imgsArr.forEach(el => {
    el.removeAttribute('src');
  });
}
reomveImgSrc();

