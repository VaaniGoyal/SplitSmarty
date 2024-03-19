const db = require('../models')
const SplitGroup = db.SplitGroup;
const Op = db.sequelize.Op;

// Create a new user
async function createSplitGroup(req, res, next) {
    try {
        // add all attributes
        const { username, email } = req.body;
        const group = await SplitGroup.create({ username, email }).then(
            data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating user. Please try again!"
                })
            })
        res.json(group);

    } catch (error) {
        next(error);
    }
}

// Get all groups for a user
async function getUserGroups(req, res, next) {
    try {
        const userId = req.params.userId;
        const userGroups = await db.Udhaari.findAll({
            where: {
                user_id: userId
            }
        }).then(
            data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while getting user data. Please try again!"
                });
            });
        res.json(userGroups);
    } catch (error) {
        next(error);
    }
}

// Get group members
async function getMembers(req, res, next) {
    try {
        const groupId = req.params.groupId;
        const groupMembers = await db.Udhaari.findAll({
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

// Get group by title (search for group)
async function getGroupByTitle(req, res, next) {
    try {
        const title = req.query.title;
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

        SplitGroup.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while getting Groups. Please try again!"
                });
            });
    } catch (error) {
        next(error)
    }
}

// Add new member to group
async function addNewMember(req, res, next) {

}

// Update group
async function updateGroup(req, res, next) {
    try {
        const id = req.params.id;
        SplitGroup.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: "User data updated succesfully"
                    });
                } else {
                    res.send({
                        message: `Cannot update USer with id=${id}. Maybe User not found or req.body was empty`
                    })
                }
            })
            .catch(err => {
                res.send({
                    message: err.message || `Error updating User with id=${id}`
                })
            })
    } catch (error) {
        next(error);
    }
}

// Delete SplitGroup
async function deleteGroup(req, res, next) {
    try {
        const group_id = req.params.id;
        const group = await SplitGroup.findByPk(group_id);
        if (!group) {
            return res.status(404).json({ message: "SplitGroup not found" });
        }
        await group.destroy();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createSplitGroup,
    getUserGroups,
    getMembers,
    addNewMember,
    getGroupByTitle,
    updateGroup,
    deleteGroup
}