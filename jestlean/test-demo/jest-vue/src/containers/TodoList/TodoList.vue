<template>
  <div class="hello">
    <header>ToDoList={{msg}}</header>
  </div>
</template>

<script>
export default {
  name: 'ToDoList',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
