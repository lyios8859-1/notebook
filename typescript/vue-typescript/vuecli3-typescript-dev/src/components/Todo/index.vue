<template>
  <div class="todo-page">
    <h1>{{ msg }}</h1>
    <ul v-if="list.length > 0">
      <TodoItem
        v-for="(item, index) in list" :key="index"
        :item="item"
        :index="index"
        :edit-index="editIndex"
        @on-save="onSave"
        @on-edit="onEdit"
        @on-cancel="onCancel"
        @on-complete="onComplete"
      ></TodoItem>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import TodoItem from './todo-item';

interface List {
  text: string;
  compelete: boolean;
}

@Component({
  name: 'TodoPage',
  components: {
    TodoItem,
  },
})
export default class TodoPage extends Vue {
  @State('todoList') private list!: List[];
  @Mutation('updateTodoList') private updateList!: any;
  @Mutation('todoListCompelete') private listCompelete!: any;

  @Prop() private msg!: string;
  private editIndex: number = -1; // -1 表示没有编辑

  private onSave({index, content}: {index: number, content: string}) {
    this.updateList({index, content});
    this.onCancel(false);
  }
  private onEdit(index: number) {
    this.editIndex = index;
  }
  private onCancel(mark: boolean) {
    this.editIndex = -1;
  }
  private onComplete(index: number) {
    this.listCompelete(index);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
