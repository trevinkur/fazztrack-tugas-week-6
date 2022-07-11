const express = require("express");
const app = express()
const moviesRouter = require("./moviesRouter.js");
const bookingRouter = require("./bookingRouter.js")
const scheduleRouter = require("./scheduleRouter.js");
const bookingSeatRouter = require("./bookingSeatRouter.js")
const cinemaRouter = require("./cinemaRouter.js")
const usersRouter = require("./usersRouter.js")
const invoiceRouter = require("./invoiceRouter.js")
const authRouter = require("./authRouter.js")
const showTimeRouter = require("./showTimeRouter.js") 


app.use("/movies", moviesRouter)
app.use("/schedule", scheduleRouter)
app.use("/booking", bookingRouter)
app.use("/booking-seat", bookingSeatRouter)
app.use("/cinema", cinemaRouter)
app.use("/users", usersRouter)
app.use("/invoice", invoiceRouter)
app.use("/authentication", authRouter)
app.use("/show-time", showTimeRouter)

module.exports = app