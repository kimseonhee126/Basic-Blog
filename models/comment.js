'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      // define association here
      db.Comment.belongsTo(db.Post,
        {
          foreignKey: "postId",
          targetKey: "id",
        }
      ),
      db.Comment.belongsTo(db.User,
        {
          foreignKey: "writerId",
          targetKey: "id",
        }
      );
    }
  }
  Comment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING(10),
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    writerId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};