const express = require("express")
const router = express.Router()
const cinemaController = require("../controller/cinemaController.js")
const {checkAuthAdmin} = require("../helper/checkAuth.js")

router.get("/", cinemaController.getAllCinema);
router.post("/", checkAuthAdmin, cinemaController.addCinema)
router.patch("/:id", checkAuthAdmin, cinemaController.updateCinema)
router.delete("/:id", checkAuthAdmin, cinemaController.removeCinemaById)

module.exports = router;