/***
 * 选择排序
 * 第一个元素默认是已排序元素，取出下一个元素和当前元素比较，如果当前元素大就交换位置。
 * 那么此时第一个元素就是当前的最小数，
 * 所以下次取出操作从第三个元素开始，向前对比，重复之前的操作
 * 
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

function insertion(array) {
  checkArray(array)
  let len = array.length
  for (let i = 1; i < len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (array[j] > array[j + 1]) swap(array, j, j + 1) 
    }
  }
  console.log(array)
}
insertion(list)