# 常用的设计模式学习

## 1、工厂模式

> 不暴露对象创建的具体逻辑，而是将具体的逻辑封装在一个函数中（各种对象的创建都在其中处理），那么这个函数就视为一个工厂

**根据抽象程度分**：

- 简单工厂
- 工厂方法
- 抽象工厂

**思考**：需要 `new` 对象时，考虑是否需要使用工厂模式

### 简单工厂模式（又称静态工厂模式）

```javascript
// UserFactory 就看作是工厂，只需要传递superAdmin, admin, user可选参数中的一个即可获取对应的实例对象
let UserFactory = function(role) {
  function User(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  switch (role) {
    case "superAdmin":
      return new User({
        name: "超级管理员",
        viewPage: ["首页", "通讯录", "发现页", "应用数据", "权限管理"]
      });
      break;
    case "admin":
      return new User({
        name: "管理员",
        viewPage: ["首页", "通讯录", "发现页", "应用数据"]
      });
      break;
    case "user":
      return new User({
        name: "普通用户",
        viewPage: ["首页", "通讯录", "发现页"]
      });
      break;
    default:
      throw new Error("参数错误, 可选参数:superAdmin、admin、user");
  }
};

//调用
let superAdmin = UserFactory("superAdmin");
let admin = UserFactory("admin");
let normalUser = UserFactory("user");
```

PS: 确定很明显，就是如果创建的对象数量很多，就需要修改该工厂函数的代码

### 工厂模式方法

> 工厂方法模式的实质是将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类。

```javascript
//安全模式创建的工厂方法函数 (防止忘记使用 new 关键字创建实例对象)
let UserFactory = function(role) {
  if (this instanceof UserFactory) {
    var s = new this[role]();
    return s;
  } else {
    return new UserFactory(role);
  }
};

//工厂方法函数的原型中设置所有对象的构造函数
UserFactory.prototype = {
  constructor: UserFactory,
  SuperAdmin: function() {
    this.name = "超级管理员";
    this.viewPage = ["首页", "通讯录", "发现页", "应用数据", "权限管理"];
  },
  Admin: function() {
    this.name = "管理员";
    this.viewPage = ["首页", "通讯录", "发现页", "应用数据"];
  },
  NormalUser: function() {
    this.name = "普通用户";
    this.viewPage = ["首页", "通讯录", "发现页"];
  }
  // @. 添加其他代码
};

//调用
let superAdmin = UserFactory("SuperAdmin");
let admin = UserFactory("Admin");
let normalUser = UserFactory("NormalUser");
```

### 抽象工厂模式

> 简单工厂模式和工厂方法模式都是直接生成实例，但是抽象工厂模式不同，抽象工厂模式并不直接生成实例， 而是用于对产品类簇的创建。在抽象工厂中，类簇一般用父类定义，并在父类中定义一些抽象方法，再通过抽象工厂让子类继承父类。因此抽象工厂其实是重写子类继承父类的方法。实现抽象类时，如果子类没有重写抽象类的方法就会调用抽象类中的方法报错。

```javascript
// 抽象类（父类）
let WechatUser = function() {};
WechatUser.prototype = {
  getName: function() {
    return new Error("抽象方法不能调用");
  }
};

// 这里如果子类没有重写父类的getName方法就会调用该抽象类中的方法报错
```

```javascript
// 定义抽象工厂方法
// 抽象工厂方法，AccountAbstractFactory，该方法在参数中传递子类和父类，在方法体内部实现了子类对父类的继承。对抽象工厂方法添加抽象类的方法我们是通过点语法进行添加的。
let AccountAbstractFactory = function(subType, superType) {
  //判断抽象工厂中是否有该抽象类
  if (typeof AccountAbstractFactory[superType] === "function") {
    //缓存类
    function F() {}
    //继承父类属性和方法
    F.prototype = new AccountAbstractFactory[superType]();
    //将子类的constructor指向子类
    subType.constructor = subType;
    //子类原型继承父类
    subType.prototype = new F();
  } else {
    throw new Error("抽象类不存在!");
  }
};

//微信用户抽象类
AccountAbstractFactory.WechatUser = function() {
  this.type = "wechat";
};
AccountAbstractFactory.WechatUser.prototype = {
  getName: function() {
    return new Error("抽象方法不能调用");
  }
};

//qq用户抽象类
AccountAbstractFactory.QqUser = function() {
  this.type = "qq";
};
AccountAbstractFactory.QqUser.prototype = {
  getName: function() {
    return new Error("抽象方法不能调用");
  }
};

//新浪微博用户抽象类
AccountAbstractFactory.WeiboUser = function() {
  this.type = "weibo";
};
AccountAbstractFactory.WeiboUser.prototype = {
  getName: function() {
    return new Error("抽象方法不能调用");
  }
};

// 普通的子类，如下的三个类作为子类通过抽象工厂方法实现继承。特别需要注意的是，调用抽象工厂方法后不要忘记重写抽象方法，否则在子类的实例中调用抽象方法会报错。
//普通微信用户子类
function UserOfWechat(name) {
  this.name = name;
  this.viewPage = ["首页", "通讯录", "发现页"];
}
//抽象工厂实现WechatUser类的继承
AccountAbstractFactory(UserOfWechat, "WechatUser");
//子类中重写抽象方法
UserOfWechat.prototype.getName = function() {
  return this.name;
};

//普通qq用户子类
function UserOfQq(name) {
  this.name = name;
  this.viewPage = ["首页", "通讯录", "发现页"];
}
//抽象工厂实现QqUser类的继承
AccountAbstractFactory(UserOfQq, "QqUser");
//子类中重写抽象方法
UserOfQq.prototype.getName = function() {
  return this.name;
};

//普通微博用户子类
function UserOfWeibo(name) {
  this.name = name;
  this.viewPage = ["首页", "通讯录", "发现页"];
}
//抽象工厂实现WeiboUser类的继承
AccountAbstractFactory(UserOfWeibo, "WeiboUser");
//子类中重写抽象方法
UserOfWeibo.prototype.getName = function() {
  return this.name;
};

// 对这三个类实例化：检测抽象工厂方法是实现了类簇的管理
//实例化微信用户
let wechatUserA = new UserOfWechat("微信小李");
console.log(wechatUserA.getName(), wechatUserA.type); //微信小李 wechat
let wechatUserB = new UserOfWechat("微信小王");
console.log(wechatUserB.getName(), wechatUserB.type); //微信小王 wechat

//实例化qq用户
let qqUserA = new UserOfQq("QQ小李");
console.log(qqUserA.getName(), qqUserA.type); //QQ小李 qq
let qqUserB = new UserOfQq("QQ小王");
console.log(qqUserB.getName(), qqUserB.type); //QQ小王 qq

//实例化微博用户
let weiboUserA = new UserOfWeibo("微博小李");
console.log(weiboUserA.getName(), weiboUserA.type); //微博小李 weibo
let weiboUserB = new UserOfWeibo("微博小王");
console.log(weiboUserB.getName(), weiboUserB.type); //微博小王 weibo
```

**抽象工厂的作用**:它不直接创建实例，而是通过类的继承进行类簇(各种类，将一些私有的、具体的子类组合在一个公共的、抽象的超类下面)的管理。抽象工厂模式一般用在多人协作的超大型项目中，并且严格的要求项目以面向对象的思想进行完成。

## ES6 语法实现

### ES6 重写简单工厂模式

使用 ES6 重写简单工厂模式时，不再使用*构造函数*创建对象，而是使用 `class` 的新语法，并使用 `static` 关键字将简单工厂封装到 `User` 类的静态方法中:

```javascript
//User类
class User {
  //构造器
  constructor(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  //静态方法
  static getInstance(role) {
    switch (role) {
      case "superAdmin":
        return new User({
          name: "超级管理员",
          viewPage: ["首页", "通讯录", "发现页", "应用数据", "权限管理"]
        });
        break;
      case "admin":
        return new User({
          name: "管理员",
          viewPage: ["首页", "通讯录", "发现页", "应用数据"]
        });
        break;
      case "user":
        return new User({
          name: "普通用户",
          viewPage: ["首页", "通讯录", "发现页"]
        });
        break;
      default:
        throw new Error("参数错误, 可选参数:superAdmin、admin、user");
    }
  }
}

//调用
let superAdmin = User.getInstance("superAdmin");
let admin = User.getInstance("admin");
let normalUser = User.getInstance("user");
```

### ES6 重写工厂模式方法

ES6 没有实现 `abstract`，但是我们可以使用 `new.target` 来模拟出抽象类。`new.target` 指向直接被 new 执行的构造函数，我们对 `new.target` 进行判断，如果指向了该类则抛出错误来使得该类成为抽象类

```javascript
class User {
  constructor(name = "", viewPage = []) {
    // 使用 new.target 语法来模拟抽象类
    if (new.target === User) {
      throw new Error("抽象类不能实例化!");
    }
    this.name = name;
    this.viewPage = viewPage;
  }
}

class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage);
  }
  create(role) {
    switch (role) {
      case "superAdmin":
        return new UserFactory("超级管理员", [
          "首页",
          "通讯录",
          "发现页",
          "应用数据",
          "权限管理"
        ]);
        break;
      case "admin":
        return new UserFactory("普通用户", ["首页", "通讯录", "发现页"]);
        break;
      case "user":
        return new UserFactory("普通用户", ["首页", "通讯录", "发现页"]);
        break;
      default:
        throw new Error("参数错误, 可选参数:superAdmin、admin、user");
    }
  }
}

let userFactory = new UserFactory();
let superAdmin = userFactory.create("superAdmin");
let admin = userFactory.create("admin");
let user = userFactory.create("user");
```

### ES6 重写抽象工厂模式

抽象工厂模式并不直接生成实例， 而是用于对产品类簇的创建。同样使用 new.target 语法来模拟抽象类

```javascript
class User {
  constructor(type) {
    // 使用 new.target 语法来模拟抽象类
    if (new.target === User) {
      throw new Error("抽象类不能实例化!");
    }
    this.type = type;
  }
}

// 继承抽象类（extends 继承）
class UserOfWechat extends User {
  constructor(name) {
    super("wechat");
    this.name = name;
    this.viewPage = ["首页", "通讯录", "发现页"];
  }
}

class UserOfQq extends User {
  constructor(name) {
    super("qq");
    this.name = name;
    this.viewPage = ["首页", "通讯录", "发现页"];
  }
}

class UserOfWeibo extends User {
  constructor(name) {
    super("weibo");
    this.name = name;
    this.viewPage = ["首页", "通讯录", "发现页"];
  }
}

function getAbstractUserFactory(type) {
  switch (type) {
    case "wechat":
      return UserOfWechat;
      break;
    case "qq":
      return UserOfQq;
      break;
    case "weibo":
      return UserOfWeibo;
      break;
    default:
      throw new Error("参数错误, 可选参数:superAdmin、admin、user");
  }
}

let WechatUserClass = getAbstractUserFactory("wechat");
let QqUserClass = getAbstractUserFactory("qq");
let WeiboUserClass = getAbstractUserFactory("weibo");

let wechatUser = new WechatUserClass("微信小李");
let qqUser = new QqUserClass("QQ小李");
let weiboUser = new WeiboUserClass("微博小李");
```

## 工厂模式的实例应用

Vue 项目中，一般不涉及到权限管理的路由跳转代码如下：

```javascript
// index.js
import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login.vue";
import SuperAdmin from "@/components/SuperAdmin.vue";
import NormalAdmin from "@/components/Admin.vue";
import User from "@/components/User.vue";
import NotFound404 from "@/components/404.vue";

Vue.use(Router);

export default new Router({
  routes: [
    //重定向到登录页
    {
      path: "/",
      redirect: "/login"
    },
    //登陆页
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    //超级管理员页面
    {
      path: "/super-admin",
      name: "SuperAdmin",
      component: SuperAdmin
    },
    //普通管理员页面
    {
      path: "/normal-admin",
      name: "NormalAdmin",
      component: NormalAdmin
    },
    //普通用户页面
    {
      path: "/user",
      name: "User",
      component: User
    },
    //404页面
    {
      path: "*",
      name: "NotFound404",
      component: NotFound404
    }
  ]
});
```

涉及到权限页面时候的代码：

```javascript
//index.js
import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    //重定向到登录页
    {
      path: "/",
      redirect: "/login"
    },
    //登陆页
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

//routerFactory.js
import SuperAdmin from "@/components/SuperAdmin.vue";
import NormalAdmin from "@/components/Admin.vue";
import User from "@/components/User.vue";
import NotFound404 from "@/components/404.vue";

let AllRoute = [
  //超级管理员页面
  {
    path: "/super-admin",
    name: "SuperAdmin",
    component: SuperAdmin
  },
  //普通管理员页面
  {
    path: "/normal-admin",
    name: "NormalAdmin",
    component: NormalAdmin
  },
  //普通用户页面
  {
    path: "/user",
    name: "User",
    component: User
  },
  //404页面
  {
    path: "*",
    name: "NotFound404",
    component: NotFound404
  }
];

// 工厂函数
let routerFactory = role => {
  switch (role) {
    case "superAdmin":
      return {
        name: "SuperAdmin",
        route: AllRoute
      };
      break;
    case "normalAdmin":
      return {
        name: "NormalAdmin",
        route: AllRoute.splice(1)
      };
      break;
    case "user":
      return {
        name: "User",
        route: AllRoute.splice(2)
      };
      break;
    default:
      throw new Error("参数错误! 可选参数: superAdmin, normalAdmin, user");
  }
};

export { routerFactory };

// 登陆页导入（routerFactory.js）该方法，请求登陆接口后根据权限添加路由

//Login.vue
import {routerFactory} from '@/router/routerFactory.js';
export default {
  methods: {
    userLogin() {
      //请求登陆接口, 获取用户权限, 根据权限调用this.getRoute方法
      // this.getRoute(指定的权限的名称标志);
    },

    getRoute(role) {
      //根据权限调用routerFactory方法
      let routerObj = routerFactory(role);

      //给vue-router添加该权限所拥有的路由页面
      this.$router.addRoutes(routerObj.route);

      //跳转到相应页面
      this.$router.push({name: routerObj.name})
    }
  }
};
```

PS: 在实际项目中，因为使用 `this.$router.addRoutes` 方法添加的路由刷新后不能保存，所以会导致路由无法访问。通常的做法是本地加密保存用户信息，在刷新后获取本地权限并解密，根据权限重新添加路由。

## 扩展

`override`->重写(=覆盖)、`overload`->重载、`polymorphism` -> 多态 （java）

### 重写（override/覆盖）是子类继承父类时体现

规则：

- 1、重写方法的参数列表必须完全与被重写的方法的相同,否则不能称其为重写而是重载.
- 2、重写方法的访问修饰符一定要大于被重写方法的访问修饰符（`public`>`protected`>`default`>`private`）。
- 3、重写的方法的返回值必须和被重写的方法的返回一致；
- 4、重写的方法所抛出的异常必须和被重写方法的所抛出的异常一致，或者是其子类；
- 5、被重写的方法不能为 `private`，否则在其子类中只是新定义了一个方法，并没有对其进行重写。
- 6、静态方法不能被重写，可以被重载。

### 重载（overload）是在一个类中的同一个方法的多个实现（这些方法的名称相同而参数形式不同）

规则：

- 1、在使用重载时只能通过相同的方法名、不同的参数形式实现。不同的参数类型可以是不同的参数类型，不同的参数个数，不同的参数顺序（参数类型必须不一样）；
- 2、不能通过访问权限、返回类型、抛出的异常进行重载；
- 3、方法的异常类型和数目不会对重载造成影响；

[工厂模式：参考](https://www.jianshu.com/p/11918dd0f694)

## 2、单例模式

> 保证一个类仅有一个实例，并提供一个访问它的全局访问点。也就是说：单例模式要求类能够有返回对象一个引用(永远是同一个)和一个获得该实例的方法（必须是静态方法，通常使用 getInstance 这个名称，见名知意）。

**单例的实现步骤**：

1、将该类的构造方法定义为私有方法，这样其他处的代码就无法通过调用该类的构造方法来实例化该类的对象，只有通过该类提供的静态方法来得到该类的唯一实例；

2、在该类内提供一个静态方法，当我们调用这个方法时，如果类持有的引用不为空就返回这个引用，如果类保持的引用为空就创建该类的实例并将实例的引用赋予该类保持的引用。

**注意**：单例模式在多线程的应用场合下必须小心使用。如果当唯一实例尚未创建时，有两个线程同时调用创建方法，那么它们同时没有检测到唯一实例的存在，从而同时各自创建了一个实例，这样就有两个实例被构造出来，从而违反了单例模式中实例唯一的原则。 解决这个问题的办法是为指示类是否已经实例化的变量提供一个互斥锁(虽然这样会降低效率)。

```javascript
let LoginFrom = function() {
  // 登录框默认隐藏
  this.state = "hide";
};

// 登录框显示
LoginFrom.prototype.show = function() {
  if (Object.is(this.state, "show")) {
    console.log("己经显示了...");
    return;
  }
  this.state = "show";
  console.log("登录框显示出来了...");
};

// 登录框隐藏
LoginFrom.prototype.hide = function() {
  if (Object.is(this.state, "hide")) {
    console.log("己经隐藏了...");
    return;
  }
  this.state = "hide";
  console.log("登录框被隐藏了，看不见了...");
};

// 静态方法，类名调用
LoginFrom.getInstance = (function() {
  // 使用闭包为了 instance 污染
  let instance = null;
  return function() {
    if (!instance) {
      instance = new LoginFrom();
    }
    return instance;
  };
})();

// test
let login1 = LoginFrom.getInstance();
login1.show();
let login2 = LoginFrom.getInstance();
login2.hide();

console.log(login1 === login2); // true
```

```javascript
// 惰性单例
// 单例模式抽象，分离创建对象的函数和判断对象是否已经创建
const getSingle = function(fn) {
  let result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
};
```

### ES6 实现单例模式

```javascript
class LoginFrom {
  constructor() {
    // 登录框默认隐藏
    this.state = "hide";
  }
  // 登录框显示
  show() {
    if (Object.is(this.state, "show")) {
      console.log("己经显示了...");
      return;
    }
    this.state = "show";
    console.log("登录框显示出来了...");
  }

  // 登录框隐藏
  hide() {
    if (Object.is(this.state, "hide")) {
      console.log("己经隐藏了...");
      return;
    }
    this.state = "hide";
    console.log("登录框被隐藏了，看不见了...");
  }
}

// 静态方法，类名调用
LoginFrom.getInstance = (function() {
  // 使用闭包为了 instance 污染
  let instance = null;
  return function() {
    if (!instance) {
      instance = new LoginFrom();
    }
    return instance;
  };
})();

// test
let login1 = LoginFrom.getInstance();
login1.show();
let login2 = LoginFrom.getInstance();
login2.hide();

console.log(login1 === login2); // true
```

## 3、状态模式

> 一个对象的内部状态改变时可以在外界修改这个状态对应的行为。
> 实质是使用一个**对象**或者**数组**来存储一组状态，每一个状态对应一个行为的实现，
> 实现的时候是根据状态依次去实现的。

**思路**：

首先需要定义一个状态对象或者一个状态数组，内部保存状态变量，然后内部封装好状态的行为实现；
再使状态对象返回一个接口对象，该接口对象可以修改或者调用内部的状态。

### 使用状态模式减少很多的 if...else 多层嵌套

- ES5 实现：

```javascript
const SatateObj = (function() {
  // 状态数组
  let _currentState = [];
  // 状态的行为对象
  let states = {
    speak() {
      console.log("说话");
    },
    run() {
      console.log("跑步");
    }
    // ...
  };

  const Action = {
    // 更改当前动作
    changeState(arr) {
      _currentState = arr;
      // 为了链式操作
      return this;
    },
    // 触发行为
    triggerAction() {
      console.log("触发行为动作");
      _currentState.forEach(actions => {
        states[actions] && states[actions]();
      });
      return this;
    }
  };

  // 返回接口给外界调用
  return {
    change: Action.changeState,
    trigger: Action.triggerAction
  };
})();
// 外界调用
SatateObj.change(["speak"]).trigger();
```

- ES6 实现

```javascript
class SatateObj {
  constructor() {
    // 状态数组
    this._currentState = [];
    // 状态的行为对象
    this.states = {
      speak() {
        console.log("说话");
      },
      run() {
        console.log("跑步");
      }
      // ...
    };
  }
  // 更改当前动作
  change(arr) {
    this._currentState = arr;
    // 为了链式操作
    return this;
  }
  // 触发行为
  trigger() {
    console.log("触发行为动作");
    this._currentState.forEach(actions => {
      this.states[actions] && this.states[actions]();
    });
    return this;
  }
}

// 外界调用
new SatateObj().change(["speak"]).trigger();
```

### 状态模式的使用场景

1、一个对象的行为取决于它的状态，并且它必须在运行时刻根据状态改变它的行为。

2、一个操作中含有大量的分支语句，而且这些分支语句依赖于该对象的状态。状态通常为一个或多个枚举常量的表示。

简而言之，当遇到很多同级 if-else 或者 switch 的时候，可以使用状态模式来进行简化。

[状态模式参考](https://segmentfault.com/a/1190000012506631)

## 4、模式

> 发布者和订阅者模式中，并不是一个对象调用另一个对象的方法，而是一个对象订阅另一个对象的特定活动并在状态改变后获得通知。当发生了一个重要
> 的事件时，发布者将会通知所有订阅者并且可能经常以事件对象的形式传递消息

举个例子：有三个报纸出版社，报社一、报社二、报社三，有两个订报人，分别是:订阅者 1，订阅者 2。在这里出版社就是发布者，订报人就是订阅者

![发布订阅者模式.png](发布订阅者模式.png '发布订阅者模式')
PS: 如果所示,发布者和订阅者解偶. 调度中心负责发布者和订阅者的通信,至于怎样通信在调度中心处理,发布者只管在调度中心通知, 订阅者只管在调度中心订阅. 发布-订阅模式是将调度中心挂在了全局，我们只管调用调度中心相应的方法注册和订阅.

通俗理解: 发布者对象中有个容器存放所有的订阅者,当发布者要发布一条消息时,会遍历这个容器中的所有订阅者,为每个订阅者进行消息通知.订阅者对象创建的时候会在发布者对象的容器中添加这个订阅者对象, 此时订阅者有一个监听发布者是否发布消息的方法,已有收到有发布者的通知就会触发执行.

```javascript
// 发布者和订阅者模式：对程序中某一个对象的进行实时的观察，当该对象状态发生改变的时候进行通知
// 发布者
let Publish = function(name) {
  this.name = name;
  this.subscribers = []; // 数组中存储所有的订阅者，数组的元素都是函数类型
};
// Publish 的实例对象方法 发布消息
Publish.prototype.deliver = function(news) {
  let publish = this; // this 代表报社
  this.subscribers.forEach(function(item) {
    // 循环 subscribers 中的所有订报人，为这些人发布内容
    item(news, publish); // 每个订阅者都收到了新闻（news），还有来自哪家报刊
  });
  return this; // 链式调用
};

// 订阅者
// 订阅者的方法,每一个订阅者都是一个函数,在函数原型上扩展一个方法
Function.prototype.subscribe = function(publish) {
  //出版社形参
  let sub = this; //取得当前订阅者这个人
  //不能同时订一家出版社同一份报纸,没意义
  //publish.subscribers//张三，李四，王五，名字可能重复
  //publish.subscribers数组里面有的人，不能再订阅
  //我们使用E5里面的some方法，循环遍历数组的每一个元素，执行一个函数，如果有相同的名字则返回true，不相同则返回false
  let alreadExists = publish.subscribers.some(function(item) {
    return item === sub;
  });
  //如果出版社名单没有这个人，则加入其中
  if (!alreadExists) {
    publish.subscribers.push(sub);
  }
  return this; // 链式调用。
};

// 取消订阅
//具体的一个订阅者去取消订阅报纸的方法
Function.prototype.unsubscribe = function(publish) {
  let sub = this; //取得当前订阅者这个人
  // filter (过滤函数:循环便利数组的每一个元素，执行一个函数如果不匹配，则删除该元素)
  publish.subscribers = publish.subscribers.filter(function(item) {
    return item !== sub;
  });
  return this; //为了方便，采用链式调用。
};

//实例化发布者对象(报社对象)
let pub1 = new Publish("报社一");
let pub2 = new Publish("报社二");
let pub3 = new Publish("报社三");

//订阅者
let sub1 = function(news, pub) {
  console.log(pub.name + "====sub1===" + news);
};
let sub2 = function(news, pub) {
  console.log(pub.name + "====sub2===" + news);
};
//执行订阅方法
sub1
  .subscribe(pub1)
  .subscribe(pub2)
  .subscribe(pub3);
sub2
  .subscribe(pub1)
  .subscribe(pub2)
  .subscribe(pub3);
pub1.deliver(343434, pub1);
pub2.deliver(4444444444, pub2);
pub3.deliver(656, pub3);
sub1.unsubscribe(pub1); //取消订阅
pub2.deliver(4444444444, pub2);
```

第二次理解:

```javascript
// 手动触发的发布-订阅者模式

// 发布者(Subject 被实时观察的监听的对象)
class Publish {
  constructor (name) {
    this.name = name;
    // 存储所有的订阅者
    this.subscribers = [];
  }
  // 提供订阅方法(注册)
  subscribeRegister (subscribe) {
    // subscribe 是订阅者对象
    this.subscribers.push(subscribe);
    console.log('订阅者:', this.subscribers);
  }
  // 取消订阅方法
  removeSubscribe (subscribe) {
    const index = this.subscribers.findIndex(item => item === subscribe);

    // 如果存在该订阅者,就从subscribers中删除,取消订阅者的订阅
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    } else {
      console.log('不存在该订阅者');
      return '不存在该订阅者';
    }
  }

  // 发布者发布消息(通知已订阅的订阅者)
  notify () {
    this.subscribers.forEach(subscribe => {
      // 调用订阅者(subscribe)中的更新处理方法
      subscribe.update();
    });
  }
}

// 订阅者(Observer 观察者)
class Subscribe {
  constructor (name) {
    this.name = name;
  }
  // 对发布者的订阅方法代理
  subscribe (publish) {
    // publish 是发布者对象
    publish.subscribeRegister(this);
  }

  // 更新处理方法
  update () {
    console.log('订阅者获取(更新)发布者的发布的消息');
  }
}
const publish1 = new Publish('publish1');

const subscribe1 = new Subscribe('subscribe1');
const subscribe2 = new Subscribe('subscribe2');
// subscribe2.update = function () {}; // 修改update方法，实现不同逻辑

// 为发布者添加订阅者
publish1.subscribeRegister(subscribe1);
publish1.subscribeRegister(subscribe2);

// 发布者通知通知订阅者新消息更新
publish1.notify();

// 取消订阅之后就不触发subscribe2的update方法了
publish1.removeSubscribe(subscribe2);
publish1.notify();
```

```javascript
// 根据数据状态变化自动通知订阅者(订阅者的实时监听是否有发布者发布的新通知)

// 发布者(Subject 被实时观察的监听的对象)
class Publish {
  constructor (state) {
    this.state = state || ''; // 触发更新的状态
    // 存储所有的订阅者
    this.subscribers = [];
  }
  getState () {
    return this.state;
  }
  setState (state) {
    if (this.state === state) {
      console.log('不能设为之前的相同的 state，这个是无效的.');
      return;
    }
    this.state = state;
    // 有更新，自动触发通知！【原本手动触发通知的，现在根据数据变化来触发】
    this.notify();
  }

  // 提供订阅方法(注册)
  subscribeRegister (subscribe) {
    // subscribe 是订阅者对象
    this.subscribers.push(subscribe);
    // console.log('订阅者:', this.subscribers);
  }
  // 取消订阅方法
  removeSubscribe (subscribe) {
    const index = this.subscribers.findIndex(item => item === subscribe);

    // 如果存在该订阅者,就从subscribers中删除,取消订阅者的订阅
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    } else {
      console.log('不存在该订阅者');
      return '不存在该订阅者';
    }
  }

  // 发布者发布消息(通知已订阅的订阅者)
  notify () {
    this.subscribers.forEach(subscribe => {
      // 调用订阅者(subscribe)中的实时监听更新处理方法
      // subscribe.update();
      subscribe.listenerUpdate();
    });
  }
}

// 订阅者(Observer 观察者)
class Subscribe {
  constructor (name) {
    this.name = name;
  }
  // 对发布者的订阅方法代理
  subscribe (publish) {
    // publish 是发布者对象
    publish.subscribeRegister(this);
  }

  // 更新处理方法 listener(监听是否发布者发布新消息)
  // update () {
  listenerUpdate () {
    console.log('订阅者获取(更新)发布者的发布的消息');
  }
}
const publish1 = new Publish('publish1');

const subscribe1 = new Subscribe('subscribe1');
const subscribe2 = new Subscribe('subscribe2');
// subscribe2.update = function () {}; // 修改update方法，实现不同逻辑
// subscribe2.listenerUpdate = function () {}; // 修改listenerUpdate方法，实现不同逻辑

// 为发布者添加订阅者
publish1.subscribeRegister(subscribe1);
publish1.subscribeRegister(subscribe2);

// 状态变化就自动触发
publish1.setState('Tom');
publish1.setState('Jerry');
```

```javascript
class Event {
  constructor () {
    this.subscribers = new Map([['any', []]]);
  }

  // 监听
  on (fn, type = 'any') {
    const subs = this.subscribers;
    if (!subs.get(type)) return subs.set(type, [fn]);
    subs.set(type, (subs.get(type).push(fn)));
  }
  // 触发
  emit (content, type = 'any') {
    for (const fn of this.subscribers.get(type)) {
      fn(content);
    }
  }
}

const event = new Event();

event.on((content) => console.log(`get published content: ${content}`), 'myEvent');
event.emit('Tom', 'myEvent'); // get published content: Tom
```

[模式参考](https://segmentfault.com/a/1190000012506631)

- 观察者模式与发布订阅者模式的区别

**观察者模式(Observer Pattern)**: 定义了对象间的一对多的依赖关系,当一个对象状态变化时,所有依赖于它的对象都将得到通知,并自动更新.

**发布订阅者模式(Pub-Sub Pattern)**: 称为发布者的消息发送者不会将消息直接发送给订阅者,也就是说发布者和订阅者不知道彼此的存在.在发布者和订阅者之间存在第三个组件,称为消息代理或调度中心或中间件,它维持着发布者和订阅者之间的联系，过滤所有发布者传入的消息并相应地分发它们给订阅者

**区别:**

1, 观察者模式：观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。

2, 发布订阅模式：订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码

观察者模式和发布订阅模式最大的区别就是发布订阅模式有个事件调度中心。

观察者模式由具体目标调度，每个被订阅的目标里面都需要有对观察者的处理，这种处理方式比较直接粗暴，但是会造成代码的冗余。

而发布订阅模式中统一由调度中心进行处理，订阅者和发布者互不干扰，消除了发布者和订阅者之间的依赖。这样一方面实现了解耦，还有就是可以实现更细粒度的一些控制。比如发布者发布了很多消息，但是不想所有的订阅者都接收到，就可以在调度中心做一些处理，类似于权限控制之类的。还可以做一些节流操作。

[参考](https://www.jb51.net/article/159325.htm)
