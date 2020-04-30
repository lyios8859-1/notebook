import Vue from 'vue';
import Vuex from 'vuex';
import ActionHelper from './ActionHelper';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    actionHelper: new ActionHelper(),
    filterCategoryId: -1, // 过滤使用的分类 ID
    isShowConfirm: false, // 编辑,添加弹框
    editData: null // 存储编辑的数据信息, 不影响原有的数据信息
  },
  mutations: {
    showEditItemData (state: any, editItem: any) {
      state.editData = editItem;
      state.isShowConfirm = true;
    }
  },
  actions: {
  },
  modules: {
  }
});
