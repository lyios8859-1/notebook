// 快速排序：递归思想，两边快速的排序，冒泡排序的改进
const arr = [94, 15, 88, 55, 76, 21, 39, 8];
/**
 * 时间复杂度：O(n log n)
 * 最好情况：O(n log n)
 * 最坏情况：O(n*n)
 * 空间复杂度：O(log n)
 */
// 升序
function quickSort(arr) {
  // 如果数组长度小于等于1，则返回数组本身
  if (arr.length <= 1) {
    return arr;
  }
  // 定义中间值的索引(向下取整)
  const index = Math.floor(arr.length / 2);
  // 取到中间值（基准值）
  const temp = arr.splice(index, 1);
  // 定义左右部分数组
  const left = [];
  const right = [];
  const len = arr.length;
  for (var i = 0; i < len; i++) {
    // 如果元素比中间值小，那么放在左边，否则放右边
    if (arr[i] < temp) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(temp, quickSort(right));
}
console.log(quickSort(arr));
