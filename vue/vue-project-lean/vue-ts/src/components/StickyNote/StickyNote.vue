<template>
  <div class="sticky-note__wraper">
    <header>
      <div class="sticky-note__img"><img src="./logo.jpeg" width="50" height="50"/></div>
      <div class="sticky-note__options">
        <div class="sticky-note__new" @click="addNote">新建</div>
        <div class="sticky-note__category" @click.stop="doFilterCategoryId">
          全部 <span>{{getCategoryNoteNum(-1)}}</span>
          <ul class="options">
            <li data-cid="-1">全部 <span>{{getCategoryNoteNum(-1)}}</span></li>
            <li data-cid="0">工作 <span>{{getCategoryNoteNum(0)}}</span></li>
            <li data-cid="1">学习 <span>{{getCategoryNoteNum(1)}}</span></li>
            <li data-cid="2">生活 <span>{{getCategoryNoteNum(2)}}</span></li>
          </ul>
        </div>
      </div>
    </header>
    <div class="note-conte__container">
      <NoteList/>
    </div>

    <NoteEdit v-if="$store.state.isShowConfirm"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import NoteList from './NoteList.vue';
import NoteEdit from './NoteEdit.vue';
import ItemData from '../../model/ItemData';

@Component({
  name: 'StickyNote',
  components: {
    NoteList,
    NoteEdit
  }
})
export default class StickyNote extends Vue {
  msg = 'StickyNote';

  addNote () {
    console.log('addNote');
    this.$store.state.editData = new ItemData(-1, 0); // 为了判断是编辑还是新增
    this.$store.state.isShowConfirm = true;
  }

  getCategoryNoteNum (cid: any): number {
    const dataList = this.$store.state.actionHelper.dataList;
    if (cid === -1) {
      return dataList.length;
    } else {
      return dataList.filter((ele: any) => {
        return ele.categoryId === cid;
      }).length;
    }
  }

  doFilterCategoryId (ev: any): void {
    this.$store.state.filterCategoryId = ev.target.dataset.cid * 1;
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
  height: 100%;
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
ul.options li:hover {
  color: red;
}
.sticky-note__category:hover ul.options{
  display: block;
  color:rosybrown;
  cursor: pointer;
}

</style>
