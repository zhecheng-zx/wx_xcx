// pages/login/login.js
var config = require('../../config.js'); 
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userPwd: ""
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
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
    console.log("用户名：" + this.data.userName + " 密码：" + this.data.userPwd);

    /*wx.redirectTo({
      url: '../../pages/welcome/welcome'
    });
    return
    */

    var that = this;
    wx.request({
      url: `${config.service.loginURL1}`,//'http://localhost:8080/mis-web/platform/changPwd', //
      data: { username: '' + that.data.userName, password: '' + that.data.userPwd },
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        //util.showSuccess('请求成功完成')
        var results = result.data;
        var tableData = results.data;
        if (results.status != 1 && results.data.length>=1) {
          getApp().data.loginFlag = "1";
          if (results.data[0].role=="1"){
            wx.switchTab({ url: '/pages/secondPage/secondPage' });
          }else{
            if (results.data[0].flag == "0") {
              //util.showModel('系统提示', '首次登录带你去修改密码');
              getApp().data.userName = results.data[0].username;
              wx.navigateTo({ url: '/pages/changPwd/changPwd' });
            }else{
              getApp().data.userName = results.data[0].realname;
              wx.redirectTo({
                url: '../../pages/welcome/welcome'
              });
            }
            
          }
          
        }else{
          util.showModel('系统提示','用户名或密码输入错误');
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });

  },
})