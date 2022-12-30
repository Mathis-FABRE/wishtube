const mongoose = require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);

const AnnonceSchema = new mongoose.Schema({
        idAnnonce: Number,
        name: String,
        file: String,
        dateCreation: {type: Date, default: Date.now},
        coutParClic: Number,
        nbreVues: Number,
        nbreClics: Number,
        auteur:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        active: Boolean
    });

AnnonceSchema.plugin(AutoIncrement, {id:'id_annonce_seq',inc_field: 'idAnnonce'});

module.exports = mongoose.model('Annonce', AnnonceSchema);
