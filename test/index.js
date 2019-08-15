
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
