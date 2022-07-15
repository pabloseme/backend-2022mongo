const Usuario = require('../models/usuario');
//const usuario=require('../models/usuario')

const bcrypt=require('bcryptjs');

//esto me trae el resultado de la validacion del check que esta en las rutas
const {validationResult}=require("express-validator")

const usuariosGet=(req, res)=>{
    res.send('hello esta es mi primer ruta , jeje')
    }

const usuariosPost=async(req, res)=>{
    //const body= req.body;
    const errors=validationResult(req)  //almacena todos los errores que me devuelve el check

    //si no esta vacia
    if (!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    //destructuro el body para hacer validaciones
    const {nombre,email,password,role}= req.body

    const usuario=new Usuario({nombre,email,password,role})
    //const usuario= new Usuario(body)

    //validar si el email si existe
    const existeEmail=await Usuario.findOne({email})
    if (existeEmail){
        return res.status(400).json({
            msg: "El correo ingresado ya existe"
        })
    }

    //encriptar la contraseña
    const salt=bcrypt.genSaltSync()   //veces que lo encrypto por defecto 10 veces si no lo especificas
    usuario.password=bcrypt.hashSync(password,salt);

    //metodo de mongoose
    await usuario.save()

    //const {api_key,nombre}=req.query;
    //console.log(body);
    res.status(201).json({
        //msg :  "Peticion POST",
        usuario
        //api_key,
        //nombre
    });
}

const usuariosPut=(req, res)=>{
    const {id}=req.params;    
    
    res.json({
        msg :  "Peticion PUT",
        id        
    });
}

const usuariosDelete=(req, res)=>{
    const {id}=req.params;
    res.json({
        msg :  "Peticion DELETE",
        id
    });
}
module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};