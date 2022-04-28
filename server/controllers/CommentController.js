const express = require('express')
const {Post, Comment, sequelize} = require('../models')


const findByPost = (req, res) =>{
    const postId = req.params.postId
    Post.findByPk(postId).then(post => {
        Comment.findAll({
            where:{
                PostId: post.id
            },
            order: sequelize.literal('createdAt DESC')
        }).then(comment => {
            res.send(comment)
        })
    }).catch(err => {
        res.status(400).json({
            error: 'Bad Data'
        })
    })
}
const createComment =(req,res) =>{
    const postId = req.body.PostId
    Post.findByPk(postId).then(post => {
        Comment.create({
            commentBody: req.body.commentBody,
            PostId: post.id
        }).then(comment => {
            res.send(comment)
        })
    }).catch(err => {
        res.status(400).json({
            error: 'Bad Data'
        })
    })
}


module.exports={
    findByPost,
    createComment
}