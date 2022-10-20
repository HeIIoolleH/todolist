'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Items.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    section_num: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    index: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Items',
    freezeTableName: true,
    timestamps: false
  });
  return Items;
};