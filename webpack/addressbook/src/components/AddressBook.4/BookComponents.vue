<template>
  <div class="AddressBook">
    <div class="list scrollbar"
         ref="scrollbarRefs"
         v-if="listItem.length > 0">
      <!-- 内容列表 -->
      <ul class="list_item"
          @click.stop="getItem"
          ref="listItemRefs">
        <template v-for="(v, i) in listItem">
          <li class="item"
              :key="i"
              :class='"list_item_" + listItem[i].subject.toLocaleLowerCase()'>
            <h3>{{v.subject}}</h3>
            <ul class="item_content"
                v-if="v.content.length > 0">
              <template v-for="(vv, ii) in v.content">
                <li :key="ii"
                    :data-name="vv.name"
                    :data-tel="vv.tel">{{vv.name}}</li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </div>
    <div class="index">
      <!-- A B ... 索引 @touchstart="setScrollHeight" -->
      <ul class="list_index"
          @click="setScrollHeight">
        <template v-for="(v, i) in subjectIndex">
          <li :key="i">
            <h3 :data-subject="v"
                :class="[{active: i===isShow}]"
                :data-active="i">{{v}}</h3>
          </li>
        </template>
      </ul>
    </div>
    <div class="cover"
         v-if="isShowCover">
      <div class="message">
        <h3>标题</h3>
        <div class="message_center">
          {{tel}}
        </div>
        <div class="message_btn">
          <button @click="cancel">取消</button>
          <button @click="confirm">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.scrollbar {
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
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  height: 447px; /* 不设置高度就是满屏*/
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
            // cursor: pointer;
            &:hover {
              color: red;
              background: #fff;
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
  }
  .index {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    width: 36px;
    font-size: 16px;
    .list_index {
      li {
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: red;
        }
        .active {
          color: red;
        }
      }
    }
  }
  .cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.3);
    .message {
      position: absolute; /* 绝对定位 */
      top: 0; /* 0 */
      left: 0; /* 0 */
      bottom: 0; /* 0 */
      right: 0; /* 0 */
      width: 402px;
      height: 220px;
      margin: auto; /* 垂直、水平居中 */
      background: #fff;
      border-radius: 4px;
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
