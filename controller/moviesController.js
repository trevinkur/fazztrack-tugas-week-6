const validasi = require("../helper/validasi.js")
const Movies = require("../model/Movies.js")

module.exports = {
    getAllMovies: async function(req,res) {
        
        try {
            
            const result = await Movies.get(req,res)
            return res.send(result)
        } catch(err) {
            res.status(500).send(err)
        }
    },

    getMoviesById: async function(req,res) {
         
        try {
            console.log("halo")
            const result = await Movies.getById(req,res)
            return res.send(result)
        } catch(err) {
            res.status(500).send(err)
        }
    },

    

    addMovies: async function(req,res) {
            console.log(req.file)
            try {
                validasi.img(req,res)
                const reqModifier = {
                    ...req,
                    body: {...req.body,cover: req.file.filename}
                }
                const result = await Movies.add(reqModifier,res)
                return res.send(result)
            } catch(err) {
                res.status(404).send(err)
            }
    },
    
    updateMovies: async function(req,res) {
        
        try {
            
            const result = await Movies.update(req,res)
            return res.send(result)
        } catch(err) {
            res.status(404).send(err)
        }
    },

    removeMoviesById: async function(req,res) {
        try {
            const result = await Movies.removeById(req,res)
            return res.send(result)
        } catch(err) {
            res.status(404).send(err)
        }
    },
}

