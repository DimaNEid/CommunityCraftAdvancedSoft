const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const verifyToken = require('../middlewares/verifyToken');
const Token = require('../middlewares/blackList');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
//
 router.get('/profile',verifyToken,Token, authController.getUserProfile);
 router.post('/logout',Token, authController.logout);
 router.get('/allProfiles',verifyToken, authController.getAllProfiles);
  //.put( userController.updateUserProfile);
  router.put('/updateBio',verifyToken, authController.updateBio);
  router.put('/updateUsername',verifyToken,Token, authController.updateUsername);
  router.put('/updatePass',verifyToken,Token,authController.updatePass);
  router.post('/addSkill',verifyToken,Token,authController.addSkillToUser);


module.exports = router;