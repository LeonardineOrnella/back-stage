const Categorie =  require ('../models/categ.model');

exports.getAllCategorie = (req, res) => {
    Categorie.getAll((err, results) => {
        if (err) throw err;
        res.json(results);
      });
 
};

exports.getByIdCategorie = (req, res) => {
    const id_categ = req.params.id;
    Categorie.getById(id_categ, (err, result) => {
      if (err) throw erreur;
      res.json(result[0]);
    });
  };

exports.createCategorie = (req, res) => {
    const data = req.body;
    console.log(data);
    
    Categorie.create(data, (err, result) =>{
        if(err) throw err;
        res.json({message:'ajoute avec succé'});
    });
};

exports.updateCategorie = (req, res) => {
    const id_categ = req.params.id;
    const data = req.body;
    Categorie.update(id_categ, data, (err) => {
      if (err) throw err;
      res.json({ message: 'Categorie modifié' });
    });
  };
  
  exports.deleteCategorie = (req, res) => {
    const id_categ = req.params.id;
    console.log(id_categ);
    
    Categorie.delete(id_categ, (err) => {
      if (err) throw erreur;
      res.json({ message: 'Categorie supprimé' });
    });
  };
  