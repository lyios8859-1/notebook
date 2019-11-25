function getInfo (id: number = 0, name: string, ...restInfo: string[] ): string {
  return `序号： ${id}, 名字： ${name}, 剩余信息: ${restInfo}`; 
}
console.log(getInfo(undefined, 'Tom', '女', '游泳'));
console.log(getInfo(undefined, 'Jerry', '跑步'));
console.log(getInfo(1, 'Cat', '吃鱼'));

// 使用该函数类型
let getMessage: (id: number, name: string, ...rest) => string = getInfo;
console.log(getMessage(3, 'Tiger', '吃人'));
