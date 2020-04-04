/** 冒泡排序
 * 相邻元素两两比较，交换次序，每一轮交换决出当前最大/最小数
 *
 * 两层循环，最差时间复杂度为O（n * n）。
 * 一次遍历，排序完毕，最好时间复杂度为O（n）。
 */
const arr = [94, 15, 88, 55, 76, 21, 39, 8];
// 升序(基础)
function bubbleSort0(arr) {
  let m = 0; // 循环轮数
  let n = 0; // 比较次数
  const len = arr.length;
  let temp;
  console.time('选择排序耗时');
  // 外层控制循环轮数
  for (let i = 0; i <= len - 1; i++) {
    // 内层控制比较次数
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      n++;
    }
    m++;
  }
  console.timeEnd('选择排序耗时');
  console.log('轮数:', m);
  console.log('比较次数:', n);
  return arr;
}
console.log(bubbleSort0(arr));

// 升序(优化一)
function bubbleSort1(arr) {
  let m = 0; // 循环轮数
  let n = 0; // 比较次数
  const len = arr.length;
  let temp;
  console.time('选择排序耗时');
  // 外层控制循环轮数
  for (let i = len - 1; i >= 0; i--) {
    // 内层控制比较次数
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      n++;
    }
    m++;
  }
  console.timeEnd('选择排序耗时');
  console.log('轮数:', m);
  console.log('比较次数:', n);
  return arr;
}
console.log(bubbleSort1(arr));

// 升序(优化二)
function bubbleSort2(arr) {
  let m = 0; // 循环轮数
  let n = 0; // 比较次数
  const len = arr.length;
  let temp;
  console.time('选择排序耗时');
  // 外层控制循环轮数
  for (let i = len - 1; i >= 0; i--) {
    let bool = true;
    // 内层控制比较次数
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        bool = false;
      }
      n++;
    }
    m++;

    // 如果本轮比较有一对元素相互交换位置，不能跳出循环。
    // 如果本轮比较没有任何元素相互交换位置，说明已经比较完成，可以跳出循环。
    if (bool) {
      break;
    }
  }
  console.timeEnd('选择排序耗时');
  console.log('轮数:', m);
  console.log('比较次数:', n);
  return arr;
}
console.log(bubbleSort2(arr));
