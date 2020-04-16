let that;

class Tab {
  constructor (id) {
    that = this;
    this.main = document.querySelector(id);
    this.add = this.main.querySelector('.tabadd');
    this.ul = this.main.querySelector('.firstnav ul:first-child');
    this.fsection = this.main.querySelector('.tabscon');
    this.init();
  }
  
  updateNode () {
    this.lis = this.main.querySelectorAll('li');
    this.remove = this.main.querySelectorAll('.icon-guanbi');
    this.sections = this.main.querySelectorAll('section');
  }
  
  init () {
    this.updateNode();
    this.add.onclick = this.addTab;
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.remove[i].onclick = this.removeTab
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
    that.clearClass();
    const li = '<li class="liactive"><span>tab1</span><span class="icon-guanbi">x</span></li>';
    that.ul.insertAdjacentHTML('beforeend', li);

    const section = `<section class="conactive">内容${Math.random()}</section>`;
    that.fsection.insertAdjacentHTML('beforeend', section);
    that.init();
  }

  // 删除
  removeTab (e) {
    e.stopPropagation();
    let index = this.parentNode.index
    that.lis[index].remove();
    that.sections[index].remove();
    that.init();

    // 当删除选中的前一个也选中
    index--;
    that.lis[index] && that.lis[index].click();
  }

  // 编辑
}

new Tab('#tab');