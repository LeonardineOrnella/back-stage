const express = require ('express');
const router = express.Router();
const Reponse = require ('../controllers/reponse.controller');

router.get('/', Reponse.getAllReponse);
router.get('/:id', Reponse.getByIdReponse);
router.post('/', Reponse.createReponse);
router.put('/:id', Reponse.updateReponse);
router.delete('/:id', Reponse.deleteReponse);


module.exports = router;