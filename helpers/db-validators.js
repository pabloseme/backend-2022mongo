const rol=require('../models/rol');

const esRoleValido=async (role="")=>{
    const existeRole=await rol.findOne({role});
    if(!existeRole){
           throw new Error(`El rol ${role} no existe en la BD`);
    }
}

module.exports={
    esRoleValido
}