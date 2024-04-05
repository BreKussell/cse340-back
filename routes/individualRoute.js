// Needed Resources
const express = require('express');
const router = new express.Router();
const indivCont = require('../controllers/individualController');

// Route to build individual classification view
router.get(
  '/inv/type/:classificationId/detail/:individualId',
  indivCont.buildByClassificationId
);

module.exports = router;