const valueGetter = require('./getValueHelper');

function formatVideo (vids, idPath, urlPath, thumbnailPath, authorPath, titlePath, tagsPath) {
    let res = []
    vids.forEach(vid => {
        res.push({
            Id: valueGetter.getter(vid, idPath),
            Url: valueGetter.getter(vid, urlPath),
            Thumbnail: valueGetter.getter(vid, thumbnailPath),
            Author: valueGetter.getter(vid, authorPath),
            Title: valueGetter.getter(vid, titlePath),
            Tags: valueGetter.getter(vid, tagsPath)
        });
    });
    return res;
}

module.exports.formatVideo = formatVideo;
