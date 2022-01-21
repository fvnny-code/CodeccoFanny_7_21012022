const express = require('express');

//chemin vers les variables d'environnement
require('dotenv').config({path: './config/.env'})

const app = express();

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})