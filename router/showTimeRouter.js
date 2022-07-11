const express = require("express")
const router = express.Router()
const showTimeController = require("../controller/showTimeController.js")
const {checkAuthAdmin} = require("../helper/checkAuth.js")

router.get("/", showTimeController.getAllShowTime);
router.get("/:id", showTimeController.getShowTimeByCinemaId);
router.post("/", checkAuthAdmin, showTimeController.addShowTime)
router.patch("/", checkAuthAdmin, showTimeController.updateShowTime)
router.patch("/:id", checkAuthAdmin, showTimeController.updateShowTimeById)
router.delete("/:id", checkAuthAdmin, showTimeController.removeShowTimeById)

module.exports = router;