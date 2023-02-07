const db = require("../model");
const User = db.user;
const Playlist = db.playlist;
const Video = db.video;
const jwt_decode = require('jwt-decode');

exports.FirstPlaylist = (user) => {
    let playlist = new Playlist({
        user: user,
        name: "ma playlist",
        dateCreation: Date.now()
    });

    playlist.save(err => {
        if (err) {
            return;
        }
    })
}

exports.create = (req, res) => {

    let playlist = new Playlist({
        name: req.body.name,
        dateCreation: Date.now()
    });

    let jwt = jwt_decode(req.headers["x-access-token"]);
    User.findById(
        jwt.id,
        (err, users) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            playlist.user = users.map(user => user._id);

            playlist.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "Playlist was created successfully!" });
            });
        }
    );
};

callbackPlaylist = (err, videosList, url, res) => {
    if (err) {
        res.status(500).send({message: err});
        return;
    }
    for (const videos of videosList) {
        if (videos.videos.includes(url)) {
            return true;
        }
    }
    return false;
}

exports.videoInUser = (req, res) => {

    let jwt = jwt_decode(req.headers["x-access-token"]);
    Playlist.find({user: jwt.id}, {_id: 0, videos: 1},(err, videosList) => {
        const result = callbackPlaylist(err, videosList, req.body.url, res);
        res.send({message: result});
    });
}

addVideoToPlaylist = (filter, newVideo, res) => {
    Playlist.updateOne(filter, { $push: { videos: newVideo }}, (err, playlist) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({message: playlist});
    });
}

callbackAjoutVideo = (err, videoq, video, filter, res) => {
    let newVideo;
    if (err) {
        res.status(500).send({ message: err });
        return;
    }

    if (videoq) {
        newVideo = videoq;
        addVideoToPlaylist(filter, newVideo.url, res);
    } else {
        newVideo = new Video({
            url: video.url,
            thumbnail: video.thumbnail,
            name: video.name,
            author: video.author
        });

        newVideo.save((err, videoCreated) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            addVideoToPlaylist(filter, videoCreated.url, res);
        });
    }
}

createVideoIfNotExist = (filter, video, res) => {
    Video.findOne({url: video.url}, (err, videoq) => {
        callbackAjoutVideo(err, videoq, video, filter, res)
    });
}



exports.addVideo = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    const filter = {user: jwt.id, _id: req.body.idPlaylist};

    if (req.body.video.url == null ||
        req.body.video.thumbnail == null ||
        req.body.video.name == null ||
        req.body.video.author == null) {
        res.status(500).send({ message: "video transmise incomplete" });
        return;
    }

    createVideoIfNotExist(filter, req.body.video, res);
};



exports.addVideoToMaPlaylist = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    const filter = {user: jwt.id, name: "ma playlist"};

    if (req.body.url == null ||
        req.body.thumbnail == null ||
        req.body.name == null ||
        req.body.author == null) {
        res.status(500).send({ message: "video transmise incomplete" });
        return;
    }

    const video = {
        url: req.body.url,
        thumbnail: req.body.thumbnail,
        name: req.body.name,
        author: req.body.author
    };

    createVideoIfNotExist(filter, video, res);
};

exports.deleteFromMaPlaylist = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    Playlist.updateOne(
        {user: jwt.id, name: "ma playlist"},
        { $pull: { videos: req.body.url } },
        (err, playlist) => {
            if(err){
                res.status(500).send({message: err});
                return;
            }
            res.send({message: playlist});
        }
    );
}

exports.deleteFromPlaylist = (req, res) => {
    Playlist.update(
        {_id: req.body.idPlaylist},
        { $pull: { videos: req.body.idVideo } },
        (err, playlist) => {
            if(err){
                res.status(500).send({message: err});
                return;
            }
            res.send({message: playlist});
        }
    );
}

extractVideos = (res, err, videos) => {
    if(err){
        res.status(500).send({message: err});
        return;
    }
    Video.find({url: {$in: videos}}, (err, result) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        console.log(result)
        res.send(result);
    })
}

exports.getVideosMaPlaylist = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    Playlist.findOne({user: jwt.id, name: "ma playlist"}, (err, videos) => {
        extractVideos(res, err, videos.videos)
    })
}
