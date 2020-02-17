<template>
  <div id="app">
    <TodoList msg="Hello, Jerry"/>
  </div>
</template>

<script>
import TodoList from './containers/TodoList/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style lang="stylus">
* {
  margin: 0;
  padding: 0;
  body, html  {
    background: #cdcdcd;
  }
}
</style>
