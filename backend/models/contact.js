'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Contact extends Model { }

  Contact.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,

      modelName: 'Contact',

      tableName: 'contact',

      freezeTableName: true
    }
  );

  return Contact;
};