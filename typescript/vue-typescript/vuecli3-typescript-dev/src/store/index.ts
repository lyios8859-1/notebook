import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [
      {
        text: 'typescript vue1',
        compelete: false,
      },
       {
        text: 'typescript vue2',
        compelete: true,
      },
    ],
  },
  mutations: {
    updateTodoList(state, { index, content }) {
      state.todoList[index].text = content;
    },
    todoListCompelete(state, index) {
      state.todoList[index].compelete = true;
    },
  },
  actions: {
  },
  modules: {
  },
});
