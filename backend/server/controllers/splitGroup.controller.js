const { Op } = require("sequelize");
const { SplitGroup: _SplitGroup, User } = require("../models");
const SplitGroup = _SplitGroup;

const { AdminGroup, Member } = require("../models");

async function createSplitGroup(req, res, next) {
  try {
    const { name, description } = req.body;
    // console.log(name);
    // console.log(description);
    if (!name) {
      return res.status(400).json({ error: "Group name is required." });
    }
    // console.log("reached here");
    const groupId = Math.floor(Math.random() * 1000000);
    const userId = req.params.id;
    // console.log(groupId);
    // console.log(userId);
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
    const userId = req.params.id;
    const userGroups = await Member.findAll({
      where: {
        member_id: userId,
      },
      include: [
        {
          model: SplitGroup,
          attributes: ["name"],
        },
      ],
    });
    const groupNames = userGroups.map((userGroup) => userGroup.SplitGroup.name);
    res.json(groupNames);
  } catch (error) {
    console.error("Error retrieving user groups:", error);
    res.status(500).json({ message: "Internal server error." });
    next(error);
  }
}

async function getMembers(req, res, next) {
  try {
    const groupId = req.params.id;
    const groupMembers = await Member.findAll({
      where: {
        group_id: groupId,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const memberNames = groupMembers.map(
      (groupMember) => groupMember.User.name
    );
    res.json(memberNames);
  } catch (error) {
    console.error("Error retrieving user groups:", error);
    res.status(500).json({ message: "Internal server error." });
    next(error);
  }
}

async function getGroupById(req, res, next) {
  try {
    const groupId = req.params.id;
    const group = await SplitGroup.findOne({ where: { group_id: groupId } });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({ group_describe: group.group_describe });
  } catch (error) {
    next(error);
  }
}


async function addNewMember(req, res) {
  try {
    const { id: groupId } = req.params;

    const { email } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMember = await Member.findOne({ where: { member_id: user.user_id, group_id: groupId } });
    if (isMember) {
      return res.status(400).json({ error: 'User is already a member of this group' });
    }

    await Member.create({ member_id: user.user_id, group_id: groupId });

    res.status(200).json({ message: 'User added to the group successfully' });
  } catch (error) {
    console.error('Error adding member to split group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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
  getGroupById,
  updateGroup,
  deleteGroup,
};

// TODO: create admin function
// TODO: get expense
// TODO: remove member