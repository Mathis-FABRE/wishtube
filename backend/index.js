const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors([
    {origin: 'http://localhost:63342', credentials: true},
    {origin: 'http://localhost:63343', credentials: true}
]));

app.listen(1337, () => {
    console.log('Server started port : 1337');
});
