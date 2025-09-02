const express = require ('express');
const router = express.Router();
const Categorie = require ('../controllers/categ.controller');
const authenticateToken = require('../middlewares/auth.middleware')

router.get('/', Categorie.getAllCategorie);
router.get('/:id', Categorie.getByIdCategorie);
router.post('/', Categorie.createCategorie);
router.put('/:id', Categorie.updateCategorie);
router.delete('/:id', Categorie.deleteCategorie);


module.exports = router;