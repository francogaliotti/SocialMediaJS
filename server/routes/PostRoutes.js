const express = require('express')
const router = express.Router()
const postsController = require('../controllers/PostController')
const auth = require('../middlewares/auth')

router.get('/', auth, postsController.findAll)
router.post('/', auth, postsController.createPost)
router.delete('/:id', auth, postsController.deletePost)
router.get('/:id', auth, postsController.findById)
router.get('/user/:id', auth, postsController.findByUserId)
router.put('/title/:id', auth, postsController.updatePostTitle)
router.put('/body/:id', auth, postsController.updatePostBody)


module.exports = router