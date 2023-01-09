const videoController = require('../controllers/video.controller');
const ErrorHandler = require("../middlewares/ErrorHandler.js");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use(ErrorHandler)

    app.post("/api/video/list/youtube", async (req, res, next) => {await videoController.getYoutubeList(req, res,
        (result) => {
            console.log(result);
            res.status(200).send(result);
        }).catch(next)});

    app.post("/api/video/list/dailymotion", async (req, res, next) => {await videoController.getDailymotionList(req, res,
        (result) => {
            console.log(result);
            res.status(200).send(result);
        }).catch(next)});

    app.post("/getid", videoController.getIdIfExist);
}
