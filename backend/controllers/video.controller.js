const videoService = require('../services/video.service');
const db = require("../model");
const videodb = db.video;

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

exports.videoExists = (req, res) => {
    const filter = {url: req.body.url};
    videodb.exists({url: filter.url}, (err, result) => {
        if (err) {
            res.status(500).send({err: err});
        }
        else {
            res.send({message: result})
        }
    })
}

exports.createVideo = (req, res) => {
    let video = new videodb({
        url: req.body.url,
        thumbnail: req.body.thumbnail,
        name: req.body.name,
        author: req.body.author
    })

    video.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Video was submited successfully!" });
    })
}
