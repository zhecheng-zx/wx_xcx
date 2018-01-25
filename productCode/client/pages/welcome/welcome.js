// pages/welcome/welcome.js
var wxCharts = require('../../utils/wxcharts-min.js');

var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    receiveFiles: 120,
    readFiles: 80,
    dealFiles: 66,
    dealPercent: '55%',
    morePercent: '60%',
    oaNum: 280,
    oaMinute: 33600,
    oaTime: '下午2点',
    businessTripNum: 33,
    businessTripDay: 68,
    businessTripMonth: '7月',
    businessTripCity: '广西、山东、山西',
    sendMsgNum: 288,
    receivedMsgNum: 330,
    msgToName: '张三',
    receivedName: '李四',
    keyWord: '兢兢业业',
    summary: '从今天起做一个幸福的人，努力工作、读书、旅行、 运动、保持好的心情'
  },

  createSimulationData: function () {
    var categories = ['00:00', '04:00', '08:00', '12:00', '16:00', '22:00', '24:00'];
    var data = [];
    for (var i = 0; i < categories.length; i++) {
      data.push(parseInt(Math.random() * 100));
    }

    return {
      categories: categories,
      data: data
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth * 0.8;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    
    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      title: 'aaa',
      categories: simulationData.categories,
      animation: true,      
      series: [{        
        data: simulationData.data,
        color: '#032c8a',
        symbolSize: 15,     
        smooth: true  
      }],
      yAxis: {
        show: false
      },
      legend: false,
      height: 150,
      width: windowWidth,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})