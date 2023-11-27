const mongoose = require('mongoose')
const Queja = require('../models/quejasModel')

const sumQuejasPerCategory = (quejas, categorySelected) =>{
    let categoriesArray = []
    quejas && quejas.map( queja => categoriesArray.includes(queja[categorySelected])?'':categoriesArray.push(queja[categorySelected]))

    let categoriesAggregatedIndicators = []
    for (let category of categoriesArray){
        let montoReclamado = 0
            // montoReclamado.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,});
        let montoRecuperado = 0
            // montoRecuperado.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,});
        let costoBienServicio = 0
        let sector = ''
        let giro = ''
        let nombreComercialParamUrl = ''
        let giroParamUrl = ''
        let sectorParamUrl = ''
        let nombreComercialCorto= ''
        const quejasThisCategory = quejas.filter((queja)=> queja[categorySelected] === category)
        const quejasQtyThisCategory = quejasThisCategory.length
        for(let queja of quejasThisCategory){
            montoReclamado = queja.monto_reclamado + montoReclamado
            montoRecuperado = queja.monto_recuperado_b + montoRecuperado
            costoBienServicio = queja.costo_bien_servicio + costoBienServicio
            sector = queja.sector
            giro = queja.giro
            nombreComercialParamUrl = queja.nombreComercialParamUrl
            sectorParamUrl = queja.sectorParamUrl
            giroParamUrl = queja.giroParamUrl
            nombreComercialCorto= queja.nombreComercialCorto

        }
        const thisElementinCategoryIndicators = {
            company: category, 
            totalQuejas: quejasQtyThisCategory, 
            montoTotalReclamado: montoReclamado, 
            montoTotalRecuperado: montoRecuperado, 
            sector: sector, 
            costoBienServicio: costoBienServicio.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,}), 
            giro:giro,
            nombreComercialParamUrl: nombreComercialParamUrl,
            sectorParamUrl: sectorParamUrl,
            giroParamUrl: giroParamUrl,
            nombreComercialCorto: nombreComercialCorto

        }
        categoriesAggregatedIndicators.push(thisElementinCategoryIndicators)
        console.log('categoriesAgg indicators from context function-->',categoriesAggregatedIndicators)
    }
    console.log(categoriesAggregatedIndicators)
    return categoriesAggregatedIndicators
}
const getStatus =(quejasEmpresa)=>{
    let totalQtyQuejasThisEmpresa = quejasEmpresa.length
    let statusArr =[]
    quejasEmpresa.map(queja => statusArr.includes(queja.estado_procesal)?'':statusArr.push(queja.estado_procesal))
    let statusDetailsAggregator = []
    for(let status of statusArr){        
        const quejasEsteStatus = quejasEmpresa.filter((el)=> el.estado_procesal === status)
        console.log('quejas este status -->filter function-->',quejasEsteStatus)
        const thisStatusDetails ={
            statusName : status,
            qtyQuejasThisStatus : quejasEsteStatus.length,
            percentageThisStatusFromTotal: quejasEsteStatus.length / totalQtyQuejasThisEmpresa
        }
        statusDetailsAggregator.push(thisStatusDetails)
   }
   console.log('result getStatus()--> ',statusDetailsAggregator)
   return statusDetailsAggregator
}

  const getMotivos = (quejasEmpresa)=>{
    let motivosArr=[]
    let totalQtyQuejasThisEmpresa = quejasEmpresa.length
    quejasEmpresa.map(queja=>motivosArr.includes(queja.motivo_reclamacion)?'':motivosArr.push(queja.motivo_reclamacion))
    let motivosDetailsAggregator=[]
    for(let motivo of motivosArr){
        const quejasForThisMotivo = quejasEmpresa.filter((el)=>el.motivo_reclamacion === motivo)

        const thisMotivoDetails ={
            motivoName : motivo,
            qtyThisMotivo : quejasForThisMotivo.length,
            percentageThisMotivo : quejasForThisMotivo.length/totalQtyQuejasThisEmpresa
        }

        motivosDetailsAggregator.push(thisMotivoDetails)
    }
    console.log('motivosDetailsAggregator',motivosDetailsAggregator)
    return motivosDetailsAggregator
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

const getAllQuejas = async(req,res)=>{
    // res.json({mssg: 'GET all quejas from DB'})
    try{
        //const getAllQuejas = await Queja.find({}).sort({createdAt:-1})
        const getAllQuejas = await Queja.find({})        
        res.status(200).json(topCompanies)
    }catch(err){
        res.status(400).json({err:err.message})        
    }
}

const getTopQuejasCompanyCount = async(req,res)=>{
    try{
        const topCompanies = await Queja.aggregate([
            {$group:{
                _id:"$nombreComercialCorto", 
                totalComplaints:{$sum:1},
                totalValueMXN: {$sum: "$costo_bien_servicio"},
                giro: {$first: "$giro"}
                }
            },
            {$sort: {totalComplaints: -1}},
            {$limit: 30} 
        ])
        res.status(200).json(topCompanies)
    }catch(err){
        res.status(400).json({err:err.message})
    }
    // const topCompanies = await Queja.aggregate([
    //     {$group:{_id: "$nombreComercialCorto", count:{$sum: 1}}},
    //     {$sort: {count:-1}},
    //     {$limit:30}
    // ])
}

const getTopQuejasCompanyValue = async(req,res)=>{
    try{
        const topCompanies = await Queja.aggregate([
            {$group:{
                _id:"$nombreComercialCorto", 
                totalComplaints:{$sum:1},
                totalValueMXN: {$sum: "$costo_bien_servicio"},
                giro: {$first: "$giro"}
                }
            },
            {$sort: {totalValueMXN: -1}},
            {$limit: 30} 
        ])
        res.status(200).json(topCompanies)
    }catch(err){
        res.status(400).json({err:err.message})
    }
    // const topCompanies = await Queja.aggregate([
    //     {$group:{_id: "$nombreComercialCorto", count:{$sum: 1}}},
    //     {$sort: {count:-1}},
    //     {$limit:30}
    // ])
}

const getTopQuejasSectorCount = async(req,res)=>{
    try{
        const topSectors = await Queja.aggregate([
            {$group:{
                _id:"$sector",
                totalComplaints:{$sum:1},
                totalValueMXN: {$sum:"$costo_bien_servicio"}, 
                }
            },
            {$sort: {totalComplaints: -1}},
            {$limit:30}
        ])
        res.status(200).json(topSectors)
    }catch(err){
        res.status(400).json({err:err.message})
    }

}
const getTopQuejasSectorValue = async(req,res)=>{
    try{
        const topSectors = await Queja.aggregate([
            {$group:{
                _id:"$sector",
                totalComplaints:{$sum:1},
                totalValueMXN: {$sum:"$costo_bien_servicio"}, 
                }
            },
            {$sort: {totalValueMXN: -1}},
            {$limit:30}
        ])
        res.status(200).json(topSectors)
    }catch(err){
        res.status(400).json({err:err.message})
    }

}
const getTopQuejasGiroCount = async(req,res)=>{
    try{
        const topGiros = await Queja.aggregate([
            {$group:{
                _id:"$giro",
                totalComplaints:{$sum:1},
                totalValueMXN: {$sum:"$costo_bien_servicio"}, 
                }
            },
            {$sort: {totalComplaints: -1}},
            {$limit:30}
        ])
        res.status(200).json(topGiros)
    }catch(err){
        res.status(400).json({err:err.message})
    }

}
const getTopQuejasGiroValue = async(req,res)=>{
    try{
        const topGiros = await Queja.aggregate([
            {$group:{
                _id:"$giro",
                totalComplaints:{$sum:1},
                totalValueMXN: {$sum:"$costo_bien_servicio"}, 
                }
            },
            {$sort: {totalValueMXN: -1}},
            {$limit:30}
        ])
        res.status(200).json(topGiros)
    }catch(err){
        res.status(400).json({err:err.message})
    }

}


const getQuejasBySingleGiroCount = async(req,res)=>{
    const {giroParamUrl} = req.params;

    try{
        const quejasByGiroParam = await Queja.aggregate([
            {$match: {giroParamUrl : giroParamUrl}},
            {$group: {
                _id: "$nombreComercialCorto",
                totalComplaints:{$sum:1},
                totalValueMxn: {$sum:"$costo_bien_servicio"}
                }
            },
            {$sort:{totalComplaints: -1}},
            {$limit:30}
        ]);
        if(!quejasByGiroParam.length){
            return res.status(404).json({err: 'No existen quejas con el parámetro de giro dado'})
        }
        res.status(200).json(quejasByGiroParam)
    }catch(err){
        res.status(500).json({err:err.message})
    }
}
const getQuejasBySingleGiroValue = async(req,res)=>{
    const {giroParamUrl} = req.params;

    try{
        const quejasByGiroParam = await Queja.aggregate([
            {$match: {giroParamUrl : giroParamUrl}},
            {$group: {
                _id: "$nombreComercialCorto",
                totalComplaints:{$sum:1},
                totalValueMxn: {$sum:"$costo_bien_servicio"}
                }
            },
            {$sort:{totalValueMxn: -1}},
            {$limit:30}
        ]);
        if(!quejasByGiroParam.length){
            return res.status(404).json({err: 'No existen quejas con el parámetro de giro dado'})
        }
        res.status(200).json(quejasByGiroParam)
    }catch(err){
        res.status(500).json({err:err.message})
    }
}

//not working.. figure out why
const getQuejasByEmpresa = async(req,res)=>{
    const {nombreComercialParamUrl} = req.params;

    try{
        const quejasByCompany = await Queja.aggregate([
            {$match: {nombreComercialParamUrl : nombreComercialParamUrl}},
            {$group: {
                _id: "$nombreComercialCorto",
                totalComplaints:{$sum:1},
                totalValueMxn: {$sum:"$costo_bien_servicio"}
                }
            },
            {$sort:{totalComplaints: -1}},
            {$limit:30}
        ]);
        if(!quejasByCompany.length){
            return res.status(404).json({err: 'No existen quejas con el parámetro de giro dado'})
        }
        res.status(200).json(quejasByCompany)
    }catch(err){
        res.status(500).json({err:err.message})
    }
}
// const getQuejasBySingleCompanyValue = async(req,res)=>{
//     const {giroParamUrl} = req.params;

//     try{
//         const quejasByGiroParam = await Queja.aggregate([
//             {$match: {giroParamUrl : giroParamUrl}},
//             {$group: {
//                 _id: "$nombreComercialCorto",
//                 totalComplaints:{$sum:1},
//                 totalValueMxn: {$sum:"$costo_bien_servicio"}
//                 }
//             },
//             {$sort:{totalValueMxn: -1}},
//             {$limit:30}
//         ]);
//         if(!quejasByGiroParam.length){
//             return res.status(404).json({err: 'No existen quejas con el parámetro de giro dado'})
//         }
//         res.status(200).json(quejasByGiroParam)
//     }catch(err){
//         res.status(500).json({err:err.message})
//     }
// }

// const getQuejasByEmpresa = async(req,res)=>{
//     const {nombreComercialParamUrl} = req.params
//     const getbyNombreEmpresa = await Queja.find({nombreComercialParamUrl})
//     if (!getbyNombreEmpresa){
//         return res.status(400).json({err: 'no existen quejas con el parametro de :nombreComercial dado en la DB'})
//     }
//     res.status(200).json(getbyNombreEmpresa)
// }
//const getQuejasByGiro = async(req,res)=>{
//     const getGiroQuejaParam = await Queja.find({giroParamUrl})
//     if (!getGiroQuejaParam){
//         return res.status(400).json({err: 'no existen quejas con el parametro de :giro dado en la DB'})
//     }
//     // aplica la summary function para ver cuales son las top 50 o top 100 por # quejas o por costo
  

//     //ya que aplicaste eso, tienes un array the la lista de giros que quieres incluir en el envio... por que son solo los top giros. 

//     res.status(200).json(getGiroQuejaParam)
    
// }

const getQuejasPerIndustryParam = async(req,res)=>{
    // res.json({mssg: 'GET quejas by IndustryName from DB, you just requested the quejas of Industry :' + req.params.industryName})
    const {sectorParamUrl} = req.params
    const getIndustryQuejaParam = await Queja.find({sectorParamUrl})
    if (!getIndustryQuejaParam){
        return res.status(400).json({err: 'no existen quejas con el parametro de :Sector dado en la DB'})
    }
    res.status(200).json(getIndustryQuejaParam)
}


const postQueja = async(req,res)=>{
    //res.json({mssg: 'POST a NEW Queja in a NEW collection'})
    const { id_exp, fecha_ingreso, fecha_fin, tipo_conciliacion, estado_procesal, proveedor, nombreComercial,giro, sector, odeco, estado_ua, tipo_reclamacion_causaCorta, motivo_reclamacion_causaLarga, costo_bien_servicio, giroParamUrl, nombreComercialParamUrl, nombreComercialCorto, sectorParamUrl } = req.body
    
    try{
        const queja = await Queja.create({ id_exp, fecha_ingreso, fecha_fin, tipo_conciliacion, estado_procesal, proveedor, nombreComercial,giro, sector, odeco, estado_ua, tipo_reclamacion_causaCorta, motivo_reclamacion_causaLarga, costo_bien_servicio, giroParamUrl, nombreComercialParamUrl, nombreComercialCorto, sectorParamUrl})
        res.status(200).json(queja)
    }catch(err){
        res.status(400).json({err:err.message})
    }
}


module.exports = {
    getAllQuejas,
    getSingleQueja,
    // getQuejasPerIndustry,
    getQuejasByGiro,
    getQuejasPerIndustryParam,
    getQuejasByEmpresa,
    // getQuejasPerCompany,
    getTopQuejasCompanyCount,
    getTopQuejasCompanyValue,
    getTopQuejasSectorCount,
    getTopQuejasSectorValue,
    getTopQuejasGiroCount,
    getTopQuejasGiroValue,
    postQueja,
}
