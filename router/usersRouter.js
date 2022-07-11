const express = require("express")
const router = express.Router()
const usersController = require("../controller/usersController.js")
const {checkAuthUser, checkAuthAdmin} = require("../helper/checkAuth.js")
const upload = require("../helper/uploads.js")


router.get("/:id", usersController.getUserById)
router.get("/", checkAuthUser, usersController.getAllUser)
router.post("/", checkAuthUser, checkAuthAdmin, usersController.addUser)
router.patch("/:id", checkAuthUser, upload.single("profile_pitcure"), usersController.updateUser)
router.delete("/:id", checkAuthUser, usersController.removeUserById)

module.exports = router;