const fetch = require('node-fetch')
const valueGetter = require('./getValueHelper');
const xmlReader = require('./xmlReaderHelper');

async function getter (apiName, apiPath, titlePath, idPath, urlPath, authorPath, tagsPath, isXml = false){
    let tempsRep = Date.now();
    let response = await fetch(apiPath);
    let data
    if (isXml){
        const xml = await response.text()
        data = xmlReader.xmlToJson(xml);
    } else {
        data = await response.json();
    }
    tempsRep = Math.floor(Date.now() - tempsRep);

    return {
        Title: valueGetter.getter(data, titlePath),
        Id: valueGetter.getter(data, idPath),
        Url: valueGetter.getter(data, urlPath),
        Author: valueGetter.getter(data, authorPath),
        Tags: valueGetter.getter(data, tagsPath),
        serveur: apiName,
        tempsReponseServeur: tempsRep
    };
}

module.exports.getter = getter;

async function getterList (apiName, apiPath, videoPath, numPath, nextPagePath = null, isXml = false) {
    let tempsRep = Date.now();
    let response = await fetch(apiPath);
    let data
    if (isXml){
        const xml = await response.text()
        data = xmlReader.xmlToJson(xml);
    } else {
        data = await response.json();
    }
    tempsRep = Math.floor(Date.now() - tempsRep);

    let nextPage;
    if (nextPagePath) nextPage = valueGetter.getter(data, nextPagePath);
    else nextPage = null;

    return {
        object: {
            Number: valueGetter.getter(data, numPath),
            Video: valueGetter.getter(data, videoPath),
            Server: apiName,
            ResponseTime: tempsRep
        },
        nextPage: nextPage
    };
}

module.exports.getterList = getterList;
