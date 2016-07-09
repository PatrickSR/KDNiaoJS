var crypto = require('crypto');

// var url = "http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx"
// var orderOnlineUrl = "http://testapi.kdniao.cc:8081/api/oorderservice/"

/**
 * DataType 2是json，默认都是json
 */
var DATATYPE_JSON = 2;

/**
 * 创建系统级参数
 * @param requesyType 请求指令类型
 * @param businessId 电商ID，由kdniao提供
 * @param requestData 应用级参数
 * @param dataSign 应用级参数+appkey 生成的sign
 */
function createSysParams(requesyType,businessId,requestData,dataSign) {
    return {
        RequestData: encodeURI(JSON.stringify(requestData)),
        EBusinessID: businessId,
        RequestType: requesyType,
        DataSign: encodeURI(dataSign),
        DataType: DATATYPE_JSON
    }
}

/**
 * 创建请求对象
 */
function createRequest(url,form) {
    return {
        method: 'POST',
        url:url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: form
    }
}

/**
 * 电商Sign签名生成
 */
function encrypt(requestData, appKey, charset) {
    var content = JSON.stringify(requestData)

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

exports.createSysParams = createSysParams
exports.createRequest = createRequest
exports.encrypt = encrypt
exports.MD5 = MD5
exports.base64 = base64
