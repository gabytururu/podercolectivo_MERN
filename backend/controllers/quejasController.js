const mongoose = require('mongoose')
const Queja = require('../models/quejasModel')


const getAllQuejas = async(req,res)=>{
    // res.json({mssg: 'GET all quejas from DB'})
    try{
        const getAllQuejas = await Queja.find({}).sort({createdAt:-1})
        res.status(200).json(getAllQuejas)
    }catch(err){
        res.status(400).json({err:err.message})        
    }
}

const getSingleQueja = async(req,res)=>{
    //res.json({mssg: 'GET single queja from DB'})
    const {id} = req.params         
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Esa#ID de queja no fue Valido en el Types Id de Mongoose'})
    }
    const getSingleQueja = await Queja.findById(id)        
    if(!getSingleQueja){
        return res.status(400).json({err: 'esa Queja ID no existe en la DB'})
    }     
    res.status(200).json(getSingleQueja)
}

// const getQuejasPerIndustry = async(req,res)=>{
//     // res.json({mssg: 'GET quejas by IndustryName from DB, you just requested the quejas of Industry :' + req.params.industryName})
//     const {sector} = req.params
//     const getIndustryQueja = await Queja.find({sector})
//     if (!getIndustryQueja){
//         return res.status(400).json({err: 'no existen quejas con el parametro de :Sector dado en la DB'})
//     }
//     res.status(200).json(getIndustryQueja)
// }
const getQuejasByGiro = async(req,res)=>{
    const {giroParamUrl} = req.params
    const getGiroQuejaParam = await Queja.find({giroParamUrl})
    if (!getGiroQuejaParam){
        return res.status(400).json({err: 'no existen quejas con el parametro de :giro dado en la DB'})
    }
    res.status(200).json(getGiroQuejaParam)
    
}

const getQuejasPerIndustryParam = async(req,res)=>{
    // res.json({mssg: 'GET quejas by IndustryName from DB, you just requested the quejas of Industry :' + req.params.industryName})
    const {sectorParamUrl} = req.params
    const getIndustryQuejaParam = await Queja.find({sectorParamUrl})
    if (!getIndustryQuejaParam){
        return res.status(400).json({err: 'no existen quejas con el parametro de :Sector dado en la DB'})
    }
    res.status(200).json(getIndustryQuejaParam)
}

const getQuejasByEmpresa = async(req,res)=>{
    const {nombreComercialParamUrl} = req.params
    const getbyNombreEmpresa = await Queja.find({nombreComercialParamUrl})
    if (!getbyNombreEmpresa){
        return res.status(400).json({err: 'no existen quejas con el parametro de :nombreComercial dado en la DB'})
    }
    res.status(200).json(getbyNombreEmpresa)
}
// const getbyNombreComercial = async(req,res)=>{
//     const {nombreComercial, sector} = req.params
//     const getbyNombreEmpresa = await Queja.find({sector, nombreComercial})
//     if (!getbyNombreEmpresa){
//         return res.status(400).json({err: 'no existen quejas con el parametro de :nombreComercial dado en la DB'})
//     }
//     res.status(200).json(getbyNombreEmpresa)
// }

// not working
// const getQuejasByGiro = (req,res)=>{
//     const {giroParamUrl} = req.body
//     res.json({mssg:`get las quejas del giro ${giroParamUrl}`})
// }

// const testResponse =async(req,res)=>{
//     const {giroParamUrl} = req.params
//     const quejaPorGiro = await Queja.find({giroParamUrl})
//     if(!quejaPorGiro){
//         return res.status(400).json({err:'no existen quejas con ese parametro de giro'})
//     }
//     res.status(200).json(quejaPorGiro)
// }

const postQueja = async(req,res)=>{
    //res.json({mssg: 'POST a NEW Queja in a NEW collection'})
    const { id_exp, fecha_ingreso, fecha_fin, tipo_conciliacion, estado_procesal, proveedor, nombreComercial,giro, sector, odeco, estado_ua, motivo_reclamacion, costo_bien_servicio,  monto_reclamado, monto_recuperado, monto_recuperado_b, giroParamUrl,nombreComercialParamUrl, nombreComercialCorto,sectorParamUrl} = req.body
    
    try{
        const queja = await Queja.create({ id_exp, fecha_ingreso, fecha_fin, tipo_conciliacion, estado_procesal, proveedor, nombreComercial,giro, sector, odeco, estado_ua, motivo_reclamacion, costo_bien_servicio, monto_reclamado, monto_recuperado,monto_recuperado_b, giroParamUrl,nombreComercialParamUrl, nombreComercialCorto,sectorParamUrl})
        res.status(200).json(queja)
    }catch(err){
        res.status(400).json({err:err.message})
    }
}

// no longer needed ??
// const getQuejasPerCompany = async(req,res)=>{
//     // res.json({mssg: 'GET quejas by CompanyName, You just requested the quejas of company: ' + req.params.companyName})
//     const {nombre_comercial} = req.params
//     const getCompanyQueja = await Queja.find({nombre_comercial})

//     if (!getCompanyQueja){
//         return res.status(400).json({err: 'no existen quejas con el parametro ese CompanyName/nombreComercial en la DB'})
//     }
//     res.status(200).json(getCompanyQueja)
// }


module.exports = {
    getAllQuejas,
    getSingleQueja,
    // getQuejasPerIndustry,
    getQuejasByGiro,
    getQuejasPerIndustryParam,
    getQuejasByEmpresa,
    // getQuejasPerCompany,
    postQueja,
    // getbyNombreComercial,
    // testResponse   

}
