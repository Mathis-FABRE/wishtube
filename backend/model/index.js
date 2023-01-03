const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.annonce = require("./annonce.model");
db.video = require("video.model");
db.playlist = require("playlist.model");

db.ROLES = ["user", "annonceur"];

module.exports = db;
