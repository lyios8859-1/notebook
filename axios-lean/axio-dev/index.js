var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 泛型约束3
// 泛型的工厂函数的构造器
function create(c) {
    return new c();
}
// 实例
var BeeKeeper = /** @class */ (function () {
    function BeeKeeper() {
        this.hasMask = true;
    }
    return BeeKeeper;
}());
var LionKeeper = /** @class */ (function () {
    function LionKeeper() {
        this.nameTag = 'Tom';
    }
    return LionKeeper;
}());
var Animal = /** @class */ (function () {
    function Animal() {
        this.nameLengs = 998;
    }
    return Animal;
}());
var Bee = /** @class */ (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keeper = new BeeKeeper();
        return _this;
    }
    return Bee;
}(Animal));
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keeper = new LionKeeper();
        return _this;
    }
    return Lion;
}(Animal));
// 工厂函数（接收构造器）
function createInstance(c /*构造器类型*/) {
    return new c();
}
var bee = createInstance(Bee);
console.log('bee', bee.keeper.hasMask);
var lion = createInstance(Lion);
console.log('lion', lion.keeper.nameTag);
// console.log('lion', lion.name); // 编译报错：类型“Lion”上不存在属性“name”。
