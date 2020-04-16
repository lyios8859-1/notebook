
class Tab {
  constructor (id) {
    this.main = document.querySelector(id);
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
    this.init();
  }

  init () {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = function () {
        console.log(this.index);
      };
    }
  }

  // 切换
  toggleTab () {

  }

  // 添加
  addTab () {

  }

  // 删除
  removeTab () {

  }

  // 编辑
}

new Tab('#tab');