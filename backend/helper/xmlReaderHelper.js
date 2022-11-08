const xmlReader = require('xml2js');

function xmlToJson (data) {
    let res;
    xmlReader.parseString(data, (err, result) => {
        if (err) {
            throw err
        }
        res = result;
    });
    return res;
}

module.exports.xmlToJson = xmlToJson;
