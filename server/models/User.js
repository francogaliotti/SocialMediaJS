module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 255],
          msg: "The username must be at least 4 characters"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Forbidden email"
        }
      }
    }
  })
  User.associate = (models) => {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    })
    User.hasMany(models.Like, {
      onDelete: "cascade"
    })
  }
  return User
}