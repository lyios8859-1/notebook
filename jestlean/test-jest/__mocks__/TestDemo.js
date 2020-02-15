// 这个文件内容会替换与 TestDemo.js 文件中的内容
const fetchData = () => {
  return new Promise((resolve, reject) => {
    resolve("(function(){return 'Jerry'})()")
  });
}

export { 
  fetchData
};