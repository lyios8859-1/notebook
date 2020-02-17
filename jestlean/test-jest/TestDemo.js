const testTimer = (callback) => {
  setTimeout(() => {
    callback && callback();
    setTimeout(() => {
      callback && callback();
    }, 6000);
  }, 6000);
}

export {
  testTimer
};