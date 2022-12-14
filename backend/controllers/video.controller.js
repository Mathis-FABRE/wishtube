const videoService = require('../services/video.service');

exports.getYoutubeList =  async (req, res, next) => {
    try {
        const data = await videoService.getYoutubeList(req.body.term, req.body.maxRes);
        return res.send({message: 'success', data: data});
    }
    catch (e) {
        next(e);
    }
}

exports.getDailymotionList = async (req, res, next) => {
    try {
        const data = await videoService.getDailymotionList(req.body.term, req.body.maxRes);
        return res.send({message: 'success', data: data});
    }
    catch (e) {
        next(e);
    }
}
