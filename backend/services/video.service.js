const helper = require('../helper')
const {formatVideo} = require("../helper/formatterHelper");
const apiGetter = helper.apiGetter
const formatter = helper.formatter

async function getYoutubeList(term, maxRes, prevResult = null, page = "") {
    if (prevResult && (prevResult.Number >= maxRes || !page)) {
        prevResult.Video = formatVideo(
            prevResult.Video,
            ['id', 'videoId'],
            [],
            ['snippet', 'thumbnails', 'high'],
            ['snippet', 'channelTitle'],
            ['snippet', 'title'],
            []);

        return prevResult;
    }

    let result = await apiGetter.getterList(
        'youtube',
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${term}&maxResults=25&pageToken=${page}&key=%20AIzaSyCJ7JdtJh9YPQgir6LBSGhI5qDtGZp7IB4`,
        ['items'],
        ['pageInfo', 'resultsPerPage'],
        ['nextPageToken']);

    await getYoutubeList(term, maxRes, formatter.formatVideoList(prevResult,result.object), result.nextPage);
}

module.exports.getYoutubeList = getYoutubeList;

async function getDailymotionList(term, maxRes, callback, prevResult = null, page = 1){
    if (prevResult && (prevResult.Number >= maxRes || !(page-1))) {
        prevResult.Video = formatVideo(
            prevResult.Video,
            ['id'],
            ['embed_url'],
            ['thumbnail_url'],
            ['owner.username'],
            ['title'],
            ['tags']);

        callback(prevResult);
    }

    let result = await apiGetter.getterList(
        'dailymotion',
        `https://api.dailymotion.com/videos?fields=id,title,owner.username,created_time,tags,embed_url,description,thumbnail_url&limit=25&sort=visited-month&search=${term}&page=${page}`,
        ['list'],
        ['limit'],
        ['has_more']);

    await getDailymotionList(term, maxRes, callback, formatter.formatVideoList(prevResult,result.object), page+1);
}

module.exports.getDailymotionList = getDailymotionList;
