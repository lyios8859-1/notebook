<template>
  <transition name="fade"
              @after-leave="afterLeave"
              @after-enter="afterEnter">
    <div class="nitification"
         :style="style"
         v-show="visible"
         @mouseenter="clearTimer"
         @mouseleave="createTimer">
      <span class="content">{{content}}</span>
      <a class="btn"
         @click.prevent.stop="handleClose">{{btn}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Notification",
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: "关闭"
    }
  },
  data() {
    return {
      visible: true // 默认显示
    };
  },
  computed: {
    style() {
      // 默认情况下没有样式
      return {};
    }
  },
  methods: {
    handleClose() {
      const _self = this;
      _self.$emit("close", 1);
    },
    afterLeave() {
      const _self = this;
      _self.$emit("closed", "d");
    },
    afterEnter() {},
    createTimer() {},
    clearTimer() {}
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  background: red;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  background: yellow;
}

.nitification {
  width: 500px;
  height: 100px;
  color: #fff;
  background: blue;
}
</style>
