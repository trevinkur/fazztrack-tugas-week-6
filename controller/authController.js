const Auth = require("../model/Auth.js")

module.exports = {
    authLogin: async function(req,res) {
         
        try {
            const result = await Auth.login(req,res)
            return res.send(result)
        } catch(err) {
            res.status(500).send(err)
        }
    },

    authRegister: async function(req,res) {
         
        try {
            const result = await Auth.register(req,res)
            return res.send(result)
        } catch(err) {
            res.status(500).send(err)
        }
    },

   
}