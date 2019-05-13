<template>
  <div class="AddressBook scrollbar">
    <slot>
      <div class="list">
        <ul class="list_item">
          <li class="item list_item_a">
            <h3>A</h3>
            <ul class="item_content">
              <li>item_content1</li>
              <li>item_content2</li>
              <li>item_content3</li>
            </ul>
          </li>
          <li class="item list_item_b">
            <h3>B</h3>
            <ul class="item_content">
              <li>item_content1</li>
              <li>item_content2</li>
              <li>item_content3</li>
            </ul>
          </li>
          <li class="item list_item_c">
            <h3>C</h3>
            <ul class="item_content">
              <li>item_content1</li>
              <li>item_content2</li>
              <li>item_content3</li>
            </ul>
          </li>
          <li class="item list_item_d">
            <h3>D</h3>
            <ul class="item_content">
              <li>item_content1</li>
              <li>item_content2</li>
              <li>item_content3</li>
            </ul>
          </li>
          <li class="item list_item_e">
            <h3>E</h3>
            <ul class="item_content">
              <li>item_content1</li>
              <li>item_content2</li>
              <li>item_content3</li>
            </ul>
          </li>
          <li class="item list_item_f">
            <h3>F</h3>
            <ul class="item_content">
              <li>item_content1</li>
              <li>item_content2</li>
              <li>item_content3</li>
            </ul>
          </li>
          <li class="item">
            <h3>Test</h3>
            <ul class="item_content">
              <li>
                <p>{{JSON.stringify(listItem[0], null, 0)}}</p>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="list_index">
          <li>
            <h3>A</h3>
          </li>
          <li>
            <h3>B</h3>
          </li>
          <li>
            <h3>C</h3>
          </li>
          <li>
            <h3>D</h3>
          </li>
          <li>
            <h3>E</h3>
          </li>
          <li>
            <h3>F</h3>
          </li>
          <li>
            <h3>#</h3>
          </li>
        </ul>
      </div>
    </slot>
  </div>
</template>

<style lang="less" scoped>
.scrollbar {
  height: 447px; /* 不设置高度就是满屏*/
  overflow-y: auto;
}
.scrollbar::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
}
.scrollbar::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: #928e8e;
}
.scrollbar::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  background: #ededed;
}
.AddressBook {
  background: #eee;
  margin-top: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  margin: auto;
  border: 1px solid #ccc;
  font-size: 0;

  user-select: none;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  .list {
    position: relative;
    top: 0;
    left: 0;
    width: auto;
    height: 100%;
    font-size: 16px;
    .list_item {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .item {
        // background: yellow;
        h3 {
          background: #aaa;
        }
        .item_content {
          // background: #666;
          li {
            height: 32px;
            line-height: 32px;
            border-bottom: 1px solid #ddd;
            text-indent: 4px;
            &:hover {
              color: red;
            }
          }
          li:last-child {
            border-bottom: 0;
          }
        }
      }
      .item:last-child {
        margin-bottom: 0;
      }
    }
    .list_index {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 36px;
      li {
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>

<script>
import Vue from "vue";
import BookComponents from "./BookComponents.js";
// vue 组件是 vue扩展的实例子
export default Vue.extend(BookComponents);
</script>
