const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

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
        res.status(200).json({ message: 'Logged out successfully' });
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


module.exports = {
    login, logout, signUp
}