const mongoose = require('mongoose');

const dbConnection= async ()=>{

    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('Db Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inciar DB');
    }

}


module.exports= {
    dbConnection
}