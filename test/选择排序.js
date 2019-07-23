/** 选择排序
 * 首先，找到数组中最小的那个元素，
 * 其次，将它和数组的第一个元素交换位置（如果第一个元素就是最小元素那么它就和自己交换）。
 * 再次，在剩下的元素中找到最小的元素，将它与数组的第二个元素交换位置。
 *
 * 平均时间复杂度O(n*n)
 * 最好情况O(n*n)
 * 最差情况O(n*n)
 * 空间复杂度O(1)
 * 稳定性：不稳定
 */
let arr = [94, 15, 88, 55, 76, 21, 39, 8];
// 升序
function selectSort(arr) {
  let len = arr.length;
  let minIndex; //minIndex始终保存着最小值的位置的索引，随着i的自增，遍历的数组长度越来越短
  let temp;
  console.time('选择排序耗时');
  for (i = 0; i < len - 1; i++) {
    minIndex = i;
    for (j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  console.timeEnd('选择排序耗时');
  return arr;
}
console.log(selectSort(arr));