const { authJwt } = require("../middlewares");
const controller = require("../controllers/annonce.controller");
const multer = require('../middlewares/multer-config');
const fileHelper = require("../helper/fileHelper")

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

    app.patch(
        "/api/annonce/changeActivationStatus",
        [authJwt.verifyToken, authJwt.isAnnonceur],
        controller.changeActivationStatusAnnonce
    );

    app.post(
        "/api/annonce/update",
        [authJwt.verifyToken, authJwt.isAnnonceur, multer],
        controller.updateAnnonce
    );

    app.delete(
        "/api/annonce/delete",
        [authJwt.verifyToken, authJwt.isAnnonceur, multer],
        controller.deleteAnnonce
    );

    app.get(
        "/api/annonce",
        [authJwt.verifyToken, authJwt.isAnnonceur],
        controller.getAllAnnoncesByAuthor
    );

    app.get("/api/annonce/:file", controller.getAnnonceFile);

    app.get(
        "/api/annonce/all",
        controller.getAllAnnonces
    );

    app.get("/api/images/:file", (req, res) => {
        const fileName = req.params.file;
        const directoryPath = __basedir + "/images/";

        res.sendFile(directoryPath + fileName, function(err) {
            if (err) {
                return res.status(500).end();
            } else {
                return res.status(200).end();
            }
        });

    });

    app.get("/api/images", fileHelper.getListFiles);
};
