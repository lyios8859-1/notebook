class Greeter {
  static standarGreeting: string = 'Hello, Tom!!!';
  greeting: string = '';
  constructor (msg?: string) {
    this.greeting = msg;
  }
  getGreeting () {
    return this.greeting ? `Hello, ${this.greeting}!!!` : Greeter.standarGreeting;
  }
}

let greeter1: Greeter = new Greeter('Jerry');
console.log(greeter1.getGreeting()); // Hello, Jerry!!!

let greeter2: Greeter = new Greeter();
console.log(greeter2.getGreeting()); // Hello, Tom!!!

// 修改静态属性
let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standarGreeting = 'Hi Tom.'

let greeter: Greeter = new greeterMaker();
console.log(greeter.getGreeting());