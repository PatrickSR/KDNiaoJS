var config = {
    test:{
        //测试环境
        //在线下单url
        orderServiceUrl : "http://testapi.kdniao.cc:8081/api/oorderservice/",
        //快递查询
	    baseUrl : "http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx"

    },
    product:{
        //生产环境
        //在线下单url
        orderServiceUrl : "http://testapi.kdniao.cc:8081/api/oorderservice/",
        //快递查询
	    baseUrl : "http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx"
    }
}

/**
 * 测试环境
 */

module.exports = config