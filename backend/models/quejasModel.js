const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quejaSchema = new Schema ({
    id_exp:{
        type:'String',
        required:false,
    },
    //can you set a DATE format?
    fecha_ingreso:{
        type: Number,
        required:false,
    },
    //can you set a DATE format?
    fecha_fin:{
        type: Number,
        required: false
    },
    tipo_conciliacion:{
        type: String,
        required: false
    },
    estado_procesal:{
        type: String,
        required: false,
    },

    proveedor:{
        type: String,
        required: false,
    },
    nombreComercial:{
        type: String,
        required: true,
    },
    // nombre_comercial:{
    //     type: String,
    //     required: true,
    // },
    giro:{
        type: String,
        required: false, 
    },
    sector:{
        type: String,
        required:true,
    },
    odeco:{
        type: String,
        required:false,
    },
    estado_ua:{
        type: String,
        required:false,
    },
    motivo_reclamacion:{
        type:String,
        required:false
    },
  
    //can you set a MONETARY format?+ false required?
    costo_bien_servicio:{
        type: Number,
        required: false
    },
    //can you set a MONETARY format?+ false required?
    monto_reclamado:{
        type: Number,
        required:true,
    },
    //can you set a MONETARY format? + false required?
    monto_recuperado:{
        type: Number,
        required:false,
    },

    monto_recuperado_b:{
        type: Number,
        required:true,
    },   
})

module.exports = mongoose.model('Queja', quejaSchema)