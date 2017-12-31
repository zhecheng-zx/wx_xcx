const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

/**
 * fetch请求公共方法
 * @param {string} api      根路径
 * @param {string} path     请求路径
 * @param {object} params   参数
 * @return {Promise}        包含请求任务的Promise
 */
var fetchApi = function (api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}/${apth}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}

const ringChartsColor = ["#727cf7", "#6856ec", "#00de9d", "#14cefd", "#05a4ff", "#0964ed", "#a46cf1"],
  barChartsColor = ["#2a96fa"];

module.exports = { formatTime, showBusy, showSuccess, showModel, fetchApi, barChartsColor, ringChartsColor }
