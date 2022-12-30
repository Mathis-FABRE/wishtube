const videoService = require('../services/video.service');

exports.getYoutubeList =  async (req, res, callback) => {
    await videoService.getYoutubeList(req.body.term, req.body.maxRes,
        (result) => {
            callback(result)
        });
}

exports.getDailymotionList = async (req, res, callback) => {
    await videoService.getDailymotionList(req.body.term, req.body.maxRes,
        (result) => {
            callback(result)
        });
}
