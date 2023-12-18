const express = require('express');
const productRoute = require('./product.route');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the My-Store-API-Express API!');
});

router.use('/products', productRoute);

module.exports = router;
