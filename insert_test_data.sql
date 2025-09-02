-- Script pour insérer des données de test
-- Exécutez ce script dans votre base de données MySQL

USE formation;

-- 1. Insérer des chapitres de test pour la formation 1
INSERT INTO chapitres (titre_chap, duree, ordre, type, id_form) VALUES
('Introduction à la formation', '15 min', 1, 'Théorique', 1),
('Premiers pas', '20 min', 2, 'Pratique', 1),
('Exercices pratiques', '25 min', 3, 'Exercice', 1);

-- 2. Insérer des chapitres de test pour la formation 2
INSERT INTO chapitres (titre_chap, duree, ordre, type, id_form) VALUES
('Bases de Python', '30 min', 1, 'Théorique', 2),
('Variables et types', '25 min', 2, 'Pratique', 2),
('Structures de contrôle', '35 min', 3, 'Exercice', 2);

-- 3. Insérer des ressources de test pour les chapitres
INSERT INTO ressources (type, url, nom_fichier, taille_fichier, id_chap) VALUES
('pdf', '/uploads/ressources/intro-formation.pdf', 'Introduction.pdf', 1024000, 1),
('video', '/uploads/ressources/intro-video.mp4', 'Introduction.mp4', 5120000, 1),
('pdf', '/uploads/ressources/premiers-pas.pdf', 'Premiers_pas.pdf', 2048000, 2),
('pdf', '/uploads/ressources/python-bases.pdf', 'Python_bases.pdf', 1536000, 4),
('video', '/uploads/ressources/python-video.mp4', 'Python_tutoriel.mp4', 10240000, 4);

-- 4. Vérifier les données insérées
SELECT 
    f.titre_form,
    COUNT(c.id_chap) as nb_chapitres,
    COUNT(r.id_res) as nb_ressources
FROM formations f
LEFT JOIN chapitres c ON f.id_form = c.id_form
LEFT JOIN ressources r ON c.id_chap = r.id_chap
GROUP BY f.id_form, f.titre_form;

-- 5. Afficher le détail complet
SELECT 
    f.titre_form,
    c.titre_chap,
    c.ordre,
    r.type as type_ressource,
    r.nom_fichier
FROM formations f
LEFT JOIN chapitres c ON f.id_form = c.id_form
LEFT JOIN ressources r ON c.id_chap = r.id_chap
ORDER BY f.id_form, c.ordre, r.id_res;
