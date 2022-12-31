const db = require("../model");
const User = db.user;
const Annonce = db.annonce;
const jwt_decode = require('jwt-decode');
const fs = require('fs');

exports.create = (req, res) => {
    let nameFile = req.file.filename.split(' ').join('_');

    let annonce = new Annonce({
        name: req.body.name,
        file: `/images/${nameFile}`,
        coutParClic: req.body.coutParClic,
        nbreVues: 0,
        nbreClics: 0,
        active: true
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
            annonce.auteur = users.map(user => user._id);

            annonce.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "Annonce was submited successfully!" });
            });
        }
    );
};


exports.getAnnonceFile = (req, res) => {
    Annonce.findOne(
        {
            file: "/images/"+req.params.file
        },
        (err, annonce) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.send({ message: annonce});
        }
    );
};

exports.getAllAnnonces = (req, res) => {
    Annonce.find((err, annonces) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: annonces});
    });
};

exports.getAllAnnoncesByAuthor = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    User.findOne(
        {
            _id: {$in: jwt.id}
        },
        (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            Annonce.find({auteur: user._id}, (err, annonces) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.send({ message: annonces});
            });
        }
    );
};


exports.changeActivationStatusAnnonce = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    User.findOne(
        {
            _id: {$in: jwt.id}
        },
        (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            const filter = {auteur: user._id, idAnnonce: req.body.idAnnonce}
            const newValue = [ { "$set": { active: { "$eq": [false, "$active"] } } } ];
            Annonce.updateOne(filter, newValue, (err, annonce) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.send({ message: annonce});
            });
        }
    );
};

exports.updateAnnonce = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    User.findOne(
        {
            _id: {$in: jwt.id}
        },
        (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            const filter = {auteur: user._id, idAnnonce: req.body.idAnnonce};

            Annonce.findOne(filter, (err, precannonce) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                let newValue = req.body;
                delete newValue.idAnnonce

                if (req.file == null)
                    delete newValue.file
                else {
                    newValue.file = `/images/${req.file.filename.split(' ').join('_')}`;

                    fs.unlink('.'+precannonce.file, (err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        //file removed
                    })

                }

                newValue = [ { "$set": newValue } ];

                Annonce.updateOne(filter, newValue, (err, annonce) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: annonce});
                });
            });


        }
    );
};

exports.deleteAnnonce = (req, res) => {
    let jwt = jwt_decode(req.headers["x-access-token"]);
    User.findOne(
        {
            _id: {$in: jwt.id}
        },
        (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            const filter = {auteur: user._id, idAnnonce: req.body.idAnnonce}
            Annonce.deleteOne(filter, (err, annonce) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            });

            fs.unlink('.'+req.body.filepath, (err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                //file removed
                res.send({ message: "annonce supprimée"});
            })
        }
    );
};
