//快递鸟快递API
var request = require('request');
var tools = require('./utils/kdniaotools')

function KDNiao(businessId, appkey) {
    checkArgs(businessId, "businessId")
    checkArgs(appkey, "appkey")

    this.businessId = businessId;
    this.appkey = appkey;
}

//支付方式 现金
KDNiao.PAY_TYPE_CASH = 1

/**
 * 查询快递
 * @param companyCode 快递公司编码
 * @param expCode 快递单号
 */
KDNiao.prototype.queryExpress = function(companyCode, expCode, callback) {
    checkArgs(companyCode, 'companyCode')
    checkArgs(expCode, 'expCode')
    checkArgs(callback, 'callback')

    var requestData = {
        OrderCode: "",
        ShipperCode: companyCode,
        LogisticCode: expCode
    }

    //Sign签名生成
    var dataSign = tools.encrypt(requestData, this.appkey, "utf8");

    var sysParams = tools.createSysParams(1002, this.businessId, requestData, dataSign)

    var requestObj = tools.createRequest("http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx", sysParams)

    request(requestObj, function(error, response, body) {
        if (error) {
            callback(error)
        } else {
            callback(error, body)
        }
    });
}

/**
 * 在线下单接口
 * 
 * @param companyCode 快递公司编码
 * @param orderCode 订单编号
 * @param payType 支付方式 1-现付,2-到付,3-月结, 4-第三方支付
 * @param expType 快递类型:1-标准快件
 * @param receiver 收件人
 * @param sender 发件人
 * @param commodity 商品
 */
KDNiao.prototype.orderOnline = function(companyCode, orderCode, payType, expType, receiver, sender, commodity, callback) {
    checkArgs(companyCode, "companyCode")
    checkArgs(orderCode, "orderCode")
    checkArgs(payType, "payType")
    checkArgs(expType, "expType")
    checkArgs(receiver, "receiver")
    checkArgs(sender, "sender")
    checkArgs(commodity, "commodity")

    var requestData = {
        ShipperCode: companyCode,
        OrderCode: orderCode,
        PayType: payType,
        ExpType: expType,
        Receiver: receiver,
        Sender: sender,
        Commodity: commodity
    }
    var s = JSON.stringify(requestData)
    var dataSign = tools.encrypt(requestData, this.appkey, "utf8")

    var sysParams = tools.createSysParams(1001, this.businessId, requestData, dataSign)

    var requestObj = tools.createRequest("http://testapi.kdniao.cc:8081/api/oorderservice/", sysParams)

    request(requestObj, function(error, response, body) {
        if (error) {
            callback(error)
        } else {
            callback(error, body)
        }
    })
}

function checkArgs(param, paramName) {
    if (typeof param === 'undefined' || param === null) {
        throw new Error('argument [' + paramName + '] is invalid');
    }
}

module.exports = KDNiao