var crypto = require('crypto');
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

exports.encrypt = encrypt
exports.MD5 = MD5
exports.base64 = base64
