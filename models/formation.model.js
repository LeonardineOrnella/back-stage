const db = require('../config/db');

const Formation = {
    getAll: (callback) => {
        console.log('🔍 Exécution de getAll() avec chapitres et ressources...');
        
        // Requête complète pour récupérer formations, chapitres et ressources
        const query = `
            SELECT 
                f.*,
                c.id_chap,
                c.titre_chap,
                c.duree,
                c.ordre,
                c.type as type_chapitre,
                r.id_res,
                r.type as type_ressource,
                r.url,
                r.nom_fichier,
                r.taille_fichier,
                r.created_at as ressource_created_at
            FROM formation.formations f
            LEFT JOIN formation.chapitres c ON f.id_form = c.id_form
            LEFT JOIN formation.ressources r ON c.id_chap = r.id_chap
            ORDER BY f.id_form, c.ordre, r.id_res
        `;
        
        db.query(query, (error, results) => {
            if (error) {
                console.error('❌ Erreur SQL:', error);
                return callback(error);
            }
            
            console.log('📊 Résultats SQL bruts:', results.length, 'lignes');
            
            // Organiser les résultats en structure hiérarchique
            const formations = {};
            
            results.forEach(row => {
                if (!formations[row.id_form]) {
                    formations[row.id_form] = {
                        id_form: row.id_form,
                        titre_form: row.titre_form,
                        description: row.description,
                        statut_form: row.statut_form,
                        duree_form: row.duree_form,
                        frais_form: row.frais_form,
                        date_form: row.date_form,
                        id_categ: row.id_categ,
                        image_couverture: row.image_couverture,
                        created_at: row.created_at,
                        updated_at: row.updated_at,
                        chapitres: []
                    };
                }
                
                // Ajouter le chapitre s'il existe et n'est pas déjà présent
                if (row.id_chap) {
                    let chapitre = formations[row.id_form].chapitres.find(ch => ch.id_chap === row.id_chap);
                    
                    if (!chapitre) {
                        chapitre = {
                            id_chap: row.id_chap,
                            titre_chap: row.titre_chap,
                            duree: row.duree,
                            ordre: row.ordre,
                            type: row.type_chapitre,
                            ressources: []
                        };
                        formations[row.id_form].chapitres.push(chapitre);
                    }
                    
                    // Ajouter la ressource si elle existe
                    if (row.id_res) {
                        const ressource = {
                            id_res: row.id_res,
                            type: row.type_ressource,
                            url: row.url,
                            nom_fichier: row.nom_fichier,
                            taille_fichier: row.taille_fichier,
                            created_at: row.ressource_created_at
                        };
                        chapitre.ressources.push(ressource);
                    }
                }
            });
            
            const formationsArray = Object.values(formations);
            console.log('✨ Formations organisées:', formationsArray.length, 'formations');
            formationsArray.forEach(f => {
                console.log(`  - ${f.titre_form}: ${f.chapitres.length} chapitres, ${f.chapitres.reduce((total, c) => total + c.ressources.length, 0)} ressources`);
            });
            
            callback(null, formationsArray);
        });
    },

    getById: (id_form, callback) => {
        // Requête pour une formation spécifique avec chapitres et ressources
        const query = `
            SELECT 
                f.*,
                c.id_chap,
                c.titre_chap,
                c.duree,
                c.ordre,
                c.type as type_chapitre,
                r.id_res,
                r.type as type_ressource,
                r.url,
                r.nom_fichier,
                r.taille_fichier,
                r.created_at as ressource_created_at
            FROM formation.formations f
            LEFT JOIN formation.chapitres c ON f.id_form = c.id_form
            LEFT JOIN formation.ressources r ON c.id_chap = r.id_chap
            WHERE f.id_form = ?
            ORDER BY c.ordre, r.id_res
        `;
        
        db.query(query, [id_form], (error, results) => {
            if (error) {
                return callback(error);
            }
            
            if (results.length === 0) {
                return callback(null, null);
            }
            
            // Organiser les résultats
            const formation = {
                id_form: results[0].id_form,
                titre_form: results[0].titre_form,
                description: results[0].description,
                statut_form: results[0].statut_form,
                duree_form: results[0].duree_form,
                frais_form: results[0].frais_form,
                date_form: results[0].date_form,
                id_categ: results[0].id_categ,
                image_couverture: results[0].image_couverture,
                created_at: results[0].created_at,
                updated_at: results[0].updated_at,
                chapitres: []
            };
            
            results.forEach(row => {
                if (row.id_chap) {
                    let chapitre = formation.chapitres.find(ch => ch.id_chap === row.id_chap);
                    
                    if (!chapitre) {
                        chapitre = {
                            id_chap: row.id_chap,
                            titre_chap: row.titre_chap,
                            duree: row.duree,
                            ordre: row.ordre,
                            type: row.type_chapitre,
                            ressources: []
                        };
                        formation.chapitres.push(chapitre);
                    }
                    
                    if (row.id_res) {
                        const ressource = {
                            id_res: row.id_res,
                            type: row.type_ressource,
                            url: row.url,
                            nom_fichier: row.nom_fichier,
                            taille_fichier: row.taille_fichier,
                            created_at: row.ressource_created_at
                        };
                        chapitre.ressources.push(ressource);
                    }
                }
            });
            
            callback(null, formation);
        });
    },

    create: (data, callback) => {
        db.query('INSERT INTO formation.formations SET ?', data, callback);
    },

    update: (id_form, data, callback) => {
        db.query('UPDATE formation.formations SET ? WHERE id_form = ?', [data, id_form], callback);
    },

    delete: (id_form, callback) => {
        db.query('DELETE FROM formation.formations WHERE id_form = ?', id_form, callback);
    },

    // Méthode pour obtenir les statistiques des formations
    getStats: (callback) => {
        const query = `
            SELECT 
                COUNT(DISTINCT f.id_form) as total_formations,
                COUNT(DISTINCT CASE WHEN f.statut_form = 'Active' THEN f.id_form END) as formations_actives,
                COUNT(DISTINCT CASE WHEN f.statut_form = 'Inactive' THEN f.id_form END) as formations_inactives,
                COUNT(DISTINCT CASE WHEN f.statut_form = 'Brouillon' THEN f.id_form END) as formations_brouillon,
                COUNT(DISTINCT c.id_chap) as total_chapitres,
                COUNT(DISTINCT r.id_res) as total_ressources,
                COUNT(DISTINCT CASE WHEN r.type = 'pdf' THEN r.id_res END) as total_pdf,
                COUNT(DISTINCT CASE WHEN r.type = 'video' THEN r.id_res END) as total_videos
            FROM formation.formations f
            LEFT JOIN formation.chapitres c ON f.id_form = c.id_form
            LEFT JOIN formation.ressources r ON c.id_chap = r.id_chap
        `;
        
        db.query(query, callback);
    }
};

module.exports = Formation;


