const express = require('express');
const router = express.Router();
const skillController=require('../controllers/skillCont');
const verifyToken = require('../middlewares/verifyToken');
const Token = require('../middlewares/blackList');
router.get('/showSkills',verifyToken,Token,skillController.showSkill);
router.get('/showUserByskill',skillController.showUsersBySkill);
module.exports = router;