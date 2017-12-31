// pages/dateSelect/dateSelect.js

var Moment = require("utils/Moment.js");

var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth()+1
var DATE_DAY = new Date().getDate()

Page({
  data:{
    beginDate: '',
    endDate: '2017-12-31',
    index: 0
  },
  onLoad:function(options){
    
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e)
    this.setData({
      beginDate: e.detail.value
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  dateData: function () {
    let dataAll = []//总日历数据
    let dataAll2 = []//总日历数据
    let dataMonth = []//月日历数据
    let date = new Date//当前日期
    let year = date.getFullYear()//当前年
    let week = date.getDay();//当天星期几
    let weeks = []
    let month = date.getMonth() + 1//当前月份
    let day = date.getDate()//当天
    let daysCount = 365 //一共显示多少天
    let dayscNow = 0//计数器
    let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]//月份列表
    let nowMonthList = []//本年剩余年份
    for (let i = month; i < 13; i++) {
      nowMonthList.push(i)
    }
    let yearList = [year]//年份最大可能
    for (let i = 0; i < daysCount / 365 + 2; i++) {
      yearList.push(year + i + 1)
    }
    let leapYear = function (Year) {//判断是否闰年 
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
      } else { return (false); }
    }
    for (let i = 0; i < yearList.length; i++) {//遍历年
      let mList
      if (yearList[i] == year) {//判断当前年份
        mList = nowMonthList
      } else {
        mList = monthList
      }
      for (let j = 0; j < mList.length; j++) {//循环月份
        dataMonth = []
        let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let t_days_thisYear = []
        if (yearList[i] == year) {
          for (let m = 0; m < nowMonthList.length; m++) {
            t_days_thisYear.push(t_days[mList[m] - 1])
          }
          t_days = t_days_thisYear
        } else {
          t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }
        for (let k = 0; k < t_days[j]; k++) {//循环每天
          dayscNow++
          let nowData
          if (dayscNow < daysCount) {//如果计数器没满
            let days = k + 1
            if (days < 10) {
              days = "0" + days
            }
            if (yearList[i] == year && mList[j] == month) {//判断当年当月
              if (k + 1 >= day) {
                nowData = {
                  year: yearList[i],
                  month: mList[j],
                  day: k + 1,
                  date: yearList[i] + "" + mList[j] + days,
                  selected: 0,
                  re: yearList[i] + "-" + mList[j] + "-" + days,
                }
                dataMonth.push(nowData)
                if (k + 1 == day) {
                  let date = new Date(yearList[i] + "-" + mList[j] + "-" + (k + 1))
                  let weekss = date.getDay()//获取每个月第一天是周几
                  weeks.push(weekss)
                }
              }
            } else {//其他情况
              nowData = {//组装自己需要的数据
                year: yearList[i],
                month: mList[j],
                day: k + 1,
                date: yearList[i] + "" + mList[j] + days,
                selected: 0,
                re: yearList[i] + "-" + mList[j] + "-" + days,
              }
              dataMonth.push(nowData)
              if (k == 0) {
                let date = new Date(yearList[i] + "-" + mList[j] + "-" + k + 1)
                let weekss = date.getDay()//获取每个月第一天是周几
                weeks.push(weekss)
              }
            }
          } else {
            break
          }
        }
        dataAll.push(dataMonth)
      }
    }
    for (let i = 0; i < dataAll.length; i++) {
      if (dataAll[i].length != 0) {
        dataAll2.push(dataAll[i]);
      }
    }
    this.setData({
      date: dataAll2,
      weeks: weeks
    })
  }
})