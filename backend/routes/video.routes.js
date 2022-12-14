const videoController = require('../controllers/video.controller');

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("api/video/list/youtube", async () => {await videoController.getYoutubeList()});

    app.get("api/video/list/dailymotion", async () => {await videoController.getDailymotionList()});
}
