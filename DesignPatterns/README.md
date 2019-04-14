# 常用的设计模式学习

## 工厂模式

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

### 重写（override/覆盖）是子类继承父类时体现，

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

## 单例模式

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
