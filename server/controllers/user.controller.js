const { Op } = require("sequelize");
const { Router } = require("express");
const { hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const { User: _User } = require("../models");
const User = _User;

const router = Router();
const SECRET_KEY = "LKJnbvgHJK8765RfG";

async function createUser(req, res) {
  try {
    const { name, password, email, contact, self_describe } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name field is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password field is required." });
    }
    if (!email) {
      return res.status(400).json({ message: "Email field is required." });
    }

    const user_id = Math.floor(Math.random() * 1000000);

    const newUser = await User.create({
      name,
      password,
      email,
      contact,
      self_describe,
      user_id,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user." });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ message: "Email not found!" });
    }

    if (password != user.password) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = sign({ sub: user.user_id, exp }, SECRET_KEY);

    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
    });

    res.json({
      message: `Welcome, ${user.name}`,
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function logout(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    res.clearCookie("Authorization");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// async function getUsers(req, res, next) {
//   try {
//     const users = await User.findAll()
//       .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message ||
//             "Some error occured while getting user data. Please try again!",
//         });
//       });
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// }

// Get user by ID
// async function getUserById(req, res, next) {
//   try {
//     const userId = req.params.id;
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// }
async function updateUser(req, res, next) {
  try {
    const id = req.params.id; // Extract the id from the URL parameter

    // Update the user where the user_id matches the extracted id
    const [num] = await User.update(req.body, {
      where: { user_id: id },
    });

    if (num === 1) {
      res.status(200).json({
        message: "User data updated successfully",
      });
    } else {
      res.status(404).json({
        message: `Cannot update user with id ${id}. User not found or request body was empty`,
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Failed to update user",
    });
  }
}

async function deleteUser(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res
      .status(204)
      .json({ message: `User with ID ${userId} has been deleted` });
  } catch (error) {
    next(error);
  }
}
module.exports = { login, logout, createUser, updateUser, deleteUser };
