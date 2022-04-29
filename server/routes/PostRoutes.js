const express = require('express')
const router = express.Router()
const postsController = require('../controllers/PostController')
const auth = require('../middlewares/auth')

router.get('/', auth, postsController.findAll)
router.post('/', auth, postsController.createPost)
router.delete('/:id', auth, postsController.deletePost)
router.get('/:id', auth, postsController.findById)


module.exports = router