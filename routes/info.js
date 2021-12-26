const { Router } = require('express')
const router = Router()
const authMiddleware = require("../utils")

router.get("/", authMiddleware, (req, res, next) => {
    res.json({ userId: req.user._id }).end()
})

module.exports = router