const Ressource = require('../models/ressource.model');

exports.getAllRessource = (req, res) => {
    Ressource.getAll((err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.getByIdRessource = (req, res) => {
    const id_res = req.params.id;
    Ressource.getById(id_res, (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
};

exports.getByChapitre = (req, res) => {
    const id_chap = req.params.id_chap;
    Ressource.getByChapitre(id_chap, (err, results) => {
        if (err) return res.status(500).json({ error: err.message || 'Erreur serveur' });
        res.json(results);
    });
};


exports.createRessource = (req, res) => {
    const { type, id_chap } = req.body;
    if (!type || !id_chap) {
        return res.status(400).json({ error: 'Champs requis: type, id_chap' });
    }

    const data = {
        type,
        url: req.file ? `/uploads/ressources/${req.file.filename}` : null,
        id_chap: parseInt(id_chap)
    };

    Ressource.create(data, (err) => {
        if (err) return res.status(500).json({ error: err.message || 'Erreur serveur' });
        res.json({ message: 'Ressource ajoutée avec succès', fichier: data.url });
    });
};

exports.updateRessource = (req, res) => {
    const id_res = req.params.id;
    const { type, id_chap } = req.body;
    const data = {};
    if (type) data.type = type;
    if (id_chap) data.id_chap = parseInt(id_chap);
    if (req.file) data.url = `/uploads/ressources/${req.file.filename}`;

    Ressource.update(id_res, data, (err) => {
        if (err) return res.status(500).json({ error: err.message || 'Erreur serveur' });
        res.json({ message: 'Ressource modifiée' });
    });
};

exports.deleteRessource = (req, res) => {
    const id_res = req.params.id;
    Ressource.delete(id_res, (err) => {
        if (err) throw err;
        res.json({ message: 'Ressource supprimée' });
    });
};
