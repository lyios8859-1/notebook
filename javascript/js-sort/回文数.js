
// 方法一，回文判断
function isPalindrome1(num) {
  let reverseNum = '';
  let str = num.toString();

  for (let i = str.length; i >= 0; i--) {
    reverseNum += str.charAt(i);
  }

  return reverseNum === str;
}

// 方法二，回文判断
function isPalindrome2(x) {
  if (x < 0) return false
  let str = '' + x
  return Array.from(str).reverse().join('') === str;
};


let arr = [123321, 1221, 12344321, 12322];
let arrFlag = [];
for (let i = 0; i < arr.length; i++) {
  arrFlag.push(isPalindrome2(arr[i]));
}

console.log(arrFlag);