const db = require("../helper/db_connection.js")
const bcrypt = require("bcrypt")
const fs = require("fs")
module.exports = {
    get: function (req,res){
        return new Promise((resolve,reject) => {
            db.query(`SELECT * 
                FROM users` , (err,result) => {
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

    getId:  function (req,res){
        return new Promise((resolve,reject) => {
            db.query(`SELECT * 
                FROM users 
                WHERE user_id = "${req.params.id}"` , (err,result) => {
                console.log(req.params.id)
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
    
    add:function(req,res) {
        return new Promise ((resolve,reject) => {
            const {first_name, last_name, password, email, phone_number, profile_pitcure} = req.body
            db.query(`INSERT INTO users (first_name, last_name, password, email, phone_number, profile_pitcure) 
            VALUES ('${first_name}', '${last_name}','${password}', '${email}', '${phone_number}', '${profile_pitcure}')`, (err, results)=> {
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
            if(req.body.password) {
                db.query(`SELECT * FROM users WHERE user_id="${req.params.id}"`, (err,result) => {
                    if(err) {
                        reject({
                          message: "ERROR, your input is wrong",
                          status: 404
                       })
                      }
                      let oldData = {}
                    if(req.body.profile_pitcure) {
                        const oldPitcure = result[0].profile_pitcure
                        fs.unlinkSync("./public/" + oldPitcure)

                        oldData = {
                        ...result[0],
                        ...req.body,
                        profile_pitcure: req.file.filename,
                        }
                    } else {
                        oldData = {
                            ...result[0],
                            ...req.body,
                        }
                    }
                
                    const {password, email, phone_number, profile_pitcure}  = oldData
                    bcrypt.hash(password, 10, (err, hash) => {
                        if(err) {
                            reject({
                              message: "there is something wrong please try again",
                              status: 500
                           })
                          }
                        db.query(`UPDATE users SET password="${hash}", email="${email}", 
                        phone_number="${phone_number}", profile_pitcure="${profile_pitcure}"
                        WHERE user_id="${req.params.id}"`, (err, results)=> {
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
            }
            db.query(`SELECT * FROM users WHERE user_id="${req.params.id}"`, (err,result) => {
                
                if(err) {
                    reject({
                      message: "ERROR, your input is wrong",
                      status: 404
                   })
                  }
                let oldData = {}
                if(req.body.profile_pitcure) {
                    const oldPitcure = result[0].profile_pitcure
                    fs.unlinkSync("./public/" + oldPitcure)

                    oldData = {
                        ...result[0],
                        ...req.body,
                        profile_pitcure: req.file.filename,
                    }
                } else {
                    oldData = {
                        ...result[0],
                        ...req.body,
                    }
                }
              
                const {email, phone_number, profile_pitcure}  = oldData
                db.query(`UPDATE users SET  email="${email}", 
                phone_number="${phone_number}", profile_pitcure="${profile_pitcure}"
                WHERE user_id="${req.params.id}"`, (err, results)=> {
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
            db.query(`DELETE FROM users WHERE users_id="${req.params.id}" ` , (err,result) => {
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