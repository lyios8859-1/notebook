/**
 * 插入排序:
 * 把要排序的数组分成两部分:
 * 第一部分包含了这个数组的所有元素,但将最后一个元素除外（让数组多一个空间才有插入的位置）,
 * 第二部分就只包含这一个元素（即待插入元素,在第一部分排序完成后,再将这个最后元素插入到已排好序的第一部分中.
 *
 * 稳定的排序算法
 * 时间复杂度：O（n*n）
 * 最好情况：O(n)
 * 最坏情况：O(n*n)
 * 空间复杂度：O(1)
 */

const arr = [94, 15, 88, 55, 76, 21, 39, 8];

// 升序
function insertSort() {
  const len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    // 需要插入的值是否需要插入到相比较的值之后
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
console.log(insertSort(arr));
