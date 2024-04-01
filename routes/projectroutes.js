const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project-controller');

router.get('/getbyid/:id', projectController.getProjectByIdNew);
router.get('/get-all-projects', projectController.getAllProjects);
router.put('/update-project', projectController.updateProject);
router.post('/create-project', projectController.createProject);
router.delete('/delete-project/:id', projectController.deleteProjectnew);
router.get('/difficulty/:difficulty', projectController.getProjectsByDifficulty);

router.get('/category/:category/:value', projectController.getProjectsByCategory);

//  /api/project/get-project-by-id
//  /api/project/getallprojects
//  /api/project/update-project
//  /api/project/create-project
//  /api/project/delete-project
//  http://localhost:3000/api/project/difficulty/beginner  
//  http://localhost:3000/api/project/difficulty/beginner
module.exports = router;