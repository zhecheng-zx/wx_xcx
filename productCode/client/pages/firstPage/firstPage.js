// pages/firstPage/firstPage.js
var config = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts-min.js');
var ringChart = null,barChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    ringChart = new wxCharts({
      animation: false,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 15,
        pie: {
          offsetAngle: -45
        }
      },
      series: [{
        name: '成交量1',
        data: 15,
        color: config.ringChartsColor[0],
        stroke: false
      }, {
        name: '成交量2',
        data: 35,
        color: config.ringChartsColor[1],
        stroke: false
      }, {
        name: '成交量3',
        data: 78,
        color: config.ringChartsColor[2],
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        color: config.ringChartsColor[3],
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 200,
      dataLabel: false,
      legend: false,
      background: '#f5f5f5',
      padding: 0,
      dataLabel: true
    });
    // ringChart.addEventListener('renderComplete', () => {
    //   console.log('renderComplete');
    // });
    barChart = new wxCharts({
      legend: false,
      canvasId: 'columnCanvas',
      type: 'column',
      categories: ['合同', '成果', '报奖'],
      series: [{
        color: config.barChartsColor[0],
        /**
         * 结尾多加一个最小的数，不然最小的柱子不显示
         */
        data: [35, 35, 45, 0]
      }],
      yAxis: {
        format: function (val) {
          return val;
        }
      },
      animation: false,
      width: windowWidth,
      height: 200
    });
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
  
  },
  /**
   * 图表的部分
   */
  touchHandler: function (e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },
  // updateData: function () {
  //   ringChart.updateData({
  //     title: {
  //       name: '80%'
  //     },
  //     subtitle: {
  //       color: '#ff0000'
  //     }
  //   });
  // }
})