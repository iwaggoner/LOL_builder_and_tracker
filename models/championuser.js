'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class championuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  championuser.init({
    userId: DataTypes.INTEGER,
    championId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'championuser',
  });
  return championuser;
};