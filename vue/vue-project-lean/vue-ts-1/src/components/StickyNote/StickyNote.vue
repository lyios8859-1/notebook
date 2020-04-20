<template>
  <div class="sticky-note__wraper">
    <header>
      <div class="sticky-note__img"><img src="./logo.jpeg" width="50" height="50"/></div>
      <div class="sticky-note__options">
        <div class="sticky-note__new" @click="newNote">新建</div>
        <div class="sticky-note__category">
          全部 <span>3</span>
          <ul class="options" @click="setCategory">
            <li data-index="-1">全部 <span>9</span></li>
            <li data-index="0">工作 <span>3</span></li>
            <li data-index="1">学习 <span>3</span></li>
            <li data-index="2">生活 <span>3</span></li>
          </ul>
        </div>
      </div>
    </header>
    <main>
      <section>
        <div class="header">
          <h3>titletitl</h3>
          <div>
            <span @click="editNote">编辑</span>
            <span class="empty"></span>
            <span @click="deleteNote">删除</span>
          </div>
        </div>
        <article>
          cont
        </article>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'StickyNote'
})
export default class StickyNote extends Vue {
  msg = 'StickyNote';

  newNote () {
    console.log('newNote');
  }

  setCategory (ev: any) {
    console.dir(ev.target.dataset.index);
  }

  editNote () {
    console.log('editNote');
  }

  deleteNote () {
    console.log('deleteNote');
  }
}
</script>

<style lang="less" scoped>
.sticky-note__wraper * {
  margin: 0;
  padding: 0;
}
.sticky-note__wraper {
  width: 100%;
  height: 100vh;
  border: 1px solid red;
}
header {
  display: flex;
  border: 1px solid #ddd;
  justify-content: space-between;
  padding: 0 20px;
}
.sticky-note__options {
  width: 300px;
  display: grid;
  grid-template-areas: "a a";
  grid-auto-columns: 1fr;
  justify-items: center;
  align-items: center;
}
.sticky-note__new {
  cursor: pointer;
}
.sticky-note__new,.sticky-note__category{
  letter-spacing: 2px;
}
.sticky-note__category ul.options{
  list-style: none;
  padding-top: 8px;
}
ul.options {
  position: absolute;
  display: none;
  background: #fff;
}
ul.options li {
  height: 32px;
  line-height: 32px;
}
.sticky-note__category:hover ul.options{
  display: block;
  color:rosybrown;
  cursor: pointer;
}
main {
  display: grid;
  grid-template-areas: "a a a";
  grid-gap: 6px;
}
section {
  height: 370px;
  border: 1px solid forestgreen;
}
.header {
  border: 1px solid blanchedalmond;
  display: flex;
  justify-content: space-between;
  padding: 0 10px
}
.empty {
  display: inline-block;
  width: 20px;
}
.header:hover span {
  cursor: pointer;
}
</style>
