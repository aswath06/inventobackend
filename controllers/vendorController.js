const { Vendor } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { vendorName } = req.body;
      const vendor = await Vendor.create({ vendorName });
      res.status(201).json(vendor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async list(req, res) {
    try {
      const vendors = await Vendor.findAll();
      res.json(vendors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async get(req, res) {
    try {
      const { id } = req.params;
      const vendor = await Vendor.findByPk(id);
      if (!vendor) return res.status(404).json({ message: 'Not found' });
      res.json(vendor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const vendor = await Vendor.findByPk(id);
      if (!vendor) return res.status(404).json({ message: 'Not found' });
      vendor.vendorName = req.body.vendorName ?? vendor.vendorName;
      await vendor.save();
      res.json(vendor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      const vendor = await Vendor.findByPk(id);
      if (!vendor) return res.status(404).json({ message: 'Not found' });
      await vendor.destroy();
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
