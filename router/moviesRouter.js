const { Router } = require("express")
const express = require("express")
const router = express.Router()
const moviesController = require("../controller/moviesController.js")
const upload = require("../helper/uploads.js")
const {checkAuthAdmin} = require("../helper/checkAuth.js")


router.get("/", moviesController.getAllMovies)
router.get("/:id", moviesController.getMoviesById)
router.post("/", checkAuthAdmin, upload.single("cover"), moviesController.addMovies)
router.patch("/:id", checkAuthAdmin, upload.single("cover"), moviesController.updateMovies)
router.delete("/:id", checkAuthAdmin, moviesController.removeMoviesById)

module.exports = router;