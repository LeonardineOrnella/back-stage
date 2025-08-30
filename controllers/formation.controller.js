const Formation = require('../models/formation.model');
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllFormation = (req, res) => {
    Formation.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message || 'Erreur serveur' });
        res.json(results);
    });
};

exports.getByIdFormation = (req, res) => {
    const id_form = req.params.id;
    Formation.getById(id_form, (err, result) => {
        if (err) return res.status(500).json({ error: err.message || 'Erreur serveur' });
        res.json(result[0]);
    });
};

exports.createFormation = (req, res) => {
    const body = req.body || {};
    const files = req.files || {};
    
    // Parser le JSON de formation
    let formationData = {};
    let chapitres = [];
    
    try {
        if (body.formation) {
            const formationJson = JSON.parse(body.formation);
            formationData = { ...formationJson };
            chapitres = Array.isArray(formationJson.chapitres) ? formationJson.chapitres : [];
            delete formationData.chapitres;
        } else {
            // Fallback: essayer de parser directement
            formationData = { ...body };
            chapitres = Array.isArray(body.chapitres) ? body.chapitres : [];
            delete formationData.chapitres;
        }
    } catch (error) {
        console.error('Erreur parsing JSON:', error);
        return res.status(400).json({ error: 'Format JSON invalide dans le champ formation' });
    }
    
    // Gérer l'image de couverture
    if (files.image_couverture && files.image_couverture.length > 0) {
        const imageFile = files.image_couverture[0];
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(imageFile.originalname);
        const filename = uniqueName + ext;
        const filepath = path.join('uploads', 'couvertures', filename);
        
        // Sauvegarder l'image
        fs.writeFileSync(filepath, imageFile.buffer);
        formationData.image_couverture = `/uploads/couvertures/${filename}`;
    }
    
    // Debug: afficher ce qui est reçu
    console.log('Formation Data:', formationData);
    console.log('Chapitres:', chapitres);
    console.log('Files:', files);
    console.log('Image de couverture:', formationData.image_couverture);

    db.beginTransaction((txErr) => {
        if (txErr) return res.status(500).json({ error: txErr.message || 'Erreur transaction' });

        // 1) Créer formation
        db.query('INSERT INTO formation.formations SET ?', formationData, (fErr, fResult) => {
            if (fErr) {
                return db.rollback(() => res.status(500).json({ error: fErr.message || 'Erreur création formation' }));
            }

            const id_form = fResult.insertId;

            // 2) Si pas de chapitres, commit direct
            if (chapitres.length === 0) {
                return db.commit((cErr) => {
                    if (cErr) return db.rollback(() => res.status(500).json({ error: cErr.message || 'Erreur commit' }));
                    res.json({ message: 'Formation ajoutée avec succès', id_form });
                });
            }

            // 3) Insérer chapitres (+ ressources)
            const createdChapitres = [];

            const insertChapitreAt = (index) => {
                if (index >= chapitres.length) {
                    return db.commit((cErr) => {
                        if (cErr) return db.rollback(() => res.status(500).json({ error: cErr.message || 'Erreur commit' }));
                        res.json({ message: 'Formation + chapitres + ressources créés', id_form, chapitres: createdChapitres });
                    });
                }

                const chap = chapitres[index] || {};
                const ressources = Array.isArray(chap.ressources) ? chap.ressources : [];
                const chapitreData = { ...chap };
                delete chapitreData.ressources;
                chapitreData.id_form = id_form;

                db.query('INSERT INTO formation.chapitres SET ?', chapitreData, (chErr, chResult) => {
                    if (chErr) {
                        return db.rollback(() => res.status(500).json({ error: chErr.message || 'Erreur création chapitre' }));
                    }

                    const id_chap = chResult.insertId;

                    if (ressources.length === 0) {
                        createdChapitres.push({ id_chap });
                        return insertChapitreAt(index + 1);
                    }

                    const createdRessources = [];

                    const insertRessourceAt = (rIndex) => {
                        if (rIndex >= ressources.length) {
                            createdChapitres.push({ id_chap, ressources: createdRessources });
                            return insertChapitreAt(index + 1);
                        }

                        const ressource = ressources[rIndex] || {};
                        let ressourceData = {
                            type: ressource.type,
                            id_chap: id_chap,
                        };
                        
                        // Si c'est un fichier uploadé (pas une URL)
                        if (ressource.fileIndex !== undefined && files.ressources && files.ressources[ressource.fileIndex]) {
                            const ressourceFile = files.ressources[ressource.fileIndex];
                            const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
                            const ext = path.extname(ressourceFile.originalname);
                            const filename = uniqueName + ext;
                            const filepath = path.join('uploads', 'ressources', filename);
                            
                            // Sauvegarder le fichier
                            fs.writeFileSync(filepath, ressourceFile.buffer);
                            
                            ressourceData.url = `/uploads/ressources/${filename}`;
                            ressourceData.nom_fichier = ressourceFile.originalname;
                            ressourceData.taille_fichier = ressourceFile.size;
                        } else {
                            ressourceData.url = ressource.url || null;
                            ressourceData.nom_fichier = ressource.nom_fichier || null;
                            ressourceData.taille_fichier = ressource.taille_fichier || null;
                        }

                        db.query('INSERT INTO formation.ressources SET ?', ressourceData, (rErr, rResult) => {
                            if (rErr) {
                                return db.rollback(() => res.status(500).json({ error: rErr.message || 'Erreur création ressource' }));
                            }
                            createdRessources.push({ id_res: rResult.insertId });
                            insertRessourceAt(rIndex + 1);
                        });
                    };

                    insertRessourceAt(0);
                });
            };

            insertChapitreAt(0);
        });
    });
};

exports.updateFormation = (req, res) => {
    const id_form = req.params.id;
    const data = req.body;
    Formation.update(id_form, data, (err) => {
        if (err) return res.status(500).json({ error: err.message || 'Erreur serveur' });
        res.json({ message: 'Formation modifiée' });
    });
};

exports.deleteFormation = (req, res) => {
    const id_form = req.params.id;
    Formation.delete(id_form, (err) => {
        if (err) return res.status(500).json({ error: err.message || 'Erreur serveur' });
        res.json({ message: 'Formation supprimée' });
    });
};


