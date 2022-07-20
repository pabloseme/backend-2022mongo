const {Schema,model}=require('mongoose')

const ProvinciaSchema=Schema({
    codigo:{
        type: Number,
        required:[true,"El codigo es obligatorio"]
    },
    provincia:{
        type:String,
        required:[true,"La provincia es obligatoria"],
        unique:true
    },    
    estado:{
        type:Boolean,
        default:false
    }
})


//Usuario, representa el modelo pero puede llevar otro nombre distinto al del archivo
module.exports=model("Provincias",ProvinciaSchema)