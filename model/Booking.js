const db = require("../helper/db_connection.js")

module.exports = {
    getById: function (req,res){
        return new Promise((resolve,reject) => {
            console.log("hello")
            db.query(`SELECT CONCAT(users.first_name, " ", users.last_name) AS fullname,
                SUM(booking_seat.price) AS totalPayment,
                COUNT(booking_id) as tickets,
                GROUP_CONCAT(booking_seat.seat) AS seat,
                cinema.cinema_name,
                show_time.schedule_id, show_time.show_time,
                schedule.schedule, movies.title
                FROM booking
                JOIN booking_seat
                  ON booking.show_time_id = booking_seat.show_time_id AND booking.seat = booking_seat.seat
                JOIN show_time 
                  ON booking.show_time_id = show_time.show_time_id
                JOIN users
                  ON booking.user_id = users.user_id
                JOIN cinema
                  ON show_time.cinema_id = cinema.cinema_id
                JOIN schedule
                  ON show_time.schedule_id = schedule.schedule_id
                JOIN movies
                  ON schedule.movie_id = movies.movie_id 
                WHERE users.user_id = "${req.params.id}"
                GROUP BY users.user_id
                ` , (err,result) => {
                if(err) {
                    console.log(err)
                        reject({
                            message: "ERROR, Server is down",
                            status: "500"
                        })
                }
                resolve({
                    message: "SUCCESS",
                    status: 200,
                    data: result
                        
                })  
               
            })
        })

    },

    get: function (req,res){
        return new Promise((resolve,reject) => {
            db.query(`SELECT *
                FROM booking
                JOIN booking_seat
                  ON booking.show_time_id = booking_seat.show_time_id AND booking.seat = booking_seat.seat
                JOIN show_time 
                  ON booking.show_time_id = show_time.show_time_id
                JOIN users
                  ON booking.user_id = users.user_id
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
            
            const {seat, show_time_id, user_id, } = req.body
            db.query(`INSERT INTO booking (seat, show_time_id, user_id) 
                VALUES ('${seat}', '${show_time_id}', '${user_id}' );
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
            db.query(`SELECT * FROM booking WHERE booking_id="${req.params.id}"`, (err,result) => {
                const oldData = {
                    ...result[0],
                    ...req.body
                }
              
                const {seat, show_time_id, user_id}  = oldData
                db.query(`UPDATE booking SET seat="${seat}",show_time_id="${show_time_id}", price="${user_id}}"
                WHERE booking_id="${req.params.id}"`, (err, results)=> {
                    console.log(err)
                    if(err) {
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