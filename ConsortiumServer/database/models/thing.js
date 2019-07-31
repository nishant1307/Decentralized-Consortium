'use strict';
module.exports = (sequelize, DataTypes) => {
  const thing = sequelize.define('thing', {
    uniqueId:{
      allowNull:false,
      primaryKey: true,
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thingValue:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    thingStory:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    uri: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    certificationLinks: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    claims: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    associationStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
}, {});
  thing.associate = function (models) {

  };
  return thing;
};
