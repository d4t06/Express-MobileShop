module.exports = function paginationMiddleware (req, res, next) {
    res.locals._page = {
        curPage: 1,
        pageSize: 10,
    };

    if (req.query.hasOwnProperty("_page")) {
        Object.assign(res.locals._page, {
            curPage: parseInt(req.query._page) > 1 ? 
            parseInt(req.query._page) : 
            1,
        })
    };

    next();
}