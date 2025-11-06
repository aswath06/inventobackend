const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:qrcode', controller.get);
router.put('/:qrcode', controller.update);
router.delete('/:qrcode', controller.remove);

module.exports = router;
