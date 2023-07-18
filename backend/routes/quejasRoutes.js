const express = require('express')
const router = express.Router()
const  {getAllQuejas, getSingleQueja, getQuejasPerIndustry, getQuejasPerCompany, postQueja, getbyNombreComercial} = require('../controllers/quejasController')

router.get('/', getAllQuejas) 
router.get('/sector/:sector', getQuejasPerIndustry)

//pending to figure how to add /:id at the end to merge these two, also pending to find how to create a shorter optional eg quejas/:id?:industry  --> quejas/:sector?/:id?
router.get('/:id', getSingleQueja)
//router.get('/:sector?/:id?', getSingleQueja)
router.get('/:sector/:nombreComercial', getbyNombreComercial)

router.post('/', postQueja)

//no longer needed?
router.get('/empresa/:nombreComercial', getQuejasPerCompany)

module.exports = router