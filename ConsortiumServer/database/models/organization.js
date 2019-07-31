'use strict';
module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    uniqueId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    organizationName: {
      type: DataTypes.STRING,
      unique: true
    },

    primaryIndustry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    certificationLinks: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    claims: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {});
  organization.associate = function (models) {
    organization.belongsToMany(models.project, {
      through: models.ProjectOrganizations
    });

    organization.hasMany(models.thing, {
      foreignKey: 'organization_id',
      onDelete: 'CASCADE',
    });

    organization.hasMany(models.client, {
      foreignKey: 'organization_id',
      onDelete: 'CASCADE',
    })
    organization.hasOne(models.userCurrencyAddress, {
     foreignKey: "organization_id",
     onDelete: 'CASCADE'
   })
  };
  return organization;
};
