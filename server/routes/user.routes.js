const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller.js');

// Define routes for user-related operations
router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = function(app) {
    app.use('/api/users', router);
};
