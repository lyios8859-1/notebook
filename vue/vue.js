(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global = global || self, global.Vue = factory());
})(this, function () {
  function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
  }

  // 默认策略
  let defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };

  // 自定义策略
  var config = ({
    optionMergeStrategies: Object.create(null)
    // TODO
  });
  // strats下会挂在很多东西
  var strats = config.optionMergeStrategies;

  // 自定义策略处理 el
  {
    strats.el = strats.propsData = function (parent, child, vm, key) {
      if (!vm) {
        console.warn(
          "option \"" + key + "\" can only be used during instance " +
          'creation with the `new` keyword.'
        );
      }
      return defaultStrat(parent, child)
    };
  }

  // 自定义策略处理 data
  strats.data = function (
    parentVal,
    childVal,
    vm
  ) {
    return function mergedInstanceDataFn() {}
  };

  function mergeOptions(
    parent, // 当前组件的父组件
    child, // 当前组件所传递的对象 new Vue({...})
    vm // 组件本身实例
  ) {
    /*
      这一部分是组件的规范检测
      {
        checkComponents(child);
      }

      if (typeof child === 'function') {
        child = child.options;
      }

      normalizeProps(child, vm);
      normalizeInject(child, vm);
      normalizeDirectives(child);
    */

    let options = {};
    let key;
    for (key in parent) { // components, directives, filters
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) { // 已经存在的属性就不再次处理
        mergeField(key); // 自定义策略的处理核心
      }
    }
    function mergeField(key) {
      // strats 自定义策略的集中 存在使用自定义策略,不存在就使用默认配置
      let strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);

    }
    return options
  }

  function resolveConstructorOptions(Ctor) {
    let options = Ctor.options;
    return options
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      let vm = this;
      // 处理传递的配置项
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
  }

  function Vue(options) {
    if (!(this instanceof Vue)) {
      console.warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }


  let ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ];
  Vue.options = Object.create(null);
  // 创建Vue的静态属性 比如,components: {}, directives: {}, filters: {}, 扩展属性
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  initMixin(Vue);

  return Vue;
})

let vue = new Vue({
  el: '#app',
  data: {
    msg: 'Hello World'
  },
  components: {}
});
console.log(vue.$options)