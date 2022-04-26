const express = require('express')
const app = express()
const db = require('./models')

//settings
app.set('port', process.env.PORT || 8080);

//middleware
app.use(express.json())

//routes
const postRoutes = require('./routes/PostRoutes')
app.use('/posts', postRoutes)

db.sequelize.sync().then(() => {
    app.listen(8080, ()=>{
        console.log('Server running on port: '+ app.get('port'))
    })
})
