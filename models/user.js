/**
 * 收件人/发件人信息
 * 
 * @param name 姓名
 * @param tel 手机/固话
 * @param postCode 邮政编码
 * @param provinceName 省份 (如广东省,不要缺 少“省”)
 * @param cityName 城市名 (如深圳市,不要缺 少“市”)
 * @param expAreaName 区名 (如福田区,不要缺 少“区”或“县”)
 * @param address 发件详细地址
 */
function User(name,tel,postCode,provinceName,cityName,expAreaName,address) {
    this.Name = name
    this.Tel = tel
    this.PostCode = postCode
    this.ProvinceName = provinceName
    this.CityName = cityName
    this.ExpAreaName = expAreaName
    this.Address = address
    // this.type = type
}

module.exports = User