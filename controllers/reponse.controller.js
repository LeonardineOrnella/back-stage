const Reponse =  require ('../models/reponse.model');

exports.getAllReponse = (req, res) => {
    Reponse.getAll((err, results) => {
        if (err) throw erreur;
        res.json(results);
      });
 
};

exports.getByIdReponse = (req, res) => {
    const id_rep = req.params.id;
    Reponse.getById(id_rep, (err, result) => {
      if (err) throw erreur;
      res.json(result[0]);
    });
  };

exports.createReponse = (req, res) => {
    const data = req.body;
    Reponse.create(data, (err, result) =>{
        if(err) throw erreur;
        res.json({message:'ajoute avec succé'});
    });
};

exports.updateReponse = (req, res) => {
    const id_rep = req.params.id;
    const data = req.body;
    Reponse.update(id_rep, data, (err) => {
      if (err) throw erreur;
      res.json({ message: 'Reponse modifié' });
    });
  };
  
  exports.deleteReponse = (req, res) => {
    const id_rep = req.params.id;
    Reponse.delete(id_rep, (err) => {
      if (err) throw erreur;
      res.json({ message: 'Reponse supprimé' });
    });
  };
  