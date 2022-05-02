const express = require('express')
const router = express.Router()
const likeController = require('../controllers/LikeController')
const auth = require('../middlewares/auth')

router.post('/', auth, likeController.createLike)



module.exports = router