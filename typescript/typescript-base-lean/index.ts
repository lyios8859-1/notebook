// 静态变量是所有的类对象共享的数据，只能通过类名调用静态方法和属性
class Person {
  private name: string = '';
  private static count: number = 0;
  constructor (name: string) {
    this.name = name;
  }
  getMsg () {
    return this.name;
  }
  static getCount (): number {
    return this.count++;
  }
}

const person1 = new Person('tom');
console.log(person1.getMsg(), Person.getCount()); // tom 0
const person2 = new Person('jerry');
console.log(person2.getMsg(), Person.getCount()); // tom 1
