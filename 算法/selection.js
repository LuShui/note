/***
 * 选择排序
 * 遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，
 * 遍历完成后，将第一个元素和最小值索引上的值交换。
 * 如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引 1 开始重复上述操作
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

(function selection (array) {
  checkArray(array)
  let len = array.length
  for (let i = 0; i < len - 1; i ++) {
    let minindex = i
    for( let j = i + 1; j < len; j ++) {
      minindex = array[j] < array[minindex] ? j : minindex
    }
    swap(array, i, minindex)
  }
  console.log(array)
})(list)