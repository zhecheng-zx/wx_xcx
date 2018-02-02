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
    summary: '从今天起做一个幸福的人，努力工作、读书、旅行、 运动、保持好的心情',
    opacity: 0,
    current: 0,
    swiperItemNum: 7,
    animationData: {},
    ccdr:'',
    summaryOpa: 0.2
  },
  exit:function(){
    wx.clearStorage();
    wx.redirectTo({ url: '/pages/login/login' });
  },
  swiperChange: function (e) {

    this.setData({
      opacity: 0,
      current: e.detail.current
    });
    this.fadeInAnimate();

    if (this.data.current + 2 == this.data.swiperItemNum) {
      this.imgAnimate();
    }
  },

  fadeInAnimate: function (e) {
    var that = this;
    var interval = setInterval(function () {
      var opa = that.data.opacity;
      if (opa == 1) {
        clearInterval(interval);
      }

      that.setData({
        opacity: opa + 0.08
      })
    }, 300);
  },


  prevSwiper: function (e) {
    if (this.data.current == 0) {
      return;
    }

    var cur = this.data.current;
    this.setData({
      current: cur - 1
    });
  },

  nextSwiper: function (e) {
    var cur = this.data.current,
      itemNum = this.data.swiperItemNum;
    if (cur + 1 == itemNum) {
      return;
    } else {
      this.setData({
        current: cur + 1
      });
    }
  },

  imgAnimate: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        summaryOpa: 1
      })
      //that.animation.rotateY(180).step();
      that.animation.rotateY(360).step();
      that.setData({
        animationData: that.animation.export()
      });
    }, 800);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.setNavigationBarTitle({
      title: "2017年度OA使用报告"//页面标题为路由参数
    })
    that.panelData();
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
    this.fadeInAnimate();

    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation;
    this.setData({
      animationData: animation.export()
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      opacity: 0
    })
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
      userName: wx.getStorageSync('userName')
    });
    wx.request({
      url: `${config.service.firstPage}`,
      data: { username: wx.getStorageSync('userName') },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        //console.log(results.data[0].pmb);
        if (results.data[0].bw == null) {
          var num = that.data.swiperItemNum;
          that.setData({
            condition1: false,
            swiperItemNum: num - 1
          });
        } else {
          that.setData({
            dealFiles: results.data[0].bw,
            morePercent: results.data[0].pmb
          });
          if (results.data[0].zt == "神") {
            that.setData({
              dealPercent: "这一年您真是神一样的存在"
            });
          } else if (results.data[0].zt == "忙碌") {
            that.setData({
              dealPercent: "这一年您是在忙碌中度过的吧"
            });
          } else {
            that.setData({
              dealPercent: "新的一年您还要加把劲哦"
            });
          }
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    wx.request({
      url: `${config.service.secondPage}`,
      data: { username: wx.getStorageSync('userName') },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        if (results.data[0].dlcs == null) {
          var num = that.data.swiperItemNum;
          that.setData({
            condition2: false,
            swiperItemNum: num - 1
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
      data: { username: wx.getStorageSync('userName') },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        if (results.data[0].cccs == 0) {
          var num = that.data.swiperItemNum;
          that.setData({
            condition3: false,
            swiperItemNum: num - 1
          });
        } else {
          if (parseInt(results.data[0].cccs) > 3) {
            that.setData({
              ccdr: '出差达人，'
            });
          }
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
      data: { username: wx.getStorageSync('userName')},
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        if (results.data[0].fsdx == null) {
          var num = that.data.swiperItemNum;
          that.setData({
            condition4: false,
            swiperItemNum: num - 1
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
      data: { username: wx.getStorageSync('userName') },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        if (result.status == 1 || !results.hasOwnProperty("data")) {
          that.setData({
            keyWord: '勤勤勉勉',
            summary: '从今天起做一个幸福的人，努力工作、读书、旅行、运动、保持好的心情。',
            imageUrl: '../../images/welcome/keyword-img3.png'
          });
        } else if (results.data[0].pj == "工作狂") {
          that.setData({
            keyWord: '工作狂',
            summary: '虽然您认真工作的样子最迷人，但是也要保重身体哦。',
            imageUrl: '../../images/welcome/keyword-img2.png'
          });
        } else if (results.data[0].pj == "兢兢业业") {
          that.setData({
            keyWord: '兢兢业业',
            summary: '世界会向那些有目标和远见的人让路。',
            imageUrl: '../../images/welcome/keyword-img1.png'
          });
        } else {
          that.setData({
            keyWord: '勤勤勉勉',
            summary: '从今天起做一个幸福的人，努力工作、读书、旅行、运动、保持好的心情。',
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