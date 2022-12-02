const deepClone = require("./utils")
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    list: Array,
    draggable: Boolean,
    columnnum: Number,
    title: String,
    max: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    checkEle: "",
    throughIndex: "",
    side: 0,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    start(e) {
      console.log("draggable", this.properties.draggable)
      const {index} = e.currentTarget.dataset;
      //边长
      const side = wx.getSystemInfoSync().windowWidth/this.properties.columnnum;
      //初始值
      const startX = side*(index%this.properties.columnnum);
      const startY = side*Math.floor(index/this.properties.columnnum);
      //偏移量
      const offsetX = e.touches[0].pageX - startX;
      const offsetY = e.touches[0].pageY - startY;
      this.setData({
        checkEle: index,
        startX,
        startY,
        offsetX,
        offsetY,
        side
      });
    },
    move(e) {
      //手指位置
      const fingerX = e.changedTouches[0].pageX;
      const fingerY = e.changedTouches[0].pageY;
      //确定滑块位置
      const X = fingerX - this.data.offsetX;
      const Y = fingerY - this.data.offsetY;
      //确定手指经过第几个格子
      const column = Math.floor(X / this.data.side);
      const row = Math.floor(Y / this.data.side);
      let throughIndex = this.properties.columnnum*row + column;
      //滑块元素不计入
      if (throughIndex >= this.data.checkEle) {
        throughIndex = throughIndex + 1;
      }
      this.setData({
        startX: X,
        startY: Y,
        throughIndex
      });
    },
    end(e) {
      const result = deepClone(this.properties.list);
      if (this.data.checkEle !== "" && this.data.throughIndex !== "") {
        const currentData = result[this.data.checkEle];
        result.splice(this.data.throughIndex, 0, currentData)
        if (this.data.throughIndex >= this.data.checkEle) {
          result.splice(this.data.checkEle, 1)
        } else {
          result.splice(this.data.checkEle+1, 1)
        }
      }
      this.triggerEvent("updateList",result);
      this.setData({
        checkEle: "",
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
        side: 0,
        throughIndex: ""
      });
    }
  }
})
