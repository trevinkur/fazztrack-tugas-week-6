const db = require("../helper/db_connection.js")

module.exports = {
    get: function (req,res){
        return new Promise((resolve,reject) => {
            const {show_time_id} = req.query
            db.query(`SELECT * FROM booking_seat 
            ${show_time_id ? "WHERE show_time_id=" + show_time_id : ""}` , (err,result) => {
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

    add: function(req,res) {
        return new Promise ((resolve,reject) => {
            const {show_time_id, seat, status_id, price} = req.body
            db.query(`INSERT INTO booking_seat (show_time_id, seat, status_id, price) VALUES ('${show_time_id},' '${seat}','${status_id}', '${price}')`, (err, results)=> {
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

    // update: function(req,res) {
    //     return new Promise ((resolve,reject) => {
    //         db.query(`SELECT * FROM booking_seat WHERE cinema_id="${req.query.cinema}" AND schedule_id=${req.query.schedule}`, (err,result) => {
    //             const oldData = {
    //                 ...result[0],
    //                 ...req.body
    //             }
              
    //             const { status_id, price, movie_id, schedule_id} = oldData
    //             db.query(`UPDATE booking_seat SET movie_id='${movie_id}',  status_id="${status_id}", price="${price}, schedule_id =${schedule_id}"
    //             WHERE cinema_id="${req.query.cinema}  `, (err, results)=> {
    //                 console.log(err)
    //                 if(err) {
    //                   reject({
    //                     message: "ERROR, your input is wrong",
    //                     status: 404
    //                  })
    //                 }
    //                 resolve({
    //                   message: "Success",
    //                   status: 200,
    //                   data: results
    //                 })
    //               })

    //         })

           
    //     })
    // },

    update: function(req,res) {
        return new Promise ((resolve,reject) => {
           
                const {showTimeId, seat} = req.query
                const { status_id, price} = req.body
                db.query(`UPDATE booking_seat SET  status_id="${status_id}", price="${price}
                WHERE show_time_id=${showTimeId}" ${seat ? "WHERE seat=" + "'" + seat + "'" : "" } `, (err, results)=> {
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
    },
    
    removeById: function (req,res){
        return new Promise((resolve,reject) => {
            db.query(`DELETE FROM booking_seat WHERE booking_seat_id="${req.params.id}" ` , (err,result) => {
                if(err){
                    reject({
                        message: "ERROR, Server is down",
                        status: "500"
                    })
                }

                resolve({
                    message: "Success",
                    status: 200,
                    data: result
                })   
            })
        })

    },
}