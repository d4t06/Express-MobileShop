module.exports = function paginationMiddleware (req, res, next) {
    res.locals.page = {
        curPage: 1,
        pageSize: 10,
    };

    if (req.query.hasOwnProperty("page")) {
        console.log('pagination middleware pass');

        Object.assign(res.locals.page, {
            curPage: parseInt(req.query.page) > 1 ? 
            parseInt(req.query.page) : 
            1,
        })
    };

    next();
}