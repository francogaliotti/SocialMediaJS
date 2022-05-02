const express = require('express')
const router = express.Router()
const commentController = require('../controllers/CommentController')
const auth = require('../middlewares/auth')

router.get('/:postId', auth, commentController.findByPost)
router.post('/', auth, commentController.createComment)
router.delete('/:id', auth, commentController.deleteComment)


module.exports = router