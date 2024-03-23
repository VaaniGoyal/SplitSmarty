const express = require('express');
const router = express.Router();
const sgController = require('../controllers/splitGroup.controller.js');

router.post('/createSplitGroup/:id', sgController.createSplitGroup);
router.get('/getUserGroups/:id', sgController.getUserGroups);
router.get('/getMembers/:id', sgController.getMembers);
router.get('/getGroupbyId/:id', sgController.getGroupById);
router.post('/addMember/:id', sgController.addNewMember);
router.delete('/group/:group_id/user/:user_id', sgController.deleteGroup);
router.get('/groups/:group_id/user/:user_id', sgController.checkAdmin);

module.exports = function(app) {
    app.use('/api/sg', router); 
};
