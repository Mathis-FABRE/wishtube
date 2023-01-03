const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    url: String,
    thumbnail: String,
    name: String,
    author: String
})

module.exports = mongoose.model('Video', VideoSchema);
