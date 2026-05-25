const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reel extends Model {
    static associate(models) {
      // define association here
    }
  }
  Reel.init({
    title:       { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT,   allowNull: true },
    duration:    { type: DataTypes.STRING, allowNull: true },
    thumbnail:   { type: DataTypes.STRING, allowNull: true },  // uploaded image path
    videoLink:   { type: DataTypes.STRING, allowNull: false },  // YouTube/Vimeo/FB URL
  }, {
    sequelize,
    modelName: 'Reel',
  });
  return Reel;
};
