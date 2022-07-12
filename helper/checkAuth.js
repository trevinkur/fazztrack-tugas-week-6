const jwt = require("jsonwebtoken")
require("dotenv").config()

function checkAuthAdmin(req,res, next) {
    jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY, (err, decoded) => {
        if(err) {
            res.status(401).send({
                message: "unauthorized"
            })
        } else {
            if(decoded.role === "admin") {
                next()
            } else {
                res.status(403).send({message: "Forbidden"}) 
            }
        }
    })
}

function checkAuthUser(req,res, next) {
    jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY, (err, decoded) => {
        if(err) {
            res.status(401).send({
                message: "unauthorized",
                status: 401
            })
        } else {
            if(decoded.role === "admin" || decoded.user_id == req.params.id) {
                next()
            } else {
                res.status(403).send({message: "Forbidden"}) 
            }
        }
    })
}

module.exports = {checkAuthUser, checkAuthAdmin}
