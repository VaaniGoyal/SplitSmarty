const express = require('express');
const router = express.Router();
const splitController = require('./split.controller');

router.post('/:groupId/add', splitController.addSplit);
router.delete('/:groupId/:splitId', splitController.deleteSplit);
router.put('/:groupId/pay/:splitId', splitController.paySplit);

module.exports = function(app) {
    app.use('/api/billsplit', router);
};
