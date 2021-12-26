const { Router } = require('express')
const router = Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require("../DB/User")
const AccessToken = require("../DB/AccessToken")
require('dotenv').config()

router.post('/', (req, res, next) => {
    User.findOne({ user: req.body.user }, async function (err, user) {
        if (err) {
            console.error(err)
            return next()
        } else if (user) {
            let pass = crypto.pbkdf2Sync(req.body.password, process.env.SALT, 10000, 512, `sha512`).toString(`base64`)
            if (user.hashPassword === pass.toString()) {
                let token = jwt.sign(JSON.stringify(user), process.env.SALT);
                let accessToken = new AccessToken({ userId: user._id, token });
                user.refToken.push(accessToken)
                user.save(function (err, user) {
                    if (err) {
                        return console.error(err)
                    } else {
                        accessToken.save(function (err, aToken) {
                            if (err) {
                                return console.error(err)
                            }
                            else {
                                res.json({ token_type: 'bearer', token: aToken.token }).end()
                            }
                        })
                    }
                })
            } else {
                res.json({ message: "Invalid credentials" }).end()
            }
        } else {
            res.json({ message: "Invalid username" }).end()
        }
    })
})

module.exports = router