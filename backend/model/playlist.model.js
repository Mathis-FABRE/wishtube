const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    name: String,
    dateCreation: {type: Date, default: Date.now},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    videos:[
        {
            type: String,
            ref: "Video.url"
        }
    ]
})

module.exports = mongoose.model('Playlist', PlaylistSchema)
