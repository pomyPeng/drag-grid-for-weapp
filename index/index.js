const app = getApp()

Page({
  data: {
    myAppList: [
      {name:"测试1"},
      {name:"测试2"},
      {name:"测试3"},
      {name:"测试4"},
      {name:"测试5"},
      {name:"测试6"},
      {name:"测试7"},
      {name:"测试8"},
      {name:"测试9"},
    ]
  },
  onLoad() {
    
  },
  updateList(result) {
    this.setData({
      myAppList:result.detail
    })
  }
})
