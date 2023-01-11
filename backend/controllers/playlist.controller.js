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

videoInPlaylist = (video, list)  => {
    // check existance video
    Video.findOne(
        {
        url: video // url contient un id donc unique
        },
        (err, video) => {
            if (!video){
                return false;
            }
            return list.includes(video._id);
        });
}

exports.videoInUser = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    Playlist.find({user: jwt.id}, "videos", (err, videosList) => {
        if (err){
            res.status(500).send({message: err});
            return
        }
        videosList.forEach(videos => {
            if (videoInPlaylist(req.url, videos)){
                res.send({message: true});
                return
            }
        })
        res.send({message: false});
    })
}

addVideoToPlaylist = (filter, newVideo, res) => {
    Playlist.updateOne(filter, { $push: { videos: newVideo }}, (err, playlist) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: playlist});
    });
}

createVideoIfNotExist = (filter, video, res) => {
    let newVideo;
    Video.findOne({url: video.url}, (err, videoq) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (video != null) {
            newVideo = videoq;
        } else {
            newVideo = new Video({
                url: video.url,
                thumbnail: video.thumbnail,
                name: video.name,
                author: video.author
            });

            newVideo.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            });
        }
        addVideoToPlaylist(filter, newVideo, res);
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
    console.log("addind video to ma playlist");
    console.log(req.body.video)
    let jwt = jwt_decode(req.headers["x-access-token"]);
    const filter = {user: jwt.id, name: "ma playlist"};

    console.log('adding to ma playlist');
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
