/***
 * 
 * 冒泡排序
 * 冒泡排序的原理如下，从第一个元素开始，把当前元素和下一个索引元素进行比较。
 * 如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素
 */

let list = [1, 22, 34, 5, 55, 21, 4, 421, 8];

function checkArray(array) {
  if (!array || array.length <= 2) return
}
function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}


function bubble(array) {
  if (checkArray(array)) return
  let len = array.length
  for (let i = 0; i < len - 1; i++ ) {
    for (let j = i + 1; j <len; j ++) {
      if (array[j - 1] > array[j]) {
        swap(array, j - 1, j)
      }
    }
  }
  console.log(array.toString())
}