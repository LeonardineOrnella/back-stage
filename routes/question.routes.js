const express = require ('express');
const router = express.Router();
const Question = require ('../controllers/question.controller');

router.get('/', Question.getAllQuestion);
router.get('/:id',Question.getByIdQuestion );
router.post('/',Question.createQuestion);
router.put('/:id', Question.updateQuestion);
router.delete('/:id', Question.deleteQuestion);


module.exports = router;