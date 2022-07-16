       //metodo especial para manejar las rutas
       const {Router}=require("express");
       const {check}=require('express-validator'); //el check es un middlewares
       const {usuariosGet,usuariosPost,usuariosPut,usuariosDelete}=require("../controllers/usuarios");
       const {validarCampos}=require('../middlewares/validar-campos');
       const rol = require("../models/rol");
       const router=Router();
       const esRoleValido=require("../helpers/db-validators");
       
       //endpoint o ruta, y uso el metodo get, indico la ruta y que funcion se ejecuta, recibe la solicitud y un una respuesta
        router.get('/', usuariosGet)        
       //el isEmail, verifica que el campo email, tenga formato de correo electronico
        router.post('/',[check("email","Correo no es válido").isEmail(),
        check("nombre","El nombre no puede estar vacioa").notEmpty() ,
        check("password","La clave de tener minimo 6 caracteres").isLength({min:6}),
        //check("role","No es un Rol Valido").isIn(["ADMIN_ROLE","USER_ROLE"]),
        check("role").custom(async (role="")=>{
              const existeRole=await rol.findOne({role});
              if(!existeRole){
                     throw new Error(`El rol ${role} no existe en la BD`);
              }
          }),
        validarCampos],
        usuariosPost)       
        
        router.put('/:id', usuariosPut)       

        router.delete('/:id',usuariosDelete )    
        
        module.exports=router