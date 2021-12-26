const User = require("./DB/User")
const AccessToken = require("./DB/AccessToken")
const jwt = require("jsonwebtoken")
require("dotenv").config()

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SALT, (err, user) => {
        if (err) return res.sendStatus(403)
        User.findById(user._id, function (err, user) {
            if (err) {
                return console.error(err)
            } else {
                let lastToken = user.refToken[user.refToken.length - 1]
                AccessToken.findById(lastToken, function (err, token) {
                    if (err) { return console.error(err) }
                    if (token.created <= (Date.now() - process.env.TTTL)) {
                        return res.status(401).send({ message: "Token Expired" }).end()
                    } else {
                        req.user = user
                        next()
                    }
                })
            }
        })
    })
}

module.exports = authMiddleware