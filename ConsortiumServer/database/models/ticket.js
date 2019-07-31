'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    uniqueId:{
      allowNull:false,
      primaryKey: true,
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    subject: {
    type:DataTypes.STRING,
      allowNull:false,
   },
   images:{
     type:DataTypes.STRING,
       allowNull:true,
   },
   status: {
    type:DataTypes.STRING,
     allowNull: false,
   },
   message: {
     type:DataTypes.STRING,
    allowNull:false,
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
  ticket.associate = function (models) {

  };
  return ticket;
};
