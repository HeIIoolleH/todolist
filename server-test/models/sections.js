'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sections.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
    type: DataTypes.STRING,
    },
    index: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Sections',
    freezeTableName: true,
    timestamps: false
  });
  return Sections;
};