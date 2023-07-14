const express = require('express')
const router = express.Router()
const  {getQuejas, getQueja, getIndustryQuejas, getCompanyQuejas, postQueja} = require('../controllers/quejasController')

router.get('/', getQuejas) 
router.get('/:id', getQueja)
router.get('/industry/:industryName', getIndustryQuejas)
router.get('/company/:companyName', getCompanyQuejas)
router.post('/', postQueja)


module.exports = router