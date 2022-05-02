const express = require('express')
const { Like, sequelize } = require('../models')


const createLike =  async (req, res) => {
    const UserId = req.user.id
    const PostId = req.body.PostId
    const found = await Like.findOne({
        where: { UserId: UserId, PostId: PostId }
    })
    if(!found){
        Like.create({ UserId: UserId, PostId: PostId }).then(like => {
            res.send({liked: true})
        })
    } else {
        Like.destroy({
            where: { UserId: UserId, PostId: PostId }
        }).then(like => {
            res.send({liked: false})
        })
    }

}

module.exports = {
    createLike
}