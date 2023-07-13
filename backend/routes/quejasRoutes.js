const express = require('express')
const router = express.Router()
const  {getQuejas, getQueja, getIndustryQuejas, getCompanyQuejas, postQueja} = require('../controllers/quejasController')

router.get('/', getQuejas) 
router.get('/:id', getQueja)
router.get('/:industryId', getIndustryQuejas)
router.get('/:companyId', getCompanyQuejas)
router.post('/', postQueja)


module.exports = router