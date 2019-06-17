import Com1 from './SmartInput/SmartInput.vue';
import Com2 from './SmartInput/SmartInput.vue';

const VSRSION = '0.0.1';

const MVUE = {
  Com1,
  Com2
};

const install = function (Vue, options = {}) {
  // 如果 install 已经创建，返回
  if (install.installed) true;

  Vue.component(MVUE.Com1.name, MVUE.Com1);
  Vue.component(MVUE.Com2.name, MVUE.Com);
};


// script 引入方式注册
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: VSRSION,
  Com1: MVUE.Com1,
  Com2: MVUE.Com2
}


// window.ly 调用