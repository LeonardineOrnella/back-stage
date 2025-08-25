const express = require ('express');
const router = express.Router();
const Resultat = require ('../controllers/resultats.controller');

router.get('/', Resultat.getAllResultat);
router.get('/:id', Resultat.getByIdResultat );
router.post('/',Resultat.createResultat );
router.put('/:id',Resultat.updateResultat );
router.delete('/:id',Resultat.deleteResultat );


module.exports = router;