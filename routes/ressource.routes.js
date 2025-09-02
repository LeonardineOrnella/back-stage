const express = require('express');
const router = express.Router();
const Ressource = require('../controllers/ressource.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const { single } = require('../middlewares/upload.middleware');

router.get('/', authenticateToken, Ressource.getAllRessource);
router.get('/chapitre/:id_chap', Ressource.getByChapitre);
router.get('/:id', Ressource.getByIdRessource);
router.post('/', authenticateToken, single, Ressource.createRessource); // Upload fichier
router.put('/:id', single, Ressource.updateRessource);
router.delete('/:id', Ressource.deleteRessource);

module.exports = router;
