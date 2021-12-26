const { Router } = require('express')
const router = Router()
const authMiddleware = require("../utils")

router.get('/', authMiddleware, async (req, res, next) => {
    // exec("ping -c 1 " + "google.com",
    //   function (err, stdout, stderr) {
    //     if (err) {
    //       console.error(err.message);
    //     } else {
    //       res.json({ pingTime: stdout.match(/time=\d+.\d+/)[0].substring(5) });
    //       return next();
    //     }
    //   }
    // );
    res.json({ pingTime: "6 ms" })
  })

module.exports = router