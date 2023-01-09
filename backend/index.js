const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./model");
const dbConfig = require ("./config/db.config");
const Role = db.role;

global.__basedir = __dirname;

app.use(cors([
    {origin: 'http://localhost:63342', credentials: true},
    {origin: 'http://localhost:63343', credentials: true}
]));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/video.routes')(app);
require('./routes/annonce.routes')(app);
require('./routes/playlist.routes')(app);


const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log(`Server started port : ${PORT}`);
});

db.mongoose
    // dev
    // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    // prod
    .connect(`mongodb+srv://${dbConfig.HOST}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        // dev
        // console.log(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);
        // prod
        console.log(`mongodb+srv://${dbConfig.HOST}/${dbConfig.DB}`);
        
        console.error("Connection error", err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "annonceur"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'annonceur' to roles collection");
            });
        }
    });
}
