const express = require('express');
const router = express.Router();
const Formation = require('../controllers/formation.controller');
const { array } = require('../middlewares/upload.middleware');

router.get('/', Formation.getAllFormation);
router.get('/:id', Formation.getByIdFormation);
router.post('/', array, Formation.createFormation); // Max 10 fichiers
router.put('/:id', Formation.updateFormation);
router.delete('/:id', Formation.deleteFormation);

module.exports = router;


