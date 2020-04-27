<template>
  <div style="width:400px;margin:100px auto;">
    <div class="con">
      <div class="same_module">
        <div class="title up" @click="slide($event)">
          <span>标题一</span>
          <i class="arrow"></i>
        </div>
        <div class="detail" style="height:0">
          <div class="inner">
            <p>这是一段文本</p>
            <p>这是一段文本</p>
            <p>这是一段文本</p>
            <p>这是一段文本</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  methods: {
    slide: function(event) {
      let curTarget = event.currentTarget,
        containsCurClass = curTarget.classList.contains("up"),
        nextSibling = curTarget.nextSibling;
      while (nextSibling.nodeType == 3 && /\s/.test(nextSibling.nodeValue)) {
        nextSibling = nextSibling.nextSibling;
      }
      let detailScrollHeight = nextSibling.scrollHeight;
      if (containsCurClass) {
        curTarget.classList.remove("up");
        this.toggleSlide(nextSibling, detailScrollHeight, "500");
      } else {
        curTarget.classList.add("up");
        this.toggleSlide(nextSibling, 0, "500");
      }
    },
    toggleSlide: function(dom, height, time) {
      dom.style.transition = "height " + time + "ms";
      dom.style.height = height + "px";
    }
  }
};
</script>
<style scoped>
.same_module {
  border: 1px solid grey;
}
.title {
  color: #fff;
  height: 30px;
  line-height: 30px;
  background: blue;
  padding: 0 10px;
  cursor: pointer;
  overflow: hidden;
}
.title span {
  vertical-align: middle;
}
.title .arrow {
  float: right;
}
.detail {
  overflow: hidden;
}
.detail .inner {
  padding: 5px 10px;
  background: #808080;
  color: #fff;
}
.detail p {
  line-height: 26px;
}
.arrow {
  display: inline-block;
  border-top: 2px solid;
  border-right: 2px solid;
  width: 8px;
  height: 8px;
  border-color: #ea6000;
  transform: rotate(315deg);
  position: relative;
  transition: all 0.5s ease-in;
  transform-origin: center center;
  top: 50%;
  margin-top: -10px;
}
.up .arrow {
  transform: rotate(135deg);
}
</style>