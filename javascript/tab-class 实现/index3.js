let that;

class Tab {
  constructor (id) {
    that = this;
    this.main = document.querySelector(id);
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
    this.add = this.main.querySelector('.tabadd');
    this.ul = this.main.querySelector('.firstnav ul:first-child')
    this.init();
  }

  init () {
    this.add.onclick = this.addTab;
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
    }
  }

  clearClass () {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }

  // 切换
  toggleTab () {
    if (this.className) return;
    that.clearClass();
    this.className = 'liactive';
    that.sections[this.index].className = 'conactive';
  }

  // 添加
  addTab () {
    const li = '<li class="liactive"><span>tab1</span><span class="icon-guanbi">x</span></li>';
    that.ul.insertAdjacentHTML('beforeend', li);
  }

  // 删除
  removeTab () {

  }

  // 编辑
}

new Tab('#tab');