const url = require('url')

module.exports = (ctx, next) => {
    const { req } = ctx
    console.log(req.url);
    const { pathname, query } = url.parse(req.url, true)
    ctx.path = pathname
    ctx.query = query
    ctx.method = req.method.toLowerCase()
    return next()
}