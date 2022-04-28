const express = require('express')
const {Post, sequelize} = require('../models')


const findAll = (req,res) =>{
    Post.findAll({
        order: sequelize.literal('createdAt DESC')
    }).then(posts => {
        res.send(posts)
    })
}

const findById = (req,res) =>{
    const id = req.params.id
    Post.findByPk(id).then(post => {
        res.send(post)
    })
}

const createPost = (req,res) =>{
    Post.create({
        title: req.body.title,
        postText: req.body.postText,
        username: req.body.username
    }).then(post => {
        res.json(post)
    })
}

const deletePost = (req, res) => {
    let id = req.params.id
    Post.findOne({
        where: {
            id: id
        }
    }).then(post => {
        post.destroy().then(post => {
            res.send('post deleted')
        })
    }).catch(err => {
        res.status(400).json({
            error: 'bad data'
        })
    })
}

module.exports={
    findAll,
    createPost,
    deletePost,
    findById
}