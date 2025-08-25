const Chapitre =  require ('../models/chap.model');

exports.getAllChapitre = (req, res) => {
    Chapitre.getAll((err, results) => {
        if (err) throw erreur;
        res.json(results);
      });
 
};

exports.getByCategorie = (req, res) => {
  const id_categ = req.params.id_categ;
  Chapitre.getByCategorie(id_categ, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getByIdChapitre = (req, res) => {
    const id_chap = req.params.id;
    Chapitre.getById(id_chap, (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });
  };

exports.createChapitre = (req, res) => {
    const data = req.body;
    Chapitre.create(data, (err, result) =>{
        if(err) throw err;
        res.json({message:'ajoute avec succé'});
    });
};

exports.updateChapitre = (req, res) => {
    const id_chap = req.params.id;
    const data = req.body;
    Chapitre.update(id_chap, data, (err) => {
      if (err) throw err;
      res.json({ message: 'Chapitre modifié' });
    });
  };
  
  exports.deleteChapitre = (req, res) => {
    const id_chap = req.params.id;
    Chapitre.delete(id_chap, (err) => {
      if (err) throw err;
      res.json({ message: 'Chapitre supprimé' });
    });
  };
  