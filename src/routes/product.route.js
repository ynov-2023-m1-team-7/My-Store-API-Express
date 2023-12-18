const express = require('express');

const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.put('/', productController.updateAllProductsImages);

module.exports = router;
