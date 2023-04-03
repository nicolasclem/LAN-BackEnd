const User = require("../models/usersModels");
const  bcrypt = require('bcryptjs')
const {generateJwt}= require('../helpers/jwt')


const getUsers = async (req, res) => {
  const users = await User.find({}, "name role email google");
  res.json({
    ok: true,
    users: users,
    uid: req.uid
  });
};
const getUserById= async (req,res)=>{
   //TODO   validar token
    const uid=req.params.id

    try {

        const existUserDB =await User.findById(uid);
        if(!existUserDB){
            return res.status(400).json({
                ok: false,
                msg: "No existe ese usuario",
                });
        }
        //actualizaciones
        const {password, google,email,...fields}= req.body;
        if(existUserDB.email != email){
            const existEmail = await User.findOne({email});
            if(existEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "email en uso",
                    });
            }
        } 
        fields.email=email;
        const userEdited = await User.findByIdAndUpdate(uid,fields,{new:true});
        res.json({
            ok:true,
            user: userEdited
        })
    } catch (error) {
        console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado revisar  logs",
    });
    }
}

const createUser = async (req, res) => {
    const {email, password } = req.body;
    try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        return res.status(400).json({
        ok: false,
        msg: "Email registrado",
        });
    }
    const user = new User(req.body);
    //encriptar
    const salt= bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password,salt)
    await user.save();

    const token = await generateJwt(user.id)
    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado revisar  logs",
    });
  }
};


const deleteUser =async (req,res)=>{
    const uid=req.params.id
    try {
        const existUserDB =await User.findById(uid);
        if(!existUserDB){
            return res.status(400).json({
                ok: false,
                msg: "No existe ese usuario",
                });
        }
        await User.findOneAndDelete( uid)

        res.status(400).json({
            ok: true,
            msg:`usuario eliminado con uid: ${uid}`,
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado revisar  logs",
        });
    }

} 

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser

};
