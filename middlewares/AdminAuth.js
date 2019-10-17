exports.verifyBasicAuth = function (req, res, next) {
    const authHeader = req.headers['authorization']

    if(typeof authHeader !== 'undefined' && authHeader.indexOf('Basic ') == 0) {
        const credentials = Buffer.from(authHeader.substring('Basic '.length), 'base64').toString('utf-8')
        const separator = credentials.indexOf(':')

        if (separator == -1) {
            res.sendStatus(403)
            return
        }
        const username = credentials.substring(0, separator)
        const password = credentials.substring(separator + 1)

        if (process.env.ADMIN_USERNAME === username && process.env.ADMIN_PASSWORD === password) {
            next()
        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(403)
    }
}