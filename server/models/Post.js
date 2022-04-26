module.exports = (sequelize, DataTypes) =>{
    const Post = sequelize.define("Post", {
        tittle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Post
}