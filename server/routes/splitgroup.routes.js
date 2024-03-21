const express = require('express');
const router = express.Router();
const sgController = require('../controllers/splitGroup.controller.js');

// Define routes for user-related operations
router.post('/createSplitGroup/:id', sgController.createSplitGroup);
router.get('/:userId', sgController.getUserGroups);
router.get('/:groupId', sgController.getMembers);
router.put('/:id', sgController.updateGroup);
router.post('/:groupId/addMember', sgController.addNewMember);
router.delete('/:id', sgController.deleteGroup);

module.exports = function(app) {
    app.use('/api/sg', router); // sg = split-group
};
