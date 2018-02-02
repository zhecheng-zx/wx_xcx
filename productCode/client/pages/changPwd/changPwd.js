// pages/changPwd/changPwd.js
var config = require('../../config.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    userPwd: ""
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  /**
   * 用户点击右上角分享
   */
  setLogin: function () {
    console.log("新密码：" + this.data.userPwd);
    var that = this;
    wx.request({
      url: `${config.service.changPwd}`,//'http://localhost:8080/mis-web/platform/changPwd',// //`${config.service.loginURL1}`,
      data: { username: '' + getApp().data.userName, password: '' + that.data.userPwd },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        //util.showSuccess('请求成功完成')
        var results = result.data;
        var tableData = results.data;
        if (results.status != 1) {
          util.showModel('系统提示', '修改成功请重新登录');
          wx.navigateTo({ url: '/pages/login/login' });

        } else {
          util.showModel('系统提示', '用户名或密码输入错误');
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });

  },
})