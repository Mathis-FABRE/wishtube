const videoService = require('../services/video.service');

exports.getYoutubeList =  async (req, res) => {
    const data = await videoService.getYoutubeList(req.body.term, req.body.maxRes);
    return res.send({message: 'success', data: data});
}

exports.getDailymotionList = async (req, res) => {
    const data = await videoService.getDailymotionList(req.body.term, req.body.maxRes);
    return res.send({message: 'success', data: data});
}
