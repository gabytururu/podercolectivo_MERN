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
const getIndustryQuejas = (req,res)=>{
    res.json({mssg: 'GET quejas by IndustryName from DB, you just requested the quejas of Industry :' + req.params.industryName})
}
// GET QUEJAS PER INDUSTRY //
const getCompanyQuejas = (req,res)=>{
    res.json({mssg: 'GET quejas by CompanyName, You just requested the quejas of company: ' + req.params.companyName})
}

// POST QUEJA //
const postQueja = async(req,res)=>{
   //res.json({mssg: 'POST a NEW Queja in a NEW collection'})
    const { razonSocial, nombreComercial, industria, ciudadReclamacion, estadoReclamacion, motivoReclamacion, anoReclamacion, estatusReclamacion, costoBien, montoReclamado, montoRecuperado, fechaInicio, fechaCierre } = req.body

    try{
        const queja = await Queja.create({razonSocial, nombreComercial, industria, ciudadReclamacion, estadoReclamacion, motivoReclamacion, anoReclamacion, estatusReclamacion, costoBien, montoReclamado, montoRecuperado, fechaInicio, fechaCierre })
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