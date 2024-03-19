
const db = require('../models')
const Split = db.Split;
const Op = db.sequelize.Op;

async function addNewSplit(req, res, next) {

}

// get all splits in a group
async function getAllSplits(req, res, next) {
    try {
        const groupId = req.params.groupId;
        const groupMembers = await db.SplitGroup.Split.findAll({
            where: {
                group_id: groupId
            }
        }).then(
            data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while getting data. Please try again!"
                });
            });
        res.json(groupMembers);
    } catch (error) {
        next(error);
    }
}

async function settleUp(req, res, next) {
    
}

module.exports = {
    addNewSplit,
    getAllSplits,
    settleUp
}