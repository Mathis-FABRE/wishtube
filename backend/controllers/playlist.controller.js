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
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Playlist was created successfully!" });
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

exports.videoInPlaylist = (req, res)  => {
    // check existance video
    Video.findOne(
        {
        url: req.body.url // url contient un id donc unique
        },
        (err, video) => {
            if (!video){
                res.send({message: false});
                return;
            }
            Playlist.findOne(
                {_id: req.body.idPlaylist},
                (err, playlist) => {
                    if (err){
                        res.status(500).send(err);
                        return;
                    }
                    res.send({message: playlist.videos.includes(video._id)});
                    return;
                }
            )
        });
}

exports.addVideo = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    User.findById(
        jwt.id,
        (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            const filter = {user: user._id, _id: req.body.idPlaylist};

            Playlist.findOne(filter, (err, precPlaylist) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (req.body.video.url == null ||
                    req.body.video.thumbnail == null ||
                    req.body.video.name == null ||
                    req.body.video.author == null) {
                    res.status(500).send({ message: "video transmise incomplete" });
                    return;
                }

                let newVideo;

                Video.findOne({url: req.body.video.url}, (err, video) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (video != null) {
                        newVideo = video;
                    } else {
                        newVideo = new Video({
                            url: req.body.video.url,
                            thumbnail: req.body.video.thumbnail,
                            name: req.body.video.name,
                            author: req.body.video.author
                        });

                        newVideo.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                        });
                    }

                    Playlist.updateOne(filter, { $push: { videos: newVideo }}, (err, playlist) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: playlist});
                    });

                });
            });

        }
    );
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
