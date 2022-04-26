const express = require('express')
const router = express.Router()
const postsController = require('../controllers/PostController')

router.get('/', postsController.findAll)
router.post('/', postsController.createPost)
router.delete('/:id', postsController.deletePost)


module.exports = router