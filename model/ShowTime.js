const db = require("../helper/db_connection.js")

module.exports = {
    get: function (req,res){
        return new Promise((resolve,reject) => {
            const {sortby='cinema_id', order="asc", limit=6, page=1} = req.query
            const offset = (page - 1) * limit

            db.query(`SELECT * from show_time
            ORDER BY ${sortby} ${order}`, (err, results) => {
                if(err) {
                    reject({
                        message: "ERROR, Server is down",
                        status: "500"
                    })
                }
                
                const totalRow = results.length;
                const totalPage = Math.ceil(totalRow/limit);

                db.query(
                    `SELECT * from show_time
                    ORDER BY ${sortby} ${order}
                    LIMIT ${limit} OFFSET ${offset}`
                     , (err,result) => {
                            console.log(result)
                    
                            if(err){
                        reject({
                            message: "ERROR, Server is down",
                            status: "500"
                        })
                    }
    
                    resolve({
                        message: "Berhasil",
                        status: 200,
                        totalRow: totalRow,
                        totalPage: totalPage,
                        data: result
                    })   
                })
            } )
            
        })

    },

    getByCinemaId: function (req,res){
        return new Promise((resolve,reject) => {
            const { limit=6, page=1} = req.query
            const offset = (page - 1) * limit

            db.query(`SELECT * from show_time
            WHERE cinema_id = ${req.params.id} 
            `, (err, results) => {
                if(err) {
                    reject({
                        message: "ERROR, Server is down",
                        status: "500"
                    })
                }
                
                const totalRow = results.length;
                const totalPage = Math.ceil(totalRow/limit);
                
                    db.query(`
                    SELECT * from show_time
                    WHERE cinema_id = ${req.params.id} 
                    LIMIT ${limit} OFFSET ${offset}` , (err,result) => {
                            if(err){
                                console.log(err)
                        reject({
                            message: "ERROR, Server is down",
                            status: "500"
                        })
                    }
    
                    resolve({
                        message: "Berhasil",
                        status: 200,
                        totalRow: totalRow,
                        totalPage: totalPage,
                        data: result
                    })   
                })
                
                
            })
            
        })

    },

    add: function(req,res) {
        return new Promise ((resolve,reject) => {
            const {schedule_id, cinema_id, status_room, show_time} = req.body
            db.query(`INSERT INTO show_time (schedule_id,  cinema_id, status_room, show_time ) 
            VALUES ('${schedule_id}', "${cinema_id}", "${status_room}", "${show_time}")`, (err, results)=> {
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
    },

    updateById: function(req,res) {
        return new Promise ((resolve,reject) => {
            console.log(req.params.id)
            db.query(`SELECT * FROM show_time WHERE show_time_id="${req.params.id}"`, (err,result) => {
                const oldData = {
                    ...result[0],
                    ...req.body
                }
              
                const { cinema_id, status_room, show_time, room} = oldData
                db.query(`UPDATE show_time SET show_time='${show_time}', 
                cinema_id="${cinema_id}", status_room="${status_room}", room="${room}" 
                WHERE show_time_id="${req.params.id}"`, (err, results)=> {
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

           
        })
    },

    // update: function(req,res) {
    //     return new Promise ((resolve,reject) => {
    //         const {cinema, room, show_time} = req.query
            
    //         db.query(`SELECT * FROM show_time WHERE cinema_id="${cinema}" 
    //         AND room="${room}" AND show_time="${show_time}"`, (err,result) => {

    //             if(err) {
    //                 reject({
    //                   message: "ERROR, your input is wrong",
    //                   status: 404
    //                })
    //               }
                
    //             result.map((item, i) => {
    //                 let oldData = {
    //                     ...item[i],
    //                     ...req.body
    //                 }
    //                 let { status_room, schedule} = oldData
    //                 db.query(`UPDATE show_time SET schedule='${schedule}', 
    //                 status_room="${status_room}" 
    //                 WHERE cinema_id="${cinema}" 
    //                 AND room="${room}" AND show_time="${show_time}"`, (err, results)=> {
    //                     if(err) {
    //                       reject({
    //                         message: "ERROR, your input is wrong",
    //                         status: 404
    //                      })
    //                     }
                       
    //                   })
    //             })

    //             resolve({
    //                 message: "Success",
    //                 status: 200,
    //               })

    //         })

           
    //     })
    // },

    update: function(req,res) {
        return new Promise ((resolve,reject) => {
            const {cinema, room, show_time} = req.query
            const { status_room, schedule_id} = req.body

            db.query(`UPDATE show_time SET schedule_id='${schedule_id}', 
            status_room="${status_room}" 
            WHERE cinema_id="${cinema}" 
            AND room="${room}" `, (err, results)=> {
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
            db.query(`DELETE FROM show_time WHERE show_time_id="${req.params.id}" ` , (err,result) => {
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