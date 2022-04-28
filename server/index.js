const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')

//settings
app.set('port', process.env.PORT || 8080);

//middleware
app.use(express.json())
app.use(cors())

//routes
const postRoutes = require('./routes/PostRoutes')
app.use('/posts', postRoutes)
const commentRoutes = require('./routes/CommentRoutes')
app.use('/comments', commentRoutes)
const userRoutes = require('./routes/authRoutes')
app.use('/auth', userRoutes)

//server
db.sequelize.sync().then(() => {
    app.listen(8080, ()=>{
        console.log('Server running on port: '+ app.get('port'))
    })
})
