const express = require ('express');
const router = express.Router();
const Chapitre = require ('../controllers/chap.controller');

router.get('/', Chapitre.getAllChapitre);
router.get('/categorie/:id_categ', Chapitre.getByCategorie);
router.get('/:id', Chapitre.getByIdChapitre);
router.post('/', Chapitre.createChapitre);
router.put('/:id', Chapitre.updateChapitre);
router.delete('/:id', Chapitre.deleteChapitre);


module.exports = router;