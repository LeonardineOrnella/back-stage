const express = require('express');
const router = express.Router();
const Formation = require('../controllers/formation.controller');
const { formation } = require('../middlewares/upload.middleware');

router.get('/', Formation.getAllFormation);
router.get('/:id', Formation.getByIdFormation);
router.post('/', formation, Formation.createFormation); // Gère couverture + ressources
router.put('/:id', Formation.updateFormation);
router.delete('/:id', Formation.deleteFormation);

module.exports = router;


