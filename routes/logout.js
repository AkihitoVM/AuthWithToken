const { Router } = require('express')
const router = Router()
const AccessToken = require("../DB/AccessToken")
const authMiddleware = require("../utils")
require('dotenv').config()

router.get("/", authMiddleware, (req, res, next) => {
    if (!req.query.all) {
        res.status(400).send({ message: "Bad request" })
        return next()
    } else {
        switch (req.query.all) {
            case 'true':
                AccessToken.deleteMany({ userId: req.user._id }, function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    req.user.refToken = []
                    req.user.save(function (err, newUser) {
                        if (err) {
                            return console.log(err)
                        }
                        res.json({ success: true });
                        return next();
                    })
                })
                break;
            case 'false':
                let lastToken = req.user.refToken[req.user.refToken.length - 1]
                AccessToken.findByIdAndRemove(lastToken, function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    req.user.refToken.splice(-1)
                    req.user.save(function (err, newUser) {
                        if (err) {
                            return console.log(err)
                        }
                        res.json({ success: true });
                        return next();
                    })
                })
                break;
            default:
                break;
        }
    }
})

module.exports = router