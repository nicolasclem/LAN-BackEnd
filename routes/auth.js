const {Router } = require('express');
const { login } = require('../controllers/auth');
const {check}= require('express-validator');
const {validarCampos}= require("../middlewares/validarCampos")

/*

path: 'api/login'

*/
const router= Router();


router.post('/',[
    check('password','El pass es obligatorio').not().isEmpty(),
    check('email','El Email es obligatorio').not().isEmpty(),
    validarCampos],
    login)








module.exports= router