const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quejaSchema = new Schema ({

    razonSocial:{
        type: String,
        required: false,
    },
    nombreComercial:{
        type: String,
        required: true,
    },
    industria:{
        type: String,
        required:true,
    },
    ciudadReclamacion:{
        type: String,
        required: false
    },
    estadoReclamacion:{
        type:String,
        required:false
    },
    motivoReclamacion:{
        type:String,
        required:true
    },
    //can you set a YEAR format?
    anoReclamacion:{
        type: Number,
        required: false
    },
    estatusReclamacion:{
        type: String,
        required: false,
    },
    //can you set a MONETARY format?+ false required?
    costoBien:{
        type: Number,
        required: false
    },
    //can you set a MONETARY format?+ false required?
    montoReclamado:{
        type: Number,
        required:false,
    },
    //can you set a MONETARY format? + false required?
    montoRecuperado:{
        type: Number,
        required:false,
    },
    //can you set a DATE format?
    fechaInicio:{
        type: Number,
        required:false,
    },
    //can you set a DATE format?
    fechaCierre:{
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Queja', quejaSchema)