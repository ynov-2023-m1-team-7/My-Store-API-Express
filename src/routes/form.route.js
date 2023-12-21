const express = require('express');

const router = express.Router();
const formController = require('../controllers/form.controller');

router.get('/:id', formController.getForm);
router.get('/', formController.getForms);
router.post('/', formController.createForm);

module.exports = router;
