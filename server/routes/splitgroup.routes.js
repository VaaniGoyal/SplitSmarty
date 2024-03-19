const express = require('express');
const router = express.Router();
const UserController = require('../controllers/splitGroup.controller.js');

// Define routes for user-related operations
router.post('/', UserController.createSplitGroup);
router.get('/:userId', UserController.getUserGroups);
router.get('/:groupId', UserController.getMembers);
router.put('/:id', UserController.updateGroup);
router.delete('/:id', UserController.deleteGroup);

module.exports = function(app) {
    app.use('/api/splitGroup', router);
};
