const express = require("express")
const router = express.Router()
const authController = require("../controller/authController.js")


router.post("/register", authController.authRegister)
router.post("/login", authController.authLogin)


module.exports = router;