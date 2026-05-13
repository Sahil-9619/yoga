'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workshop extends Model {

    static associate(models) {
      Workshop.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Workshop.hasMany(models.Booking, { foreignKey: 'workshopId' });
    }
  }
  Workshop.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.STRING,
    mode: DataTypes.STRING,
    location: DataTypes.STRING,
    platform: DataTypes.STRING,
    priceType: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Workshop',
  });
  return Workshop;
};