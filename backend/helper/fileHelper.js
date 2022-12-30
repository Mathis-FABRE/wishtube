const fs = require("fs");
const baseUrl = "http://localhost:1337/images/";

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/images/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Impossible de scanner les images",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.file;
    const directoryPath = __basedir + "/images/";

    res.sendFile(directoryPath + fileName, fileName, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "Impossible de télécharger le fichier. " + err,
            });
        }

        return res.status(200).send(data);
    });
};

module.exports = {
    getListFiles,
    download,
};
