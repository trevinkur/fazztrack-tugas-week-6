const { addCinema } = require("../controller/cinemaController");


module.exports = {
    img: function(req, res) {
        if(req.file.size > 1000000) {
            return res.send({message: "File terlalu besar"})
        }
        format = ["jpeg", "jpg", "png", "webv"]
        ada = []
        format.map(str => {
            if(req.file.filename.indexOf(str) === req.file.filename.length - str.length) {
                console.log(str)
                return ada.push(str)
            }
        });

        if(ada.length === 0) {
            console.log("tidak ada")
            return res.send({message: "format tidak didukung"})
        }
        
    } 
}