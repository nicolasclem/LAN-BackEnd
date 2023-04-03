const { generateJwt } = require('../helpers/jwt');
const User = require('../models/usersModels')
const bcrypt= require('bcryptjs')

const login= async (req, res)=>{
    const {email,password} = req.body
    try {
        const userDB= await User.findOne({email});

        // verifica  email
        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'credenciales equivocadas --- email '
            })
        }
        // verificar  pass
        const validPass = bcrypt.compareSync(password, userDB.password);

        if(!validPass){
            return res.status(400).json({
                ok:false,
                msg:"Contraseña invalida"
            })
        }
        const token = await  generateJwt(userDB.id);
        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:' Error inseperado'
        })
    }
}




module.exports={
    login
}