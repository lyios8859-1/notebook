/**
 * 计数排序
 * 核心: 将输入的数据转化为键存储的另外的数组中
 * 要求: 输入的数据必须是有确定范围的整数.
 * 稳定的线性时间排序算法
 * 思路:
 * 1, 找出待排序的数组中最大和最小的元素。(提前知道最大或者最小元素,也就是需要确定范围)
 * 2, 统计数组中每个值为i的元素出现的次数，存入数组C的第i项。
 * 3, 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）。
 * 4, 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。
 */

const arr = [94, 15, 88, 55, 76, 21, 39, 8];
// 升序
function countingSort(arr, maxValue) {
  let bucket = new Array(maxValue + 1);
  let sortedIndex = 0;
  let arrLen = arr.length;
  let bucketLen = maxValue + 1;

  for (let i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0;
    }
    bucket[arr[i]]++;
  }

  for (let j = 0; j < bucketLen; j++) {
    while (bucket[j] > 0) {
      arr[sortedIndex++] = j;
      bucket[j]--;
    }
  }
  return arr;
}
// 94 自已先知道须排序的最值
console.log(countingSort(arr, 94));
