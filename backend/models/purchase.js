'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    static associate(models) {
      Purchase.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Purchase.belongsTo(models.Video, { foreignKey: 'videoId', as: 'video' });
    }
  }

  Purchase.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    videoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'completed' // For dummy payment
    }
  }, {
    sequelize,
    modelName: 'Purchase',
    tableName: 'purchases',
  });

  return Purchase;
};
