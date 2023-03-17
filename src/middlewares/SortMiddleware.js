module.exports = function SortMiddleware ( req, res, next) {
    res.locals.sort = {
        enable: false,
        column: '',
        type : 'desc',
    };

    if (req.query.column) {
        console.log('sort middleware pass');

        const isValidType = ['asc', 'desc'].includes(req.query.type)
        const isValidColumn = ["cur_price", "intallment"].includes(req.query.column);

        Object.assign(res.locals.sort, {
            enable: true,
            type: isValidType ? req.query.type : 'desc',
            column: isValidColumn ? req.query.column : 'name'
        })
    } else {
        // không cần else ở đay bì, mỗi một request sẽ có res.locals.sort mới
    }
    
    next()
}