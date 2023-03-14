module.exports = {
    convert: function(data) {
        return data.toObject()
    },
    multipleConvert: function (data) {
        return data.map(product => product.toObject())
    },
}