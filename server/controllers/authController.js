const bcrypt = require('bcrypt');
const express = require('express');
const {User, sequelize} = require('../models')

const register = (req, res) => {
    if (req.body.password.length >= 4) {
        let password = bcrypt.hashSync(req.body.password, 10)
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: password
        }).then(user => {
            /*let token = jwt.sign({ user: user }, auth.secret, {
                expiresIn: auth.expires
            });
            res.json({
                user: user,
                token: token
            })*/
            res.json("user created")
        }).catch(err => {
            res.status(500).json(err)
        })
    }else{
        res.status(400).json({
            error: "The password must be at least 4 characters"
        })
    }

}

const login = (req, res) => {
    let {username, password} = req.body;
    User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if(bcrypt.compareSync(password, user.password)){
            /*let token = jwt.sign({ user: user }, auth.secret, {
                expiresIn: auth.expires
            });
            res.json({
                user: user,
                token: token
            })*/
            res.json("welcome")
        }else{
            res.status(401).json({
                error: "Incorrect password"
            })
        }
    }).catch(err => {
        res.status(400).json({
            error: "Username doesn't exist"
        })
    })
}


module.exports={
    register,
    login
}

