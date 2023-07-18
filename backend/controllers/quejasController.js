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

// const getSingleQueja = async(req,res)=>{
//     const {id, sector} = req.params
//     if(id){
//         if(!mongoose.Types.ObjectId.isValid(id)){
//             return res.status(400).json({error: 'Esa#ID de queja no fue Valido en el Types Id de Mongoose'})
//         }else{
//             const getSingleQueja = await Queja.findById(id)
//             if(!getSingleQueja){
//                 return res.status(400).json({err: 'esa Queja ID no existe en la DB'})
//             }     
//             res.status(200).json(getSingleQueja)
//         }
//     }else if(sector){
//         const getSingleSector = await Queja.find({sector})
//         if(!getSingleSector){
//             return res.status(400).json({err:'no such thing'})
//         }
//         res.status(200).json(getSingleSector)
//     }
// }

const getQuejasPerIndustry = async(req,res)=>{
    // res.json({mssg: 'GET quejas by IndustryName from DB, you just requested the quejas of Industry :' + req.params.industryName})
    const {sector} = req.params
    const getIndustryQueja = await Queja.find({sector})
    if (!getIndustryQueja){
        return res.status(400).json({err: 'no existen quejas con el parametro IndustryName en la DB'})
    }
    res.status(200).json(getIndustryQueja)
}

const getQuejasPerCompany = async(req,res)=>{
    // res.json({mssg: 'GET quejas by CompanyName, You just requested the quejas of company: ' + req.params.companyName})
    const {nombreComercial} = req.params
    const getCompanyQueja = await Queja.find({nombreComercial})

    if (!getCompanyQueja){
        return res.status(400).json({err: 'no existen quejas con el parametro ese CompanyName/nombreComercial en la DB'})
    }
    res.status(200).json(getCompanyQueja)
}

const postQueja = async(req,res)=>{
   //res.json({mssg: 'POST a NEW Queja in a NEW collection'})
    const { razonSocial, nombreComercial, sector, ciudadReclamacion, estadoReclamacion, motivoReclamacion, anoReclamacion, estatusReclamacion, costoBien, montoReclamado, montoRecuperado, fechaInicio, fechaCierre } = req.body

    try{
        const queja = await Queja.create({razonSocial, nombreComercial, sector, ciudadReclamacion, estadoReclamacion, motivoReclamacion, anoReclamacion, estatusReclamacion, costoBien, montoReclamado, montoRecuperado, fechaInicio, fechaCierre })
        res.status(200).json(queja)
    }catch(err){
        res.status(400).json({err:err.message})
    }
}

const getbyNombreComercial = async(req,res)=>{
    const {nombreComercial, sector} = req.params
    //verificar pq no funciona... ni _id ni id... quiza solo opera con findByid? encontrar como concatenar ambas para que pueda hacerse un sistema de carpetass correcto
    //const getbyNombreEmpresa = await Queja.find({sector, nombreComercial,_id})
     const getbyNombreEmpresa = await Queja.find({sector, nombreComercial})
    if (!getbyNombreEmpresa){
        return res.status(400).json({err: 'no funciono la prueba'})
    }
    res.status(200).json(getbyNombreEmpresa)
}

module.exports = {
    getAllQuejas,
    getSingleQueja,
    getQuejasPerIndustry,
    getQuejasPerCompany,
    postQueja,
    getbyNombreComercial    
}
