import { Op } from "sequelize";
import { Router } from "express";
import { hashSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User as _User } from "../models";
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

  const user = await User.findOne({ where: { email } }).catch((err) => {
    console.log(err);
  });

  if (!user) {
    return res.status(400).json({
      message: "Email not found!",
    });
  }

  const passwordMatch = compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({
      message: "Wrong password!",
    });
  }

  // jwt token
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  const token = sign({ sub: user.user_id, exp }, SECRET_KEY);

  res.cookie("Authorization", token, {
    expires: new Date(exp),
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    message: `Welcome back, ${user.name}`,
    token: token,
  });
}

async function logout(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    res.status(200).json({ message: "Logged out successfully", token: token });
    router.redirect("/");
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// Get user by title
async function name(req, res, next) {
  try {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    User.findAll({ where: condition })
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
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = req.params.id;
    User.update(req.body, {
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
          message: err.message || `Error updating USer with id=${id}`,
        });
      });
  } catch (error) {
    next(error);
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
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export default { login, logout, createUser, name, updateUser, deleteUser };
