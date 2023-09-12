const express = require('express')
const router = express.Router()
const  {getAllQuejas, getSingleQueja, getQuejasPerIndustry, getQuejasPerCompany, postQueja, getbyNombreComercial, getQuejasByGiro} = require('../controllers/quejasController')

router.get('/', getAllQuejas) 
router.get('/:id', getSingleQueja)
router.get('/sector/:sector', getQuejasPerIndustry)
// router.get('/:sector/:nombre_comercial', getbyNombreComercial)
router.get('/:sector/:nombreComercial', getbyNombreComercial)
// router.get('/sector/:giro', getQuejasByGiro) // not working
router.post('/', postQueja)

//pending??
//router.get('/:sector?/:id?', getSingleQueja)

//no longer needed?
// router.get('/empresa/:nombre_comercial', getQuejasPerCompany)

module.exports = router