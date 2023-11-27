const express = require('express')
const router = express.Router()
const  {getAllQuejas, getSingleQueja, getQuejasPerIndustryParam, postQueja, getQuejasByGiro, getQuejasByEmpresa,getTopQuejasCompanyCount, getTopQuejasSectorCount,getTopQuejasSectorValue,getTopQuejasGiroCount, getTopQuejasGiroValue, getTopQuejasCompanyValue} = require('../controllers/quejasController')

// getQuejasPerIndustry, testResponse, getbyNombreComercial,

router.get('/', getAllQuejas) 
router.get('/topEmpresa',getTopQuejasCompanyCount) //getAllQuejas+sum+sortPerCompany+top30
router.get('/topEmpresaValue',getTopQuejasCompanyValue) //getAllQuejas+sum+sortPerCompany+top30
router.get('/topSector',getTopQuejasSectorCount) //getAllQuejas+sum+sortPerSector+top30
router.get('/topSectorValue',getTopQuejasSectorValue) //getAllQuejas+sum+sortPerSector+top30
router.get('/topGiro',getTopQuejasGiroCount) //getAllQuejas+sum+sortPerGiro+top30
router.get('/topGiroValue',getTopQuejasGiroValue) //getAllQuejas+sum+sortPerGiro+top30
router.get('/:id', getSingleQueja)
// router.get('/sector/:sector', getQuejasPerIndustry)
router.get('/sector/:sectorParamUrl', getQuejasPerIndustryParam)
router.get('/giro/:giroParamUrl', getQuejasByGiro) // not working
router.get('/empresa/:nombreComercialParamUrl', getQuejasByEmpresa)
// router.get('/:sector/:nombre_comercial', getbyNombreComercial)
// router.get('/:sector/:nombreComercial', getbyNombreComercial)
// router.get('/test/:giroParamUrl', testResponse)
router.post('/', postQueja)



//pending??
//router.get('/:sector?/:id?', getSingleQueja)

//no longer needed?
// router.get('/empresa/:nombre_comercial', getQuejasPerCompany)

module.exports = router