const express = require('express') //importar la libreri a de express
const {dbConnection}=require('../database/config')

class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT
        this.usuariosPath="/api/usuarios";

       //conexion BD
       this.conectarDB()
        ///siempre pongo primero estas funciones de middlwares y luego las rutas
        this.middlewares();
    
        this.routes();
        
    }

    async conectarDB(){
            await dbConnection();
    }

    middlewares(){

        //lee en formato json lo que viene desde el front
        this.app.use(express.json());
    
        //defino una carpeta publica
        this.app.use(express.static("public"))
    }

    routes(){
        this.app.use(this.usuariosPath,require("../routes/usuarios"));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("server listo, PUERTOO : ",this.port)
        })        
    }
}

//export.default Server    ya no se usa mas

module.exports=Server