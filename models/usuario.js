const {Schema,model}=require('mongoose')

const UsuarioSchema=Schema({
    nombre:{
        type: String,
        required:[true,"El nombre es obligatorio"]
    },
    email:{
        type:String,
        required:[true,"El mail es obligatorio"],
        unique:true
    },
    password:{
        type: String,
        required:[true,"El password es obligatorio"]
    },
    role:{
        type:String
       // enum:["ADMIN_ROLE","USER_ROLE"]   //lo valido desde la base de datos segun la collecion
    },
    img:{
        type:String
    },
    estado:{
        type:Boolean,
        default:true
    }
})

//quitar datos de la repuesta json que envio al front
UsuarioSchema.methods.toJSON =function (){
    const {__v,password,...usuario}=this.toObject();
    return usuario;
}
//Usuario, representa el modelo pero puede llevar otro nombre distinto al del archivo
module.exports=model("Usuario",UsuarioSchema)