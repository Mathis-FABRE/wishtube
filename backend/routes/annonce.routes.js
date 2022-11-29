const { authJwt } = require("../middlewares");
const controller = require("../controllers/annonce.controller");

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
        [authJwt.verifyToken, authJwt.isAnnonceur],
        controller.create
    );

    app.get(
        "/api/annonce",
        [authJwt.verifyToken, authJwt.isAnnonceur],
        controller.getAllAnnoncesByAuthor
    );

    // app.post("/api/annonce/delete", controller.delete);
};
