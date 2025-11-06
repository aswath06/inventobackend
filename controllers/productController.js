const { Product, QtyDetail, sequelize } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { qrcode, productName, totalQuantity = 0 } = req.body;
      const [product, created] = await Product.findOrCreate({
        where: { qrcode },
        defaults: { productName, totalQuantity },
      });
      if (!created) {
        return res.status(409).json({ message: 'Product with this qrcode already exists', product });
      }
      return res.status(201).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  async list(req, res) {
    try {
      const products = await Product.findAll({ include: [{ model: QtyDetail, as: 'qtyDetails' }] });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async get(req, res) {
    try {
      const { qrcode } = req.params;
      const product = await Product.findByPk(qrcode, { include: [{ model: QtyDetail, as: 'qtyDetails' }] });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { qrcode } = req.params;
      const { productName, totalQuantity } = req.body;

      const product = await Product.findByPk(qrcode);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      if (productName !== undefined) product.productName = productName;
      if (totalQuantity !== undefined) product.totalQuantity = totalQuantity;

      await product.save();
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async remove(req, res) {
    const t = await sequelize.transaction();
    try {
      const { qrcode } = req.params;
      const product = await Product.findByPk(qrcode, { transaction: t });
      if (!product) return res.status(404).json({ message: 'Product not found' });

      await QtyDetail.destroy({ where: { productQrcode: qrcode }, transaction: t });

      await product.destroy({ transaction: t });

      await t.commit();
      res.json({ message: 'Product and related QtyDetails deleted successfully' });
    } catch (err) {
      await t.rollback();
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
};
