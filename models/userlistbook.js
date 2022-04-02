'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userListBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userListBook.belongsTo(models.user,{
        as:"user",
        foreignKey:{
          name:"idUser"
        }
      })

      userListBook.belongsTo(models.book,{
        as:"book",
        foreignKey:{
          name:"idBook"
        }
      })
    }
  }
  userListBook.init({
    idUser: DataTypes.INTEGER,
    idBook: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userListBook',
  });
  return userListBook;
};