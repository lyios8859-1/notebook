function broken(name) {
    function postfix(epither) {
        // 这里明确调用时不可能为null，所以使用 ’!‘ 类型断言
        // 否则 tsc index.ts --strictNullChecks 编译时就报错
        return name.charAt(0) + '. The ' + epither;
    }
    name = name || 'Tom';
    return postfix(name);
}
