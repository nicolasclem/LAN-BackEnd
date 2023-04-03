const jwt = require('jsonwebtoken')


const  generateJwt= (uid)=>{
    
    return new Promise( (res,rej)=>{

        const payload={
            uid
        };
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'12h'
        },(err, token)=>{
            if(err){
                console.log(err);
                rej("No se pudo generar el token")
            }else{
                res(token)
            }
        })
    });
}


module.exports={
    generateJwt
}