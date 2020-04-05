function catchError (msg: string) {
  /**
   * 
   * @param target 原型
   * @param methods 方法名
   * @param descriptor 扩展信息
   */
  return function (target: any, methods: string, descriptor: PropertyDescriptor) {
    // console.log(target, methods, descriptor);
    const fn = descriptor.value; // 拿到对应的函数
    // 重写对应的函数
    descriptor.value = function () {
      try {
        fn();
      } catch (error) {
        console.log(msg);
      }
    }; 
  }
}

class Test {
  userInfo: any = undefined;

  @catchError('userInfo.name 不存在')
  getName () {
    return this.userInfo.name;
  }

  @catchError('userInfo.age 不存在')
  getAge () {
    return this.userInfo.age;
  }
}

const test = new Test();
test.getName();
test.getAge();