const { Op } = require("sequelize");
const { SplitGroup: _SplitGroup, Udhaari, User } = require("../models");
const SplitGroup = _SplitGroup;

// Create a new group
async function createSplitGroup(req, res, next) {
  try {
    // add all attributes
    const { user_id, group_name, description } = req.body;
    if (!group_name) {
      return res.status(400).json({ error: "Group name is required." });
    }

    // Create SplitGroup
    const splitGroup = await SplitGroup.create({
      name: group_name,
      description,
    });

    // Associate user with the group
    await Udhaari.create({ user_id, group_id: splitGroup.group_id });
    res
      .status(201)
      .json({ message: "Split group created successfully.", data: splitGroup });
  } catch (error) {
    console.error("Error creating split group:", error);
    res.status(500).json({ error: "Internal server error." });
    next(error);
  }
}

// Get all groups for a user
async function getUserGroups(req, res, next) {
  try {
    const userId = req.params.userId;
    const userGroups = await Udhaari.findAll({
      where: {
        user_id: userId,
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while getting user data. Please try again!",
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
    const groupMembers = await Udhaari.findAll({
      where: {
        group_id: groupId,
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while getting data. Please try again!",
        });
      });
    res.json(groupMembers);
  } catch (error) {
    next(error);
  }
}

// get all splits in a group
async function getAllSplits(req, res, next) {
  try {
    const groupId = req.params.groupId;
    const groupSplits = await SplitGroup.Split.findAll({
      where: {
        group_id: groupId,
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while getting data. Please try again!",
        });
      });
    res.json(groupSplits);
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
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while getting Groups. Please try again!",
        });
      });
  } catch (error) {
    next(error);
  }
}

// Add new member to group
async function addNewMember(req, res, next) {
  try {
    const groupId = req.params.groupId;

    const { user_email } = req.query.user_email;
    const user = User.findOne({ where: { email: user_email } });
    Udhaari.create({
      group_id: groupId,
      user_id: user.user_id,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while getting Groups. Please try again!",
        });
      });
  } catch (error) {}
}

// Update group
async function updateGroup(req, res, next) {
  try {
    const id = req.params.id;
    SplitGroup.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num === 1) {
          res.send({
            message: "User data updated succesfully",
          });
        } else {
          res.send({
            message: `Cannot update USer with id=${id}. Maybe User not found or req.body was empty`,
          });
        }
      })
      .catch((err) => {
        res.send({
          message: err.message || `Error updating User with id=${id}`,
        });
      });
  } catch (error) {
    next(error);
  }
}

// Leave group by member
async function leaveGroup(req, res, next) {}

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

const splitGroupController = {
  createSplitGroup,
  getUserGroups,
  getMembers,
  getAllSplits,
  addNewMember,
  getGroupByTitle,
  updateGroup,
  deleteGroup,
};

module.exports = splitGroupController;
