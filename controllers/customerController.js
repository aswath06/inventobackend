const { Customer } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { customerName } = req.body;
      const customer = await Customer.create({ customerName });
      res.status(201).json(customer);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async list(req, res) {
    try {
      const customers = await Customer.findAll();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async get(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) return res.status(404).json({ message: 'Not found' });
      res.json(customer);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) return res.status(404).json({ message: 'Not found' });
      customer.customerName = req.body.customerName ?? customer.customerName;
      await customer.save();
      res.json(customer);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) return res.status(404).json({ message: 'Not found' });
      await customer.destroy();
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
