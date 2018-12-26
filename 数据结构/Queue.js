/**
   * 队列 一种数据结构，先进先出原则
   * 
   * 单向对垒
   * 
  */
  class Queue {
  constructor () {
    this.queue = []
  }

  add (item) {
    this.queue.push(item)
  }

  get () {
    return this.queue.shift()
  }

  first () {
    if (this.queue.length) {
      return this.queue[0]
    } else {
      throw new Error('this queue is no item')
    }
  }

  getLength () {
    return this.queue.length
  }

  isEmpty () {
    return this.queue.length === 0 ? true : false
  }
}