const { authJwt } = require("../middlewares");
const controller = require("../controllers/annonce.controller");
const multer = require('../middlewares/multer-config');

const fs = require('fs');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/annonce/create",
        [authJwt.verifyToken, authJwt.isAnnonceur, multer],
        controller.create
    );

    app.get(
        "/api/annonce",
        [authJwt.verifyToken, authJwt.isAnnonceur],
        controller.getAllAnnoncesByAuthor
    );

/*    app.get("/images/:filename", (req, res) => {
        const filePath = req.protocol+ "://"+ req.hostname + ":1337" + req.originalUrl;
        console.log(filePath);
        res.download(
            filePath,
            req.params.filename, // Remember to include file extension
            (err) => {
                if (err) {
                    res.send({
                        error : err,
                        msg   : "Problem downloading the file"
                    })
                }
            });
    });*/

    app.get("/images/:file", function(req, res) {
        res.pipe(fs.createWriteStream(req.url));
    });

    // app.post("/api/annonce/delete", controller.delete);
};
