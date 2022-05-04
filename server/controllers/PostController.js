const express = require('express')
const {Post, Like, sequelize} = require('../models')


const findAll = (req,res) =>{
    Post.findAll({
        order: sequelize.literal('createdAt DESC'),
        include: [Like]
    }).then(listOfPosts => {
        Like.findAll({
            where: {UserId: req.user.id}
        }).then(likedPosts => {
            res.json({
                listOfPosts: listOfPosts,
                likedPosts: likedPosts
            })
        })
    }).catch(err => {
        console.log(err)
    })
}

const findById = (req,res) =>{
    const id = req.params.id
    Post.findByPk(id,{
        include: [Like]
    }).then(post => {
        res.send(post)
    })
}

const createPost = (req,res) =>{
    Post.create({
        title: req.body.title,
        postText: req.body.postText,
        username: req.user.username,
        UserId: req.user.id
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