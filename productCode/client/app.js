//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')


App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    data: {
      loginFlag: "0",
      userName: "",
      token:"",
      role:""
    }  
})