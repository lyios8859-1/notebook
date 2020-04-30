<template>
  <main>
    <NoteItem v-for="(item, index) in filterDataList()" :key="index" :item="item"/>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NoteItem from './NoteItem.vue';
import ItemData from '../../model/ItemData';

@Component({
  name: 'NoteList',
  components: {
    NoteItem
  }
})
export default class NoteList extends Vue {
  dataList: ItemData[] = this.$store.state.actionHelper.dataList;

  filterDataList () {
    const cid = this.$store.state.filterCategoryId;
    if (cid === -1) {
      return this.dataList;
    } else {
      return this.dataList.filter((item: any) => {
        return item.categoryId === cid;
      });
    }
  }
};
</script>

<style scoped>
main {
  display: grid;
  grid-template-areas: "a a a";
  grid-gap: 6px;
}
</style>
