const { authJwt } = require("../middlewares");
const controller = require("../controllers/playlist.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/playlist/create",
        [authJwt.verifyToken],
        controller.create
    );

    app.post(
        "/api/playlist/addVideo",
        [authJwt.verifyToken],
        controller.addVideo
    );

    app.post("/api/playlist/exist",
        [authJwt.verifyToken],
        controller.videoInUser);

    app.post("/api/playlist/addVideoToMaPlaylist",
        [authJwt.verifyToken],
        controller.addVideoToMaPlaylist);
};
