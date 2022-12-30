const valueGetter = require('./getValueHelper');

function formatVideo (vids, idPath, urlPath, thumbnailPath, authorPath, titlePath, tagsPath) {
    let res = []
    vids.forEach(vid => {
        const vidId = valueGetter.getter(vid, idPath)
        res.push({
            Id: vidId,
            Url: !urlPath.length ? `https://www.youtube.com/watch?v=${vidId}` : valueGetter.getter(vid, urlPath),
            Thumbnail: valueGetter.getter(vid, thumbnailPath),
            Author: valueGetter.getter(vid, authorPath),
            Title: valueGetter.getter(vid, titlePath),
            Tags: !tagsPath ? null : valueGetter.getter(vid, tagsPath)
        });
    });
    return res;
}

module.exports.formatVideo = formatVideo;

function formatVideoList (prevResult, nextResult){
    return {
        Number: (prevResult ? prevResult.Number : 0) + nextResult.Number,
        Video: prevResult ? prevResult.Video.concat(nextResult.Video) : nextResult.Video,
        Server: prevResult ? prevResult.Server : nextResult.Server,
        ResponseTime: (prevResult ? prevResult.ResponseTime : 0) + nextResult.ResponseTime
    }
}

module.exports.formatVideoList = formatVideoList;
