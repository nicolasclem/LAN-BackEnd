const jwt = require('jsonwebtoken')


validarjwt =(req,res,next)=>{

const token = req.header('x-token');

if(!token){
    return res.status(401).json({
        ok:false,
        msg:"necesita un token para auth"
    })
}
try {
    
    const {uid}= jwt.verify(token,process.env.JWT_SECRET);
    req.uid = uid;

    next()

} catch (error) {
    return res.status(401).json({
        ok:false,
        msg:"token incorrecto"
    })
}

}



module.exports= {
    validarjwt
}