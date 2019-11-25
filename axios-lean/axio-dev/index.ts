// 泛型约束3
// 泛型的工厂函数的构造器
function create<T>(c: {new(): T}): T{
  return new c();
}
// 实例
class BeeKeeper {
  hasMask: boolean = true;
}
class LionKeeper {
  nameTag: string = 'Tom';
}
class Animal {
  nameLengs: number = 998;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
class Lion extends Animal {
  keeper: LionKeeper = new LionKeeper();
}

// 工厂函数（接收构造器）
function createInstance<T extends Animal>(c: {new(): T} /*构造器类型*/): T /*实例类型*/ {
  return new c();
}

let bee = createInstance(Bee);
console.log('bee: ', bee.keeper.hasMask);
let lion = createInstance(Lion);
console.log('lion: ', lion.keeper.nameTag);
// console.log('lion', lion.name); // 编译报错：类型“Lion”上不存在属性“name”。
