const express = require('express');
const router = express.Router();
const sharingController = require('../controllers/sharingController');

// Define routes and controllers for user profile enhancement

// Route: POST /api/profiles
// Controller: createProfile
router.post('/create-profiles', createProfile);

// Define routes and controllers for project showcase page

// Route: GET /api/projects
// Controller: getProjects
router.get('/get-projects', getProjects);

// Define routes and controllers for sharing functionality

// Route: POST /api/projects/:projectId/share
// Controller: shareProject
router.post('/share-projects/:projectId/share', shareProject);

// Define routes and controllers for community interaction

// Route: POST /api/projects/:projectId/like
// Controller: likeProject
router.post('/like-projects/:projectId/like', likeProject);

// Route: POST /api/projects/:projectId/comment
// Controller: commentProject
router.post('/comment-projects/:projectId/comment', commentProject);

// Route: POST /api/projects/:projectId/follow
// Controller: followProject
router.post('/follow-projects/:projectId/follow', followProject);

// Define routes and controllers for reporting and moderation

// Route: POST /api/projects/:projectId/report
// Controller: reportProject
router.post('/report-projects/:projectId/report', reportProject);

// Route: POST /api/projects/:projectId/moderate
// Controller: moderateProject
router.post('/moderate-projects/:projectId/moderate', moderateProject);

// Define routes and controllers for inspiration feed

// Route: GET /api/inspiration-feed
// Controller: getInspirationFeed
router.get('/inspiration-feed', getInspirationFeed);

// Define routes and controllers for integration with communication tools

// Route: POST /api/projects/:projectId/discussion
// Controller: createDiscussion
router.post('/projects/:projectId/discussion', createDiscussion);

// Route: POST /api/projects/:projectId/chat-group
// Controller: createChatGroup
router.post('/api/projects/:projectId/chat-group', createChatGroup);

// Define routes and controllers for analytics and insights

// Route: GET /api/projects/:projectId/analytics
// Controller: getProjectAnalytics
router.get('/api/projects/:projectId/analytics', getProjectAnalytics);

// Define routes and controllers for user privacy and permissions

// Route: PUT /api/projects/:projectId/privacy
// Controller: updateProjectPrivacy
router.put('/api/projects/:projectId/privacy', updateProjectPrivacy);

module.exports = router;