// 泛型约束3
// 泛型的工厂函数的构造器
function create<T>(c: {new(): T}): T{
  return new c();
}
// 实例
class BeeKeeper {
  hasMask: boolean;
}
class LionKeeper {
  nameTag: string;
}
class Animal {
  nameLengs: number;
}

class Bee extends Animal {
  name: BeeKeeper;
}
class Lion extends Animal {
  keeper: LionKeeper;
}

// 工厂函数（接收构造器）
function createInstance<T extends Animal>(c: {new(): T} /*构造器类型*/): T /*实例类型*/ {
  return new c();
}

let bee = createInstance(Bee);
console.log('bee', bee.name);
let lion = createInstance(Lion);
console.log('lion', lion.name); // 编译报错：类型“Lion”上不存在属性“name”。
