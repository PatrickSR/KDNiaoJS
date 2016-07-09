/**
 * 商品model
 * 
 * @param goodsName 商品名称
 * @param goodsWeight 商品重量
 * @param goodsDesc 商品描述
 */
function Commodity(goodsName,goodsWeight,goodsDesc) {
    this.GoodsName = goodsName
    this.GoodsWeight = goodsWeight
    this.GoodsDesc = goodsDesc   
}

module.exports = Commodity