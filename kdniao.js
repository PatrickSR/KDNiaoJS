//快递鸟快递API
var request = require('request');
var tools = require('./utils/kdniaotools')

function KDNiao(businessId, appkey) {
    this.businessId = businessId;
    this.appkey = appkey;
}

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
    var dataSign = tools.encrypt(JSON.stringify(requestData), this.appkey, "utf8");

    var params = {
        RequestData: encodeURI(JSON.stringify(requestData)),
        EBusinessID: this.businessId,
        RequestType: 1002,
        DataSign: encodeURI(dataSign),
        DataType: 2
    }

    var reqOptions = {
        method: 'POST',
        url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: params
    };

    request(reqOptions, function(error, response, body) {
        // if (error) throw new Error(error);
        if (error) {
            callback(error)
        }else{
            callback(error,body)
        }
    });
}


function checkArgs(param, paramName) {
    if (typeof param === 'undefined' || param === null) {
        throw new Error('argument [' + paramName + '] is invalid');
    }
}

module.exports = KDNiao