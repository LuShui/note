Function.prototype.myCall = function (context) {
  var context = context || window
  context.fn = this
  var args = [...arguments].slice(1)
  // 这一行是重点，this的指向问题
  var result = context.fn(...args)
  delete context.fn
  return result
}