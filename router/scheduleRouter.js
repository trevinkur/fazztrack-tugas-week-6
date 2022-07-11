const express = require("express")
const router = express.Router()
const scheduleController = require("../controller/scheduleController.js")
const {checkAuthAdmin} = require("../helper/checkAuth.js")

router.get("/", scheduleController.getAllSchedule);
router.get("/:id", scheduleController.getScheduleByMovieId);
router.post("/", checkAuthAdmin, scheduleController.addSchedule)
router.patch("/:id", checkAuthAdmin, scheduleController.updateSchedule)
router.delete("/:id", checkAuthAdmin, scheduleController.removeScheduleById)

module.exports = router;