function getInfo(id, name) {
    if (id === void 0) { id = 0; }
    var restInfo = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        restInfo[_i - 2] = arguments[_i];
    }
    return "\u5E8F\u53F7\uFF1A " + id + ", \u540D\u5B57\uFF1A " + name + ", \u5269\u4F59\u4FE1\u606F: " + restInfo;
}
console.log(getInfo(undefined, 'Tom', '女', '游泳'));
console.log(getInfo(undefined, 'Jerry', '跑步'));
console.log(getInfo(1, 'Cat', '吃鱼'));
// 使用该函数类型
var getMessage = getInfo;
console.log(getMessage(3, 'Tiger', '吃人'));
