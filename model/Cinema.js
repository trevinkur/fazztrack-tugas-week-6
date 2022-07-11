const db = require("../helper/db_connection.js")

module.exports = {
    
    get: function (req,res){
        console.log(req.query.name)
        const {name, sortby="cinema_name", order="asc", limit=5, page=1} = req.query;
        const offset = (page - 1) * limit;

        
        return new Promise((resolve,reject) => {

            db.query(`SELECT * FROM cinema
            WHERE cinema_name LIKE "%${name}%"
            ORDER BY ${sortby} ${order}`,(err, results) => {

                if(err) {
                    reject({
                        message: "ERROR, Server is down",
                        status: "500"
                    })
                }
                
                const totalRow = results.length;
                const totalPage = Math.ceil(totalRow/limit);

                db.query(`SELECT * FROM cinema 
                WHERE cinema_name LIKE "%${name}%"
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
            })

            
        })

    },


    add: function(req,res) {
        return new Promise ((resolve,reject) => {
            const {cinema_name, address, cinema_logo} = req.body
            db.query(`INSERT INTO cinema ( cinema_name, address, cinema_logo ) VALUES ('${cinema_name}', '${address}', '${cinema_logo}')`, (err, results)=> {
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
            db.query(`SELECT * FROM cinema WHERE cinema_id="${req.params.id}"`, (err,result) => {
                const oldData = {
                    ...result[0],
                    ...req.body
                }
              
                const {cinema_name, address, cinema_logo}  = oldData
                db.query(`UPDATE cinema SET cinema_name="${cinema_name}",  address="${address}", cinema_logo="${cinema_logo}" 
                WHERE cinema_id="${req.params.id}"`, (err, results)=> {
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
            db.query(`DELETE FROM cinema WHERE cinema_id="${req.params.id}" ` , (err,result) => {
               console.log(err)
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