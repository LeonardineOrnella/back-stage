const Question = require('../models/question.model');

exports.getAllQuestion = (req, res) => {
    Question.getAll((err, result) => {
        if (err) throw erreur;
        res.json(result);
    });
}

exports.getByIdQuestion = (req, res) => {
    const id_quest = req.parames.id;
    Question.getById(id_quest, (err, result) => {
        if (err) throw erreur;
        res.json(result[0]);
    });
}

exports.createQuestion = (req, res) => {
    const data = req.body;
    Question.create(data, (err, result) =>{
        if(err) throw erreur;
        res.json({message:'ajoute avec succé'});
    });
};



exports.updateQuestion = (req, res) => {
    const id_quest = req.params.id;
    const data = req.body;
    Question.update(id_quest, data, (err) => {
      if (err) throw erreur;
      res.json({ message: 'Question modifié' });
    });
  };
  
  exports.deleteQuestion = (req, res) => {
    const id_quest = req.params.id;
    Question.delete(id_quest, (err) => {
      if (err) throw erreur;
      res.json({ message: 'Question supprimé' });
    });
  };
