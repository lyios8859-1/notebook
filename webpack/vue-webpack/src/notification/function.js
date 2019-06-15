import Vue from "vue";
import Component from "./func-notification.js";

// 扩展
const NotificationCOnstructor = Vue.extend(Component);

// 多个组件使用数组存放
const instances = [];
// 每个组件 ID 唯一标识符
let componentId = 0;

// 删除组件实例
const removeInstance = (instance) => {
  if (!instance) {
    return;
  }
  const len = instances.length;
  console.log(">>>", len)
  const index = instances.findIndex(inst => instance.id === inst.id);
  instances.splice(index, 1);

  if (len <= 1) {
    return;
  }
  const removeHeight = instance.vm.height;
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = Number.parseInt(instances[i].verticalOffset) - removeHeight - 16;
  }
};

const notify = (options) => {

  const {
    autoClose,
    ...rest
  } = options;

  // 如果是服务端就返回，因为服务端没有DOM操作
  if (Vue.prototype.$isServer) {
    return;
  }
  const instance = new NotificationCOnstructor({
    // 接收 options 参数, 挂到组件的上，通过 props 传递
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 4000 : autoClose
    }
  });

  // 每个组件唯一 ID 标识符
  const id = `notification_${componentId++}`;
  instance.id = id;
  // 生成标签的 vm 对象
  instance.vm = instance.$mount();
  // 挂载到页面的 HTML 标签上显示出来
  document.body.appendChild(instance.vm.$el);
  // 显示出来

  instance.vm.visible = true;

  // 设置组件的样式
  let verticalOffset = 0; // 默认 0 最下

  if (instances.length > 0) {
    instances.forEach(item => {
      verticalOffset += item.$el.offsetHeight + 16;
    });
  }

  // 把第一个设置一下  verticalOffset 覆盖 0
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);

  // 关闭之后的操作
  instance.vm.$on("closed", (res) => {
    // 删除实例
    removeInstance(instance);

    // 删除 $el
    document.body.removeChild(instance.vm.$el);

    //删除 vm 对象
    instance.vm.$destroy();

  });

  // 关闭操作
  instance.vm.$on("close", (res) => {
    instance.vm.visible = false;
  });

  // return instance.vm; 如果需要外部也处理一下就返回出去
}

export default notify;