const {Router } = require('express');
const {check}= require('express-validator');
const {getUsers,createUser, getUserById,deleteUser}= require('../controllers/users');
const {validarCampos}= require("../middlewares/validarCampos");
const { validarjwt } = require('../middlewares/validar-Jwt');

/*
    Route:  /api/users
*/
const router= Router()

//
router.get('/',validarjwt, getUsers);

router.post(
    '/',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('password','El pass es obligatorio').not().isEmpty(),
        check('email','El Email es obligatorio').not().isEmpty(),
        validarCampos
    ],
createUser);

router.put('/:id',
[   
    validarjwt,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('role','El rol es obligatorio').isEmpty(),
    check('email','El Email es obligatorio').not().isEmpty(),
    validarCampos

],
getUserById)

router.delete('/:id',validarjwt,
deleteUser)

module.exports= router