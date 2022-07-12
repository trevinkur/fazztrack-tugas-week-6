const db = require("../helper/db_connection");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const validator = require("validator")

module.exports = {
    login: function(req,res) {
        return new Promise ((resolve,reject) => {
            const {password, email} = req.body
            db.query(`SELECT user_id, password, role FROM users WHERE email="${email.toLowerCase()}"`, (err,results) => {
                const hash = results[0].password
                if(results.length === 0) {
                    reject({
                        message: "Email tidak ditemukan",
                     })
                }
                 bcrypt.compare(password, hash, function(err, result) {
                    console.log(password, hash)
                    console.log(result)
                    if(err) {
                        reject({
                            message: "There is something wrong please try again",
                            status: 500
                         })
                    }
                    if(result) {
                        const token = jwt.sign({user_id: results[0].user_id, role: results[0].role }, process.env.PRIVATE_KEY)
                        resolve({
                            message: "Success",
                            status: 200,
                            data: {
                                user_id: results[0].user_id,
                                token: token
                            }
                          })
                    } else {
                        reject({
                            message: "Email/Password is wrong",
                         })
                    }
                })
                

            })
        })
    },

    register: function(req,res) {
        const {first_name, last_name, password, email, phone_number, profile_pitcure} = req.body
        return new Promise ((resolve,reject) => {
    
            console.log(password)
            bcrypt.hash(password, 10, function(err, hash) {
                if(err) {
                    reject({
                        message: "ERROR, your input is wrong",
                        status: 404
                     })
                } else if(!validator.isEmail(email)) {
                    reject({
                        message: "please, input an email!",
                        status: 400
                     })
                } else if(!validator.isMobilePhone(phone_number, "id-ID")) {
                    reject({
                        message: "please, input correct phone Number!",
                        status: 400
                     })
                } else {
                    db.query(`INSERT INTO users (first_name, last_name, password, email, phone_number, profile_pitcure) 
                    VALUES ('${first_name}', '${last_name}','${hash}', '${email}', '${phone_number}', '${profile_pitcure}')`, (err, results)=> {
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
                }
               
            });
            
            
    
        })
    }
}
