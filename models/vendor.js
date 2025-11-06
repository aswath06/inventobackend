'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    vendorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Vendor.associate = function(models) {
    Vendor.hasMany(models.QtyDetail, {
      foreignKey: 'vendorId',
      as: 'qtyDetails',
    });
  };

  return Vendor;
};
