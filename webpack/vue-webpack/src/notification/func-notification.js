import Notification from "./notification.vue";

// 这里可以覆盖 notification.vue 中的一下属性和方法，同时也可以继承下来
export default {
  // 扩展（继承）原有 Notification 的方法、属性
  extends: Notification,
  computed: {
    // 覆盖 notification.vue 中的 style
    style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  data() {
    return {
      verticalOffset: 0,
      autoClose: 4000,
      height: 0,
      visible: false  // 解决 afterEnter 需要触发
    }
  },
  mounted() {
    this.createTimer();
  },
  methods: {
    createTimer() {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false;
        }, this.autoClose);
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    afterEnter() {
      // 手动关闭是处理
      this.height = this.$el.offsetHeight;
    }
  },
  beforeDestroy() {
    this.clearTimer();
  }
}