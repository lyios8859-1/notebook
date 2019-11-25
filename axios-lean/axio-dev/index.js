var Greeter = /** @class */ (function () {
    function Greeter(msg) {
        this.greeting = '';
        this.greeting = msg;
    }
    Greeter.prototype.getGreeting = function () {
        return this.greeting ? "Hello, " + this.greeting + "!!!" : Greeter.standarGreeting;
    };
    Greeter.standarGreeting = 'Hello, Tom!!!';
    return Greeter;
}());
var greeter1 = new Greeter('Jerry');
console.log(greeter1.getGreeting()); // Hello, Jerry!!!
var greeter2 = new Greeter();
console.log(greeter2.getGreeting()); // Hello, Tom!!!
// 修改静态属性
var greeterMaker = Greeter;
greeterMaker.standarGreeting = 'Hi Tom.';
var greeter = new greeterMaker();
console.log(greeter.getGreeting());
