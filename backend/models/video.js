'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {}
  }

  Video.init({
    title:       { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT,   allowNull: true },
    duration:    { type: DataTypes.STRING, allowNull: true },
    thumbnail:   { type: DataTypes.STRING, allowNull: true },  // uploaded image path
    videoLink:   { type: DataTypes.STRING, allowNull: false },  // YouTube/Vimeo URL
  }, {
    sequelize,
    modelName: 'Video',
  });

  return Video;
};
