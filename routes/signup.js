const {Router} = require('express')
const router = Router()
const crypto = require('crypto')
const User = require("../DB/User")
require('dotenv').config()
router.post('/', (req, res, next) => {
    const { user, password } = req.body
    User.findOne({ user: user }, async function (err, user) {
      if (err) {
        console.error(err)
        return next()
      }
      if (!user) {
        const hashPassword = crypto.pbkdf2Sync(password, process.env.SALT, 10000, 512, 'sha512').toString('base64')
        let user = new User({ user: req.body.user, hashPassword })
        user.save(function (err, user) {
          if (err) {
            console.error(err)
          }
          res.json({ message: "Successfully registered" }).end()
          next()
        })
      }
      else {
        res.json({ message: "User already exists" }).end()
      }
    })
  })


module.exports = router