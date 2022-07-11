const db = require("../helper/db_connection.js")

module.exports = {
    get: function (req,res){
        return new Promise((resolve,reject) => {
            const {title, sortby='schedule', order="desc", limit=6, page=1} = req.query
            const offset = (page - 1) * limit

            db.query(`SELECT * from schedule
            JOIN movies 
                ON schedule.movie_id = movies.movie_id
            WHERE movies.title LIKE "%${title}%"
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
                    `SELECT movies.movie_id, movies.title, movies.cover, movies.categories,
                schedule.schedule,  schedule.place, schedule_id, 
                cinema.cinema_id, cinema.cinema_name, cinema.cinema_logo, cinema.address
                    FROM schedule 
                    JOIN cinema
                        ON schedule.cinema_id = cinema.cinema_id
                    JOIN movies 
                        ON schedule.movie_id = movies.movie_id
                    WHERE movies.title LIKE "%${title}%"
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

    getByMovieId: function (req,res){
        return new Promise((resolve,reject) => {
            const {place, schedule, cinema, limit=6, page=1} = req.query
            const offset = (page - 1) * limit

            db.query(`SELECT * from schedule 
            WHERE movie_id = "${req.params.id}" AND place = "${place}" 
            AND schedule = "${schedule}"  ${cinema ? "AND cinema_id =" + cinema : ""}
            `, (err, results) => {
                if(err) {
                    reject({
                        message: "ERROR, Server is down",
                        status: "500"
                    })
                }
                
                const totalRow = results.length;
                const totalPage = Math.ceil(totalRow/limit);
                
                    db.query(`SELECT movies.movie_id, movies.title, movies.cover, movies.categories,
                schedule.schedule, schedule.place, schedule_id, 
                cinema.cinema_id, cinema.cinema_name, cinema.cinema_logo, cinema.address
                    FROM schedule 
                    JOIN cinema
                        ON schedule.cinema_id = cinema.cinema_id
                    JOIN movies 
                        ON schedule.movie_id = movies.movie_id
                    WHERE movies.movie_id = "${req.params.id}" AND place = "${place}" AND schedule = "${schedule}"  ${cinema ? "AND cinema.cinema_id =" + cinema : ""}
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
            const {schedule, place, movie_id, cinema_id, status_room, show_time} = req.body
            db.query(`INSERT INTO schedule (schedule, place, movie_id, cinema_id ) 
            VALUES ('${schedule}', '${place}', "${movie_id}", "${cinema_id}")`, (err, results)=> {
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

    update: function(req,res) {
        return new Promise ((resolve,reject) => {
            console.log(req.params.id)
            db.query(`SELECT * FROM schedule WHERE schedule_id="${req.params.id}"`, (err,result) => {
                const oldData = {
                    ...result[0],
                    ...req.body
                }
              
                const {schedule, place, movie_id, cinema_id} = oldData
                db.query(`UPDATE schedule SET schedule='${schedule}', place='${place}', movie_id='${movie_id}'
                , cinema_id="${cinema_id}"
                WHERE schedule_id="${req.params.id}"`, (err, results)=> {
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
            db.query(`DELETE FROM schedule WHERE schedule_id="${req.params.id}" ` , (err,result) => {
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