module.exports = function SortMiddleware ( req, res, next) {
    res.locals._sort = {
        enable: false,
        type : 'desc',
    };

    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        Object.assign(res.locals._sort, {
            enable: true,
            type: isValidType ? req.query.type : 'desc',
            column: req.query.column
        })
    };
    
    next()
}