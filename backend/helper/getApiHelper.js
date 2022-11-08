const fetch = require('node-fetch')
const valueGetter = require('./getValueHelper');
const xmlReader = require('./xmlReaderHelper');

async function getter (apiName, apiPath, numResPath, docsPath, isXml = false){
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

    return { // TODO changer
        nombre: valueGetter.getter(data, numResPath),
        documents: valueGetter.getter(data, docsPath),
        serveur: apiName,
        tempsReponseServeur: tempsRep
    };
}

module.exports.getter = getter;
