const jwt = require("jsonwebtoken")

function checkAuthAdmin(req,res, next) {
    jwt.verify(req.headers.authorization, "mokeyJaya123", (err, decoded) => {
        if(err) {
            res.send({
                message: "unauthorized"
            })
        } else {
            if(decoded.role === "admin") {
                next()
            } else {
                res.send({message: "Forbidden"}) 
            }
        }
    })
}

function checkAuthUser(req,res, next) {
    jwt.verify(req.headers.authorization, "mokeyJaya123", (err, decoded) => {
        if(err) {
            res.send({
                message: "unauthorized"
            })
        } else {
            if(decoded.role === "admin" || decoded.user_id == req.params.id) {
                next()
            } else {
                res.send({message: "Forbidden"}) 
            }
        }
    })
}

module.exports = {checkAuthUser, checkAuthAdmin}