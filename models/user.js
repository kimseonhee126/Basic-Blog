'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      // define association here
      db.User.hasMany(db.Post,
        {
          foreignKey: "writerId",
          sourceKey: "id",
        });
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING(5),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};