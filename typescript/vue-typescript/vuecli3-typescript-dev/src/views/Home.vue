<template>
  <div class="home">
    <ToDo msg="Todo App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ToDo from '@/components/Todo/index.vue';

export default {
  name: 'Home',
  components: {
    ToDo,
  },
};
</script>
