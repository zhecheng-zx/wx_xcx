// pages/welcome/welcome.js
var wxCharts = require('../../utils/wxcharts-min.js');
var util = require('../../utils/util.js');
var config = require('../../config.js');
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation:"",
    condition1: true,
    condition2: true,
    condition3: true,
    condition4: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 500,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.panelData();
    wx.setNavigationBarTitle({
      title: "OA年度使用报告"//页面标题为路由参数
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation();
  },

  onShow: function () {
    var animation = wx.createAnimation();
    animation.rotate(360).step();
    this.setData({ animation: animation.export() });
  },
  rotate: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
    this.setData({ animation: this.animation.export() })
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
   * 请求数据
   */
  panelData: function () {
    //util.showBusy('请求中...');
    var that = this;
    that.setData({
      userName: getApp().data.userName
    });
    wx.request({
      url: `${config.service.firstPage}`,
      data: { username: getApp().data.userName },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        //console.log(results.data[0].pmb);
        if (results.data[0].sdlw == null) {
          that.setData({
            condition1: false
          });
        } else {
          that.setData({
            receiveFiles: results.data[0].sdlw,
            readFiles: results.data[0].yylw,
            dealFiles: results.data[0].bjlw,
            dealPercent: results.data[0].aa,
            morePercent: results.data[0].pmb
          });
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    wx.request({
      url: `${config.service.secondPage}`,
      data: { username: getApp().data.userName },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        if (results.data[0].dlcs == null) {
          that.setData({
            condition2: false
          });
        } else {
          that.setData({
            oaNum: results.data[0].dlcs,
            oaMinute: results.data[0].zxsc
          });
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    wx.request({
      url: `${config.service.thirdPage}`,
      data: { username: getApp().data.userName },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        if (results.data[0].cccs == 0) {
          that.setData({
            condition3: false
          });
        } else {
          that.setData({
            businessTripNum: results.data[0].cccs,
            businessTripMonth: results.data[0].ccfs == null ? '无' : results.data[0].ccfs,
            businessTripCity: results.data[0].ccdd == null ? '无' : results.data[0].ccdd
          });
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    wx.request({
      url: `${config.service.fourthPage}`,
      data: { username: getApp().data.userName },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        if (results.data[0].fsdx == null) {
          that.setData({
            condition4: false
          });
        } else {
          that.setData({
            sendMsgNum: results.data[0].fsdx,
            receivedMsgNum: results.data[0].jsdx
          });
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    wx.request({
      url: `${config.service.finalPage}`,
      data: { username: getApp().data.userName },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        if (result.status == 1 || !results.hasOwnProperty("data")) {
          that.setData({
            keyWord: '勤勤勉勉',
            imageUrl: '../../images/welcome/keyword-img3.png'
          });
        } else if (results.data[0].pj == "工作狂") {
          that.setData({
            keyWord: '工作狂',
            imageUrl: '../../images/welcome/keyword-img2.png'
          });
        } else if (results.data[0].pj == "兢兢业业") {
          that.setData({
            keyWord: '兢兢业业',
            imageUrl: '../../images/welcome/keyword-img1.png'
          });
        } else {
          that.setData({
            keyWord: '勤勤勉勉',
            imageUrl: '../../images/welcome/keyword-img3.png'
          });
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    console.log(that.data.businessTripCity);
  }
})