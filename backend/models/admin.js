'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Admin extends Model { }

  Admin.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'admin',
      freezeTableName: true
    }
  );

  return Admin;
};