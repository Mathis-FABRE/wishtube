const db = require("../model");
const User = db.user;
const Playlist = db.playlist;
const jwt_decode = require('jwt-decode');

exports.create = (req, res) => {
    let playlist = new Playlist({
        name: req.body.name,
        dateCreation: Date.now()
    });

    let jwt = jwt_decode(req.headers["x-access-token"]);
    User.find(
        {
            _id: {$in: jwt.id}
        },
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
