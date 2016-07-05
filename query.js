var crypto = require('crypto');
var request = require('request');

var E_BUSINESS_ID = "请到快递鸟官网申请http://www.kdniao.com/ServiceApply.aspx"
var APPKEY = "请到快递鸟官网申请http://www.kdniao.com/ServiceApply.aspx";

/**
 * 官方查询测试数据
 */
query("ANE", "210001633605")

function query(expCode, expNo) {

    var requestData = {
        OrderCode: "",
        ShipperCode: expCode,
        LogisticCode: expNo
    }

    var dataSign = encrypt(JSON.stringify(requestData), APPKEY, "utf8");

    var params = {
        RequestData: encodeURI(JSON.stringify(requestData)),
        EBusinessID: E_BUSINESS_ID,
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
        if (error) throw new Error(error);
        
        console.log(body);
    });

}

/**
 * 电商Sign签名生成
 */
function encrypt(content, appKey, charset) {
    if (appKey) {
        return base64(MD5(content + appKey, charset), charset)
    } else {
        return base64(MD5(content, charset), charset)
    }
}

/**
 * MD5加密
 */
function MD5(content, charset) {
    return crypto.createHash('md5').update(content, charset).digest('hex');
}

/**
 * base64编码
 */
function base64(content) {
    var b = new Buffer(content)
    return b.toString("base64")
}