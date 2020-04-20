<template>
  <section>
    <div class="header">
      <h3>{{item.title}}</h3>
      <div class="btngroup">
        <span @click="editNote">编辑</span>
        <span class="empty"></span>
        <span @click="deleteNote">删除</span>
      </div>
    </div>
    <div class="timer-container">
      <div class="timer">{{item.createTime}}</div>
      <div class="category">分类: {{getCategory(item.categoryId)}}</div>
    </div>
    <article>
      {{item.content}}
    </article>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ItemData from '../../model/ItemData';

@Component({
  name: 'NoteList'
})
export default class NoteList extends Vue {
  @Prop() item!: ItemData;
  getCategory (categoryId: number) {
    return this.$store.state.actionHelper.getCategory(categoryId);
  }

  editNote (): void {
    console.log('editNote');
    this.$store.state.isShowConfirm = true;
  }

  deleteNote (): void {
    if (window.confirm(`您去确定要删除[${this.item.title}]笔记吗?`)) {
      this.$store.state.actionHelper.deleteNote(this.item.id);
    }
  }
};
</script>

<style scoped>
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

.timer-container {
  display: flex;
  justify-content: space-evenly;
  color: #ccc;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
}

.btngroup {
  display: flex;
  justify-content: center;
  align-items: center;
}

article {
  padding: 10px;
}
.empty {
  display: inline-block;
  width: 20px;
}
.header:hover span {
  cursor: pointer;
}
</style>
