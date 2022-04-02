'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsToMany(models.user,{
        as:"user",
        through:{
          model:"userListBook",
          as:"bridge"
        },
        foreignKey:"idUser"
      })
    }
  }
  book.init({
    title: DataTypes.STRING,
    publicationDate: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    author: DataTypes.STRING,
    isbn: DataTypes.STRING,
    about: DataTypes.TEXT,
    bookFile:DataTypes.STRING,
    imgCover:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};