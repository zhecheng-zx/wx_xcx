/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://f7ihczsu.qcloud.la',
    //host2 = 'http://58.16.181.24:9210/mis-web/platform/';
  host2 = 'https://bigdata.gxst.gov.cn/mis-web/platform/';

var config = { 

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        host2,
        loginURL1: `${host2}/xcxLogin`,
        changPwd: `${host2}/changPwd`,
        validate: `${host2}/xcxValidate`,
        firstPage: `${host2}/xcxOaFirstPage`,
        secondPage: `${host2}/xcxOaSecondPage`,
        thirdPage: `${host2}/xcxOaThirdPage`,
        fourthPage: `${host2}/xcxOaFourthPage`,
        finalPage: `${host2}/xcxOaFinalPage`,
        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口 
        uploadUrl: `${host}/weapp/upload`,
        
        //科技项目按状态统计接口
        secondPageUrl: `${host2}/aggrProposalStatusXcx`,

        //科技项目按处室统计接口
        secondPageUrl2: `${host2}/aggrProposalAdminOrgName`,

        //科技项目按分类统计接口
        secondPageUrl3: `${host2}/aggrProposalGuideApp`,

        //科技项目按单位统计接口
        secondPageUrl4: `${host2}/aggrProposalOrgType`,

        //科技项目按地区统计接口
        secondPageUrl5: `${host2}/aggrProposalArea`,

        secondPageUrl6: `${host2}/aggrProposalCount`,

        //科技单位按类别统计接口
        threePageUrl: `${host2}/aggrOrgTotalApp`,

        //科技单位按地区统计接口
        threePageUrl2: `${host2}/aggrProposalArea`,

        //科技单位按机构类别统计
        threePageUrl3: `${host2}/aggrOrgType`,

        //科技工作者按角色统计接口
        fourPageUrl: `${host2}/aggrPersonRole`,

        //科技工作者申报人/专家按地区统计接口
        fourPageUrl2: `${host2}/aggrPersonRoleArea`,

        //科技工作者按单位类别统计接口
        fourPageUrl3: `${host2}/aggrPersonOrgType`,

        //科技工作者按高层次人才统计接口
        fourPageUrl4: `${host2}/aggrPersonTalent`,
    }
};

module.exports = config;
