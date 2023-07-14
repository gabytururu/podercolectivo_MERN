const mongoose = require('mongoose')
const Queja = require('../models/quejasModel')

// GET ALL QUEJAS //
const getQuejas = async(req,res)=>{
    // res.json({mssg: 'GET all quejas from DB'})
    try{
        const getAllQuejas = await Queja.find({}).sort({createdAt:-1})
        res.status(200).json(getAllQuejas)
    }catch(err){
        res.status(400).json({err:err.message})
        
    }
}
// GET SINGLE QUEJA //
const getQueja = async(req,res)=>{
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
// GET QUEJAS PER INDUSTRY (EG. AIRLINES) //
const getIndustryQuejas = async(req,res)=>{
    // res.json({mssg: 'GET quejas by IndustryName from DB, you just requested the quejas of Industry :' + req.params.industryName})
    const {sector} = req.params
    const getIndustryQueja = await Queja.find({sector})

    if (!getIndustryQueja){
        return res.status(400).json({err: 'no existen quejas con el parametro IndustryName en la DB'})
    }
    res.status(200).json(getIndustryQueja)

}
// GET QUEJAS PER INDUSTRY //
const getCompanyQuejas = async(req,res)=>{
    // res.json({mssg: 'GET quejas by CompanyName, You just requested the quejas of company: ' + req.params.companyName})
    const {nombreComercial} = req.params
    const getCompanyQueja = await Queja.find({nombreComercial})

    if (!getCompanyQueja){
        return res.status(400).json({err: 'no existen quejas con el parametro ese CompanyName/nombreComercial en la DB'})
    }
    res.status(200).json(getCompanyQueja)
}

// POST QUEJA //
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

module.exports = {
    getQuejas,
    getQueja,
    getIndustryQuejas,
    getCompanyQuejas,
    postQueja,
    
}