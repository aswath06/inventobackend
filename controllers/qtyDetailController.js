const { QtyDetail, Product, Customer, Vendor, sequelize } = require('../models');

module.exports = {
  async create(req, res) {
    const t = await sequelize.transaction();
    try {
      const { productQrcode, date, qty, price, customerId = null, vendorId = null } = req.body;

      if (!productQrcode || !qty || !price) {
        await t.rollback();
        return res.status(400).json({ message: 'productQrcode, qty and price are required' });
      }

      const product = await Product.findByPk(productQrcode, { transaction: t });
      if (!product) {
        await t.rollback();
        return res.status(404).json({ message: 'Product not found' });
      }

      const detail = await QtyDetail.create({
        productQrcode,
        date: date || new Date(),
        qty,
        price,
        customerId,
        vendorId,
      }, { transaction: t });

      let newTotal = product.totalQuantity;

      if (vendorId) {
        newTotal = newTotal + Number(qty);
      } else if (customerId) {
        newTotal = newTotal - Number(qty);
        if (newTotal < 0) newTotal = 0;
      } else {
        await t.rollback();
        return res.status(400).json({ message: 'Either vendorId or customerId is required' });
      }

      product.totalQuantity = newTotal;
      await product.save({ transaction: t });

      await t.commit();
      res.status(201).json({
        message: vendorId ? 'Stock added successfully' : 'Stock reduced successfully',
        detail,
        updatedProduct: product,
      });
    } catch (err) {
      await t.rollback();
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  async list(req, res) {
    try {
      const details = await QtyDetail.findAll({
        include: [
          { model: Product, as: 'product' },
          { model: Customer, as: 'customer' },
          { model: Vendor, as: 'vendor' },
        ],
        order: [['date', 'DESC']],
      });
      res.json(details);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async get(req, res) {
    try {
      const { id } = req.params;
      const detail = await QtyDetail.findByPk(id, {
        include: [
          { model: Product, as: 'product' },
          { model: Customer, as: 'customer' },
          { model: Vendor, as: 'vendor' },
        ],
      });
      if (!detail) return res.status(404).json({ message: 'Record not found' });
      res.json(detail);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
