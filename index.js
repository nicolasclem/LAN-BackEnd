const express = require('express');
const cors = require('cors')
const {dbConnection}= require('./dataBase/config');
require('dotenv').config();

//create server
const app = express();

//config cors
app.use(cors());

//DbConnection
dbConnection();

//routes
app.get('/',(req,res)=>{

    res.json({
        ok:true,
        msg:"Hola Mundo"
    })
});


app.listen(process.env.PORT,()=>{
    console.log(`Server run in port: ${process.env.PORT}`);
})