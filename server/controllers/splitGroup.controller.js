const { Op } = require("sequelize");
const { SplitGroup: _SplitGroup, User } = require("../models");
const SplitGroup = _SplitGroup;

const { AdminGroup, Member } = require("../models");

async function createSplitGroup(req, res, next) {
  try {
    const { name, description } = req.body;
    console.log(name);
    console.log(description);
    if (!name) {
      return res.status(400).json({ error: "Group name is required." });
    }
    console.log("reached here");
    const groupId = Math.floor(Math.random() * 1000000);
    const userId = req.params.id;
    console.log(groupId);
    console.log(userId);
    const newGroup = await SplitGroup.create({
      group_id: groupId,
      name: name,
      group_describe: description,
    });
    await Member.create({ member_id: userId, group_id: groupId });
    await AdminGroup.create({ admin_id: userId, group_id: groupId });

    res.status(201).json({ message: "Group created successfully." });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Internal server error." });
    next(error);
  }
}

async function getUserGroups(req, res, next) {
  try {
    const userId = req.params.userId;
    const userGroups = await Udhaari.findAll({
      where: {
        user_id: userId,
      },
    });
    res.json(userGroups);
  } catch (error) {
    next(error);
  }
}

async function getMembers(req, res, next) {
  try {
    const groupId = req.params.groupId;
    const groupMembers = await Udhaari.findAll({
      where: {
        group_id: groupId,
      },
    });
    res.json(groupMembers);
  } catch (error) {
    next(error);
  }
}

async function getAllSplits(req, res, next) {
  try {
    const groupId = req.params.groupId;
    const groupSplits = await SplitGroup.Split.findAll({
      where: {
        group_id: groupId,
      },
    });
    res.json(groupSplits);
  } catch (error) {
    next(error);
  }
}

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

async function leaveGroup(req, res, next) {}

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
  getAllSplits,
  addNewMember,
  getGroupByTitle,
  updateGroup,
  deleteGroup,
};
