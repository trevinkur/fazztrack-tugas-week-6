const db = require("../helper/db_connection.js")

module.exports = {
    getById: function (req,res){
        return new Promise((resolve,reject) => {
            db.query(`SELECT *
                FROM invoice
                WHERE invoice_id = "${req.params.id}"
                ` , (err,results) => {
                    console.log(results)
                if(err) {
                    console.log(err)
                        reject({
                            message: "ERROR, Server is down",
                            status: "500"
                        })
                } 
                resolve({
                    message: "Success",
                    status: 200,
                    data: results
                })
            })
        })

    },

    get: function (req,res){
        return new Promise((resolve,reject) => {
            db.query(`SELECT *
                FROM invoice
                ` , (err,results) => {
                if(err) {
                    console.log(err)
                        reject({
                            message: "ERROR, Server is down",
                            status: "500"
                        })
                } 
                resolve({
                    message: "Success",
                    status: 200,
                    data: results
                })
            })
        })

    },

    add:function(req,res) {
        return new Promise ((resolve,reject) => {
            console.log(req.body.payment_method)
            
                db.query(` INSERT INTO invoice(invoice.booking_id, total_payment, count, seat)
                SELECT booking.booking_id, SUM(booking_seat.price), 
                COUNT(booking.booking_id), CONCAT(booking.seat)
                FROM booking 
                JOIN booking_seat
                    On booking.booking_seat_id = booking_seat.booking_seat_id
                WHERE booking.user_id ="${req.body.user_id}"
                `, (err, results)=> {
                    if(err) {
                        console.log(err)
                        reject({
                            message: "ERROR, your input is wrong",
                            status: 404
                        })
                    }
                    resolve({
                        message: "Success",
                        status: 200,
                        data: results
                    })
               
            })
           
            
        })
    },

    update: function(req,res) {
        return new Promise ((resolve,reject) => {
            db.query(`UPDATE invoice SET payment_method="${req.body.payment_method}" 
            WHERE invoice_id="${req.params.id}"`, (err, results) => {

                if(err) {
                    console.log(err)
                    reject({
                        message: "ERROR, your input is wrong",
                        status: 404
                    })
                }

                resolve({
                message: "Success",
                status: 200,
                data: results
                })
            })

           
        })
    },

    removeById: function (req,res){
        return new Promise((resolve,reject) => {
            db.query(`DELETE FROM booking WHERE booking_id="${req.params.id}" ` , (err,result) => {
                if(err){
                    reject({
                        message: "ERROR, Server is down",
                        status: "500"
                    })
                }

                resolve({
                    message: "Berhasil",
                    status: 200,
                    data: result
                })   
            })
        })

    },
}