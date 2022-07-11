const Booking = require("../model/Booking.js")

module.exports = {
    getAllBooking: async function(req,res) {
         
        try {
            const result = await Booking.get(req,res)
            return res.send(result)
        } catch(err) {
            res.status(500).send(err)
        }
    },

    getBookingById: async function(req,res) {
         
        try {
            const result = await Booking.getById(req,res)
            return res.send(result)
        } catch(err) {
            res.status(500).send(err)
        }
    },

    addBooking: async function(req,res) {
            try {
                const result = await Booking.add(req,res)
                return res.send(result)
            } catch(err) {
                res.status(404).send(err)
            }
    },
    
    updateBooking: async function(req,res) {
        try {
            const result = await Booking.update(req,res)
            return res.send(result)
        } catch(err) {
            res.status(404).send(err)
        }
    },

    removeBookingById: async function(req,res) {
        try {
            const result = await Booking.removeById(req,res)
            return res.send(result)
        } catch(err) {
            res.status(404).send(err)
        }
    },
}