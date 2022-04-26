const express = require('express')
const app = express()
const {Post} = require('../models')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const findAll = (req,res) =>{
    Post.findAll().then(posts => {
        res.send(posts)
    })
}

const createPost = (req,res) =>{
    Post.create({
        tittle: req.body.tittle,
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
    deletePost
}