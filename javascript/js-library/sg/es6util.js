
/**
 * 实例：
 * 拷贝对象：deepCopyPropertie(obj1, obj2);
 * 拷贝对象上的原型：deepCopyProperties(obj1.prototype, ,obj2.prototype)
 *
 * 最后拿到的obj1就是拷贝完的需要操作的对象了。
 *
 * [deepCopyProperties 深度拷贝]
 * @param  {[object]} target [拷贝之后的对象]
 * @param  {[object]} source [需要拷贝的对象]
 * @return {[type]}        [description]
 */
const deepCopyProperties = function (target, source) {
	for (let key of Reflect.ownKeys(source)) {
		if (key != 'constructor' && key != 'prototype' key != 'name') {
			let desc = Object.getOwnPropertyDescriptor(target, source);
			Object.defineProperty(target, key, desc);
		}
	}
};
