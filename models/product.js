'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    qrcode: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {});

  Product.associate = function(models) {
    Product.hasMany(models.QtyDetail, {
      foreignKey: 'productQrcode',
      sourceKey: 'qrcode',
      as: 'qtyDetails',
    });
  };

  return Product;
};
