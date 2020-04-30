<template>
  <div class="note-edit__wraper">
    <div class="edit-content">
      <div class="editor-top">
        <input
          class="editor-title form-control"
          type="text"
          placeholder="标题"
          v-model="item.title"
        />
        <div class="dropdown select-category">
          <span class="category">{{getCategory(item.categoryId)}}</span>
          <ul class="dropdown-menu">
            <li @click="setCategoryId(0)">
              <a>工作</a>
            </li>
            <li @click="setCategoryId(1)">
              <a>生活</a>
            </li>
            <li @click="setCategoryId(2)">
              <a>学习</a>
            </li>
          </ul>
        </div>
        <ul class="tools">
          <li @click.stop="save">保存</li>
          <li class="note-edit__colse" @click.stop="close">关闭</li>
        </ul>
      </div>
      <textarea class="text-content form-control" placeholder="内容" v-model="item.content"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ItemData from '../../model/ItemData';

@Component({
  name: 'NoteEdit'
})
export default class NoteEdit extends Vue {
  created (): void {
    // 获取副本信息,修改时不影响原来的信息
    this.item = this.$store.state.editData;
  }

  item: ItemData = new ItemData(-1, 0, '', '');

  setCategoryId (categoryId: number): void {
    this.item.categoryId = categoryId;
  }

  getCategory (categoryId: number) {
    return this.$store.state.actionHelper.getCategory(categoryId);
  }

  close (ev: any): void {
    if (ev.target.className.trim() === 'note-edit__wraper' || ev.target.className === 'note-edit__colse') {
      this.$store.state.isShowConfirm = false;
    }
  }

  save () {
    if (this.item && this.item.categoryId > -1 && this.item.title.trim().length > 0 && this.item.content.trim().length > 0) {
      // 表明是新增
      if (this.item.id <= -1) {
        this.$store.state.actionHelper.addNote(this.item);
      } else {
        this.$store.state.actionHelper.editNote(this.item);
      }
      this.$store.state.filterCategoryId = this.item.categoryId;
      this.$store.state.isShowConfirm = false;
    } else {
      alert('输入不能为空');
    }
  }
}
</script>

<style scoped>
.note-edit__wraper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
}
.edit-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 400px;
  background: #fff;
  border: 1px solid #ddd;
}

.editor-top{
  position: relative;
  margin-bottom: 10px;
  width: 100%;
}
.edit-content .editor-top .tools {
  position: absolute;
  top: -4px;
  right: 0;
  list-style: none;
}

.edit-content .editor-top .tools > li {
  width: 40px;
  height: 20px;
  float: left;
  opacity: 0.5;
}

.edit-content .editor-top .tools > li:hover {
  cursor: pointer;
  opacity: 1;
}
.edit-content .editor-top .editor-title {
  width: calc(100% - 190px);
  padding-left: 12px;
  height: 32px;
}
#edit-doodle .editor-title,
#edit-markdown .editor-title {
  width: calc(100% - 60px);
}
.edit-content .select-category {
  position: absolute;
  right: 116px;
  top: 6px;
  border: 1px solid #aaa;
  padding: 3px;
  border-radius: 4px;
}
.edit-content .select-category .dropdown-menu {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 32px;
}

.dropdown-menu {
  display: none;
}
.select-category:hover .dropdown-menu {
  display: block;
}

.dropdown-menu li {
  line-height: 32px;
  height: 32px;
  cursor: pointer;
}
.dropdown-menu li:hover {
  color: red;
}
.edit-content .text-content {
  width: 100%;
  height: 350px;
  font-size: 12px;
  resize: none;
  margin: 0;
  padding: 12px;
  box-sizing: border-box;
}
</style>
