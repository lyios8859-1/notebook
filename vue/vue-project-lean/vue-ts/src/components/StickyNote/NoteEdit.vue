<template>
  <div class="note-edit__wraper" @click.stop="close">
    <div class="edit-content">
      <input type="text" v-model="item.title"/>
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
  get item () {
    return new ItemData(-1, -1, '', '');
  }

  close (ev: any): void {
    if (ev.target.className.trim() === 'note-edit__wraper') {
      this.$store.state.isShowConfirm = false;
    }
  }
};
</script>

<style scoped>
.note-edit__wraper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, .5);
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
</style>
