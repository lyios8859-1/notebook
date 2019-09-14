const arr = [94, 15, 88, 55, 76, 21, 39, 8];
// 计数排序
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
