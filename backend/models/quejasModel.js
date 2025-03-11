const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quejaSchema = new Schema ({
    id_exp:{
        type: String,
        required:true,
    },
    //reset back to Date format once cleanDate function works properly
    fecha_ingreso:{
        type: Number,
        required:true,
    },
    //reset back to Date format once cleanDate function works properly
    fecha_fin:{
        type: Number,
        required: false
    },
    estado_procesal:{
        type: String,
        required: true,
    },
    proveedor:{
        type: String,
        required: true,
    },
    nombreComercial:{
        type: String,
        required: true,
    },
    giro:{
        type: String,
        required: true, 
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
        required:true,
    },
    tipo_reclamacion_causaCorta:{
        type:String,
        required:false
    },
    motivo_reclamacion_causaLarga:{
        type:String,
        required:false
    },
    costo_bien_servicio:{
        type: Number,
        required: false
    },
    giroParamUrl:{
        type: String,
        required: true,
    },
    nombreComercialParamUrl:{
        type: String,
        required: true,
    },
    nombreComercialCorto:{
        type: String,
        required: true,
    },
    sectorParamUrl:{
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('Queja', quejaSchema)