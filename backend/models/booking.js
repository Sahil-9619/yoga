'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Workshop, { foreignKey: 'workshopId', onDelete: 'SET NULL' });
    }
  }

  Booking.init({
    name:       { type: DataTypes.STRING, allowNull: false },
    email:      { type: DataTypes.STRING, allowNull: false },
    phone:      { type: DataTypes.STRING, allowNull: false },
    workshopId: { type: DataTypes.INTEGER, allowNull: true },
    workshopTitle: { type: DataTypes.STRING },
    categoryName:  { type: DataTypes.STRING },
    amount:     { type: DataTypes.DECIMAL },
    priceType:  { type: DataTypes.STRING },
    status:     { type: DataTypes.STRING, defaultValue: 'confirmed' },
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
