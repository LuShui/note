/**
     * 说明： 栈是一种数据结构，遵循先进后出的原则
     * 
     * 
    */
   class Stack {
    constructor () {
      this.list = []
    }

    // 添加元素
    add (item) {
      this.list.push(item)
    }

    // 获取元素， 获取的是最后一个元素，先进后出原则
    get () {
      return this.list.pop()
    }

    // 获取长度
    getCount () {
      return this.list.length
    }

    // 是否为空
    isEmpty () {
      return this.list.length == 0 ? true : false 
    }
  }