const { ifError } = require("assert");
const fs = require("fs");
const db = require("../helper/db_connection.js")


module.exports = {
    // get: function (req,res){
    //     const {page, limit=5} = req.query
    //     const offset = (page - 1) * limit
    //     return new Promise((resolve,reject) => {
    //         db.query(`SELECT * FROM movies LIMIT ${limit} OFFSET ${offset} ` , (err,result) => {
    //             console.log("get all")
    //             if(err){
    //                 console.log(err)
    //                 reject({
    //                     message: "ERROR, Server is down",
    //                     status: "500"
    //                 })
    //             }

    //             resolve({
    //                 message: "Success",
    //                 status: 200,
    //                 data: result
    //             })   
    //         })
    //     })

    // },
    get: function (req,res){
        return new Promise((resolve,reject) => {
            const {title, sortby='release_date', order="desc", limit=5, page=1} = req.query
            const offset = (page - 1) * limit

            db.query(`SELECT * FROM movies 
            WHERE title LIKE "%${title}%"
            ORDER BY ${sortby} ${order}`,(err,results) => {

                if(err) {
                    reject({
                        message: "ERROR, Server is down",
                        status: "500"
                    })
                }
                
                const totalRow = results.length;
                const totalPage = Math.ceil(totalRow/limit);
                
                db.query(`SELECT * FROM movies 
                WHERE title LIKE "%${title}%"
                ORDER BY ${sortby} ${order}
                LIMIT ${limit} OFFSET ${offset}` , (err,result) => {
                if(err){
                    reject({
                        message: "ERROR, Server is down",
                        status: "500"
                    })
                }

                resolve({
                    message: "Success",
                    status: 200,
                    totalRow: totalRow,
                    totalPage: totalPage,
                    data: result
                })   
            })
            } )
            
        })

    },

    getById: function (req,res){
        return new Promise((resolve,reject) => {
            db.query(`SELECT * FROM movies WHERE movie_id = "${req.params.id}" ` , (err,result) => {
                console.log("get by id")
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

    



    add: function(req,res) {
        return new Promise ((resolve,reject) => {
            const {title, cover, release_date, duration, director, description, cast, categories} = req.body
            db.query(`INSERT INTO movies (title, cover, release_date, duration, director, description, categories, cast)
             VALUES ('${title}', '${cover}', '${release_date}', '${duration}','${director}','${description}', '${categories}', '${cast}')`, (err, results)=> {
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
            
            db.query(`SELECT * FROM movies WHERE movie_id="${req.params.id}"`, (err,result) => {
                console.log(result)
                let oldData = {}
                if(req.body.cover) {
                    const oldCover = result[0].cover
                    fs.unlinkSync("./public/" + oldCover)
                    oldData = {
                        ...result[0],
                        ...req.body,
                        cover: req.file.filename
                    }
                } else {
                    oldData = {
                        ...result[0],
                        ...req.body,
                    }
                } 
              
                const {title, cover, release_date, director, description, cast, categories} = oldData
                

                db.query(`UPDATE movies SET title="${title}", cover="${cover}", release_date="${release_date}", director="${director}", description="${description}", categories="${categories}", cast="${cast}" 
                WHERE movie_id="${req.params.id}"`, (err, results)=> {
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
            console.log("delete")
            db.query(`SELECT cover FROM movies WHERE movie_id="${req.params.id}" ` , (err,result) => {
                      
                if(err){
                    reject({
                        message: "ERROR, Your input is wrong",
                        status: "400"
                    })
                } 
                if(result.length === 0) {
                    reject({
                        message: "ERROR, There is no Movie with such id",
                        status: "400"
                    })   
                }
                    
                const cover = result[0].cover
                

            db.query(`DELETE FROM movies WHERE movie_id="${req.params.id}" ` , (err,result) => {
                
                if(err){
                    reject({
                        message: "ERROR, Your input is wrong",
                        status: "400"
                    })
                }

                fs.unlink("./public/" + cover, (err, result) => {
                    if(err) {console.log(err)}
                    else { console.log("delete success")}
                   
                }) 
                resolve({
                    message: "Success",
                    status: 200,
                    data: result
                })   
            })
         })
        })

    }
}