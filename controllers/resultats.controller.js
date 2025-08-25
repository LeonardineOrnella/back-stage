const Resultat =  require ('../models/resultats.model');

exports.getAllResultat = (req, res) => {
    Resultat.getAll((err, results) => {
        if (err) throw erreur;
        res.json(results);
      });
 
};

exports.getByIdResultat = (req, res) => {
    const id_result = req.params.id;
    Resultat.getById(id_result, (err, result) => {
      if (err) throw erreur;
      res.json(result[0]);
    });
  };

exports.createResultat = (req, res) => {
    const data = req.body;
    Resultat.create(data, (err, result) =>{
        if(err) throw erreur;
        res.json({message:'ajoute avec succé'});
    });
};

exports.updateResultat = (req, res) => {
    const id_result = req.params.id;
    const data = req.body;
    Resultat.update(id_result, data, (err) => {
      if (err) throw erreur;
      res.json({ message: 'Resultat modifié' });
    });
  };
  
  exports.deleteResultat = (req, res) => {
    const id_result = req.params.id;
    Resultat.delete(id_result, (err) => {
      if (err) throw erreur;
      res.json({ message: 'Resultat supprimé' });
    });
  };
  