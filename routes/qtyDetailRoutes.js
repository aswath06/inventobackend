const express = require('express');
const router = express.Router();
const controller = require('../controllers/qtyDetailController');

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.get);

module.exports = router;
