// pages/secondPage/secondPage.js
var config = require('../../config.js');
var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts-min.js');
var ringChart = null, barChart = null;

var resetData = function (tableData) {
  var tableRow = [];
  var count = 0;
  for (var i in tableData) {
    var obj = {};
    obj.name = i,
      obj.num = tableData[i];
    count += tableData[i];
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
    data: {
      aggrField: "status",
      startTime: "2016-12-31 00:00:00",
      endTime: "2017-11-30 00:00:00"
    },
    table1: {}, 
    data2: {
      aggrField: "admin_org_codes",
      startTime: "2016-12-31 00:00:00",
      endTime: "2017-11-30 00:00:00"
    },
    table2: {},
    data3: {
      aggrField: "grant_name",
      startTime: "2016-12-31 00:00:00",
      endTime: "2017-11-30 00:00:00"
    },
    charts3: {},
    data4: {},
    charts4: {},
    data5: {
      startTime: "2016-12-31 00:00:00",
      endTime: "2017-11-30 00:00:00"
    },
    table5: {},
    beginDate: '2017-01-01',
    endDate: '',
    selectYear: ''
  },

/**
 * 开始日期改变事件
 */
  bindDateChange1: function (e) {
    this.setData({
      beginDate: e.detail.value
    });
  },

  /**
   * 结束日期改变事件
   */
  bindDateChange2: function (e) {
    this.setData({
      endDate: e.detail.value
    });
  },

  loadAggrProposalCount: function(e){
    var beginDate = new Date(this.dates.beginDate).getTime(),
        endDate = new Date(this.dates.endDate).getTime();
    if(beginDate > endDate){
      return '开始时间不能大于结束时间';
    }
  },

  /**
   * 
   * 选择年份改变事件
   */
  yearChange: function(e){
    var year = e.detail.value;
    this.setData({
      selectYear: year
    });

    wx.request({
      url: `${config.service.aggrProposalCount}`,
      data: {
        stat_year: year
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(result){

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
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
    util.showBusy('请求中...');
    var that = this;

    var now = new Date(),
      year = now.getFullYear(),
      month = parseInt(now.getMonth() + 1),
      day = now.getDate();
    var endDate = year + "-" + month + "-" + day;
    var startDate = parseInt(year - 1) + '-' + month +'-'+day;
    that.setData({
      endDate: endDate,
      beginDate: startDate,
      selectYear: year
    });

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    /**
     * 项目申报工作进度统计
     */
    wx.request({
      url: `${config.service.secondPageUrl}`,
      data: that.data.data,
      header: {
        "Content-Type":"application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        var tableData = results.data;
        if (results.status != 1 && results.data){
          var tableRow = resetData(tableData);
          that.setData({
            table1: tableRow
          });
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    /**
     * 申报项目处室分类统计
     */
    wx.request({
      url: `${config.service.secondPageUrl2}`,
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
          that.setData({
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
     * 申报项目类别分类统计
     */
    wx.request({
      url: `${config.service.secondPageUrl3}`,
      data: that.data.data3,
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成');
        var results = result.data;
        var tableData = results.data;
        var tableRow = [];
        if (results.status != 1 && tableData) {
          for (var i in tableData) {
            var obj = {
              name: '',
              data: 0,
              color: util.ringChartsColor[i],
              stroke: false,
            };
            obj.name = tableData[i].type;
            obj.data = tableData[i].count;
            obj.format = function () {
              console.log(this.name + ' ' + this.data);
              var name = this.name, data = this.data,
              nd = data;
              return nd;
            };
            tableRow.push(obj);
          }
          console.log(tableRow);
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
            legend: true,
            background: '#f5f5f5',
            padding: 0,
            dataLabel: true,
            dataPointShape: true
          });
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
    /**
     * 申报项目单位分类统计
     */
    wx.request({
      url: `${config.service.secondPageUrl4}`,
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
          // that.setData({
          //   table2: tableRow
          // });
          var categories = [], seriesData = [];
          for (var i in tableData) {
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
    /**
     * 申报项目地区分类统计
     */
    wx.request({
      url: `${config.service.secondPageUrl5}`,
      data: that.data.data5,
      header: {
        "Content-Type": "application/json"
      },
      success(result) {
        util.showSuccess('请求成功完成')
        var results = result.data;
        var tableData = results.data;
        if (results.status != 1 && results.data) {
          var tableRow = resetData(tableData);
          that.setData({
            table5: tableRow
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