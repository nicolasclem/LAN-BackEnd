const express = require('express');
const cors = require('cors')
const {dbConnection}= require('./dataBase/config');
require('dotenv').config();

//create server
const app = express();

//config cors
app.use(cors());

// data body
app.use(express.json());

//DbConnection
dbConnection();

//routes

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
// app.get('/users',(req,res)=>{

//     res.json({
//         ok:true,
//         users:[{
//             "id":123,
//             "Nombre":"nico"
//         }]
//         })
// });


app.listen(process.env.PORT,()=>{
    console.log(`Server run in port: ${process.env.PORT}`);
})