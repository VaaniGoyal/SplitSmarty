const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../models')
const User = db.User;
const Op = db.sequelize.Op;

const router = express.Router()
const SECRET_KEY = 'LKJnbvgHJK8765RfG'

function signUp(req, res) {
    try {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            creation_date: new Date(),
            self_description: req.body.self_description,
            phone_number: req.body.phone_number,
            upi_id: req.body.upi_id
        })

        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log(err);
        }
    );

    if (!user) {
        return res.status(400).json({
            message: 'Email not found!',
        })
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({
            message: 'Wrong password!',
        })
    }

    // jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user.user_id, exp }, SECRET_KEY)

    res.cookie("Authorization", token, {
        expires: new Date(exp),
        httpOnly: true,
        sameSite: "lax",
    });

    res.json({
        message: `Welcome back, ${user.username}`,
        token: token,
    })

    // get all user datails
}

async function logout(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Get token from Authorization header
        // Here, you might want to add the token to a blacklist in your database if you're using a blacklist approach
        res.status(200).json({ message: 'Logged out successfully', token: token });
        router.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// client-side logout
// const logout = () => {
//     localStorage.removeItem('token'); // Remove token from local storage
//     // Optionally redirect to login page or perform any other actions
// };

// Create a new user
async function createUser(req, res, next) {
    try {
        if(!req.body.email) {
            res.status(400).send({
                message: 'Email id cannot be empty!'
            });
            return;
        }

        // add all attributes
        const { username, email } = req.body;
        const user = await User.create({ username, email }).then(
            data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating user. Please try again!"
                })
            })
        res.json(user);

    } catch (error) {
        next(error);
    }
}

// Get all users
async function getUsers(req, res, next) {
    try {
        const users = await User.findAll().then(
            data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while getting user data. Please try again!"
                });
            });
        res.json(users);
    } catch (error) {
        next(error);
    }
}

// Get user by ID
async function getUserById(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

// Get user by title
async function getUserByUsername(req, res, next) {
    try {
        const username = req.query.username;
        var condition = username ? { username: { [Op.like]: `%${username}%`} } : null;

        User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Some error occured while getting user data. Please try again!"
            });
        });
    } catch (error) {
        next(error)
    }
}

// Update user
async function updateUser(req, res, next) {
    try {
        const id = req.params.id;
        User.update(req.body, {
            where: {id: id}
        })
        .then(num => {
            if( num === 1) {
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
                message: err.message || `Error updating USer with id=${id}`
            })
        })
        // const user = await User.findByPk(userId);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
        // user.username = username;
        // user.email = email;
        // await user.save();
    } catch (error) {
        next(error);
    }
}

// Delete user
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

module.exports = {
    login, logout, signUp,
    createUser,
    getUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser
}