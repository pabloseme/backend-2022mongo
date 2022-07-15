       //metodo especial para manejar las rutas
       const {Router}=require("express");
       const {check}=require('express-validator'); //el check es un middlewares
       const {usuariosGet,usuariosPost,usuariosPut,usuariosDelete}=require("../controllers/usuarios");
       const router=Router();
       
       //endpoint o ruta, y uso el metodo get, indico la ruta y que funcion se ejecuta, recibe la solicitud y un una respuesta
        router.get('/', usuariosGet)        
       //el isEmail, verifica que el campo email, tenga formato de correo electronico
        router.post('/',[check("email","Correo no es válido").isEmail(),
        check("nombre","El nombre no puede estar vacioa").notEmpty()] ,usuariosPost)       
        
        router.put('/:id', usuariosPut)       

        router.delete('/:id',usuariosDelete )    
        
        module.exports=router