'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SocialLink extends Model {
    static associate(models) {}
  }

  SocialLink.init({
    platform: { type: DataTypes.STRING, allowNull: false, unique: true }, // facebook, instagram, youtube
    url:      { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  }, {
    sequelize,
    modelName: 'SocialLink',
  });

  return SocialLink;
};
