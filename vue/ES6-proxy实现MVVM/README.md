# ES6 Proxy 实现简单的 MVVM

> `Proxy` 是 ES6 新的 API, 它可以对所需要操作的目标对象之前做一层"拦截"处理,外部对该目标对象的访问，都必须先通过
> 这层拦截,这样就可以对外部的访问进行过滤和改写.类似于 ES5 中的 `Object.defineProperty()`.

简单说一下 `new Proxy(param1, param2)`

```javascript
// 目标对象
  let targetObj = {};
  const proxyObj = new Proxy(targetObj, {
    get(target, key, receiver) {
      console.log(`getting ${key}`);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log(`setting ${key}`);
      return Reflect.set(target, key, value, receiver);
    }
  });

  // 访问操作目标对象
  // 赋值
  proxyObj.count = 1; // setting count
  // 获取
  proxyObj.count // getting count
```

PS: `new Proxy(param1, param2)` 中 param1 表示需要拦截的对象, param2 表示用来定制拦截行为的对象.

## MVVM 的简单页面, 类似与 Vue

```html
 <div id="app">
    <h1>人类：{{people}}</h1>
    <h2>组成部分：</h2>
    <ul>
      <li>{{person.hande}}</li>
      <li>{{person.foot}}</li>
      <li>{{person.breast}}</li>
    </ul>
    <h2>描述：</h2>
    <p>{{describe}}</p>
    <p>年龄：{{age}}</p>
    <input placeholder="人呐" v-module="people" />
  </div>
  <script>
  const mvvm = new Mvvm({
    el: '#app',
    data: {
      people: '人类这种生物',
      person: {
        hande: '机智的头部',
        foot: '行走的脚',
        breast: '坦荡的胸'
      },
      describe: '人呐就那样吧,什么都明白了...',
      prvAge: 10,
      nowAge: 1
    },
    computed: {
      age() {
        return this.nowAge + this.prvAge
      }
    }
  })
  </script>
```


