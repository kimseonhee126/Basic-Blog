'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      // define association here
      db.Post.belongsTo(db.User, 
        {
          foreignKey: "writerId",
          targetKey: "id",
        }
      ),
      db.Post.hasMany(db.Comment,
        {
          foreignKey: "writerId",
          sourceKey: "id",
        }
      );
    }
  }
  Post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING(10),
    },
    writerId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};