module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // 测试文件中引入的模块，这些后缀文件可以省略不写
  moduleFileExtensions: ['js', 'jsx', 'vue'],
  // 让jest识别的一些路径简写，比如 @
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // rootDir 默认在当前目录，一般是 package.json 所在的目录
  rootDir: '.',
  // 测试环境，默认值是：jsdom，可修改为node
  testEnvironment: 'jsdom',
  // 测试的文件路径, 与testRegex互斥，不能同时写
  testMatch: ['**/tests/unit/**/*.[spec|test].[jt]s?(x)', '**/__tests__/**/*.test.[jt]s?(x)'],
  // 不需要测试的文件
  testPathIgnorePatterns: [
    '\.eslintrc\.js'
  ],

}
