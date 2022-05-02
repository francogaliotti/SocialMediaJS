const express = require('express')
const { Post, Comment, sequelize } = require('../models')


const findByPost = (req, res) => {
    const postId = req.params.postId
    Post.findByPk(postId).then(post => {
        Comment.findAll({
            where: {
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
const createComment = (req, res) => {
    const postId = req.body.PostId
    const username = req.user.username
    Post.findByPk(postId).then(post => {
        Comment.create({
            commentBody: req.body.commentBody,
            PostId: post.id,
            username: username
        }).then(comment => {
            res.send(comment)
        })
    }).catch(err => {
        res.status(400).json({
            error: 'Bad Data'
        })
    })
}

const deleteComment = (req, res) => {
    const id = req.params.id
    Comment.destroy({
        where: {
            id: id
        }
    }).then((comment) => {
        res.json("comment destroyed")
    }).catch(err => {
        res.status(500).json(err)
    })
}


module.exports = {
    findByPost,
    createComment,
    deleteComment
}