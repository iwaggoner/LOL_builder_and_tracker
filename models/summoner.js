'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class summoner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.summoner.belongsToMany(model.user)
    }
  };
  summoner.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    puuid: DataTypes.STRING,
    profileIconId: DataTypes.INTEGER,
    summonerLevel: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'summoner',
  });
  return summoner;
};