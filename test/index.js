/** 选择排序
 * 首先从原始数组中找到最小的元素，并把该元素放在数组的最前面，
 * 后再从剩下的元素中寻找最小的元素，放在之前最小元素的后面，直到排序结束。
 *
 * 平均时间复杂度O(n*n)
 * 最好情况O(n*n)
 * 最差情况O(n*n)
 * 空间复杂度O(1)
 * 稳定性：不稳定
 */
const arr = [94, 15, 88, 55, 76, 21, 39, 8];
// 升序

function selectSort(arr) {
  const len = arr.length;
  let minIndex, temp;
  console.time("选择排序耗时");
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  console.timeEnd("选择排序耗时");
  return arr;
}
console.log(selectSort(arr));
