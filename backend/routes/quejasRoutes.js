const express = require('express')
const router = express.Router()
const  {getAllQuejas, getSingleQueja, getQuejasPerIndustry, getQuejasPerCompany, postQueja, getbyNombreComercial} = require('../controllers/quejasController')

router.get('/', getAllQuejas) 
router.get('/:id', getSingleQueja)
router.get('/sector/:sector', getQuejasPerIndustry)
router.get('/empresa/:nombreComercial', getQuejasPerCompany)
router.post('/', postQueja)
router.get('/:sector/:nombreComercial', getbyNombreComercial)

module.exports = router