const express = require('express')
const router = express.Router()
const  {
    getAllQuejas, 
    // getSingleQueja,
    getTopQuejasCompanyCount,
    getTopQuejasCompanyValue,
    getQuejasBySingleCompanyValue,
    getStatusReclamacionesPerCompany,
    getReclamacionesPerStatePerCompany,
    getTipoReclamacionesCortaByCompany,
    getMotivoReclamacionesLargaByCompany,
    getTopQuejasSectorCount,
    getTopQuejasSectorValue,
    getQuejasBySingleGiroCount,
    getTopQuejasGiroCount,
    getTopQuejasGiroValue,
    getQuejasPerIndustryParam,
    getQuejasByGiro,
    getQuejasByEmpresa,
    postQueja
} = require('../controllers/quejasController')



router.get('/', getAllQuejas)
// router.get('/:id', getSingleQueja)

//--------- Per Company ---------------//
router.get('/topEmpresa',getTopQuejasCompanyCount) //getAllQuejas+sum+sortPerCompany+top30
router.get('/topEmpresaValue',getTopQuejasCompanyValue) //getAllQuejas+sum+sortPerCompany+top30
router.get('/singleCompanyValue/:nombreComercialParamUrl', getQuejasBySingleCompanyValue)
router.get('/estatusReclamaciones/:nombreComercialParamUrl',getStatusReclamacionesPerCompany)
router.get('/reclamacionesPorEstadoPorEmpresa/:nombreComercialParamUrl',getReclamacionesPerStatePerCompany)
router.get('/tipoReclamacionCorta/:nombreComercialParamUrl', getTipoReclamacionesCortaByCompany)
router.get('/motivoReclamacionLarga/:nombreComercialParamUrl',getMotivoReclamacionesLargaByCompany)

// -----------Per Sector ---------------//

router.get('/topSector',getTopQuejasSectorCount) //getAllQuejas+sum+sortPerSector+top30
router.get('/topSectorValue',getTopQuejasSectorValue) //getAllQuejas+sum+sortPerSector+top30
router.get('/singleGiro/:giroParamUrl',getQuejasBySingleGiroCount) //getAllQuejas+sum+sortPerSector+top30

// ---------- Per Giro ----------------//

router.get('/topGiro',getTopQuejasGiroCount) //getAllQuejas+sum+sortPerGiro+top30
router.get('/topGiroValue',getTopQuejasGiroValue) //getAllQuejas+sum+sortPerGiro+top30

//------------------ others --------------//
// router.get('/sector/:sector', getQuejasPerIndustry)
router.get('/sector/:sectorParamUrl', getQuejasPerIndustryParam)
router.get('/giro/:giroParamUrl', getQuejasByGiro) // not working
router.get('/empresa/:nombreComercialParamUrl', getQuejasByEmpresa)
// router.get('/:sector/:nombre_comercial', getbyNombreComercial)
// router.get('/:sector/:nombreComercial', getbyNombreComercial)
// router.get('/test/:giroParamUrl', testResponse)
router.post('/', postQueja)


module.exports = router