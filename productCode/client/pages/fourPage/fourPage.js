// pages/fourPage/fourPage.js
var config = require('../../config.js');
var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts-min.js');
var ringChart = null, barChart = null;
var resetData = function (tableData) {
  var tableRow = [];
  var count = 0;
  for (var i in tableData) {
    var obj = {};
    for (var k in tableData[i]){
      obj.name = k;
      obj.num = tableData[i][k];
      count += tableData[i][k];
    }
    tableRow.push(obj);
  }
  for (var j in tableRow) {
    tableRow[j].proportion = (tableRow[j].num / count * 100).toFixed(2) + '%';
  }
  tableRow.push({ name: '合计', num: count, proportion: '100%' });
  return tableRow;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titNum1: 0,
    titNum2: 0,
    titNum3: 0,
    titNum4: 0,
    data: {},
    charts1: {},
    data2: {
      aggrField: "area_name_kw",
      role_id: "3"
    },
    table2: {},
    data3: {
      role_id: "3"
    },
    charts3: [],
    data4: {
      aggrField: "area_name_kw",
      role_id: "25"
    },
    table4: {},
    data5: {
      role_id: "25"
    },
    charts5: [],
    data6: {},
    table6: {},
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
    util.showBusy('请求中...');
    var that = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    /**
     * 申报人地区统计
     */
    wx.request({
      url: `${config.service.fourPageUrl2}`,
      data: that.data.data2,
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        var tableData = results.data;
        if (results.status != 1 && results.data) {
          var tableRow = resetData(tableData);
          var titNum1 = tableRow[tableRow.length-1].num;
          that.setData({
            titNum1: titNum1,
            table2: tableRow
          });
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    /**
     * 专家地区统计
     */
    wx.request({
      url: `${config.service.fourPageUrl2}`,
      data: that.data.data4,
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        var tableData = results.data;
        if (results.status != 1 && results.data) {
          var tableRow = resetData(tableData);
          var titNum2 = tableRow[tableRow.length-1].num;
          that.setData({
            titNum2: titNum2, 
            table4: tableRow
          });
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    /**
     * 广西高层次人才统计
     */
    wx.request({
      url: `${config.service.fourPageUrl4}`,
      data: that.data.data6,
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        var tableData = results.data;
        var tableRow = [],count = 0;
        if (results.status != 1 && tableData) {
          for (var i in tableData.BaguiScholar){
            var obj = {};
            obj.num = tableData.BaguiScholar[i].total;
            obj.name = tableData.BaguiScholar[i].bagui_type;
            count += obj.num;
            tableRow.push(obj);
          }
          for (var i in tableData.InnovatePerson) {
            var obj = {};
            obj.num = tableData.InnovatePerson[i].total;
            obj.name = tableData.InnovatePerson[i].person_type;
            count += obj.num;
            tableRow.push(obj);
          }
          for (var i in tableData.SuperiorTalent) {
            var obj = {};
            obj.num = tableData.SuperiorTalent[i].total;
            obj.name = tableData.SuperiorTalent[i].talent_type;
            count += obj.num;
            tableRow.push(obj);
          }
          for (var j in tableRow){
            tableRow[j].proportion = (tableRow[j].num / count * 100).toFixed(2) + '%';
          }
          tableRow.push({ name: '合计', num: count, proportion: '100%' });
          that.setData({
            titNum3: count,
            table6: tableRow
          });
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    /**
     * 专家按单位统计
     */
    wx.request({
      url: `${config.service.fourPageUrl3}`,
      data: that.data.data5,
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        var tableData = results.data;
        var tableRow = [];
        if (results.status != 1 && tableData) {
          for(var i in tableData){
            var obj = {
              name: '',
              data: 0,
              color: util.ringChartsColor[i],
              stroke: false,
              format: function () {
                return this.name + ' ' + this.data;
              }
            };
            obj.name = tableData[i].orgtype;
            obj.data = tableData[i].count;
            tableRow.push(obj);
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
            series: tableRow,
            disablePieStroke: true,
            width: windowWidth,
            height: 200,
            legend: false,
            background: '#f5f5f5',
            padding: 0,
            dataLabel: true,
            dataPointShape:true
          });
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    /**
     * 申报人按单位统计
     */
    wx.request({
      url: `${config.service.fourPageUrl3}`,
      data: that.data.data3,
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        var tableData = results.data;
        var tableRow = [];
        if (results.status != 1 && tableData) {
          console.log(tableData)
          var categories = [],seriesData=[];
          for (var i in tableData){
            categories.push(tableData[i].orgtype);
            seriesData.push(tableData[i].count);
          }
          barChart = new wxCharts({
            legend: false,
            canvasId: 'columnCanvas',
            type: 'column',
            categories: categories,
            series: [{
              color: util.barChartsColor[0],
              /**
               * 结尾多加一个最小的数，不然最小的柱子不显示
               */
              data: seriesData
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
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });




    
    // ringChart.addEventListener('renderComplete', () => {
    //   console.log('renderComplete');
    // });
    
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