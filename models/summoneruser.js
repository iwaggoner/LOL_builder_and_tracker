'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class summoneruser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  summoneruser.init({
    userId: DataTypes.INTEGER,
    summonerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'summoneruser',
  });
  return summoneruser;
};