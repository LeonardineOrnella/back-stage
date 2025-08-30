-- Script pour créer les tables manquantes pour les formations
-- Exécutez ce script dans votre base de données MySQL

USE formation;

-- 1. Créer la table formations
CREATE TABLE IF NOT EXISTS `formations` (
  `id_form` int(11) NOT NULL AUTO_INCREMENT,
  `titre_form` varchar(255) NOT NULL,
  `description` text,
  `statut_form` enum('Active','Inactive','Brouillon') DEFAULT 'Active',
  `duree_form` varchar(20) DEFAULT NULL,
  `frais_form` decimal(10,2) DEFAULT NULL,
  `date_form` date DEFAULT NULL,
  `id_categ` int(11) NOT NULL,
  `image_couverture` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_form`),
  KEY `fk_formation_categorie` (`id_categ`),
  CONSTRAINT `fk_formation_categorie` FOREIGN KEY (`id_categ`) REFERENCES `categories` (`id_categ`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. Créer la table ressources
CREATE TABLE IF NOT EXISTS `ressources` (
  `id_res` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('pdf','video') NOT NULL,
  `url` varchar(255) NOT NULL,
  `nom_fichier` varchar(255) DEFAULT NULL,
  `taille_fichier` bigint(20) DEFAULT NULL,
  `id_chap` int(11) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_res`),
  KEY `fk_ressource_chapitre` (`id_chap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 3. Vérifier si la table chapitres existe et la modifier si nécessaire
-- D'abord, vérifier la structure actuelle
-- Si la colonne s'appelle encore 'id_categ', la renommer en 'id_form'

-- Vérifier si la colonne id_categ existe
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = 'formation' 
   AND TABLE_NAME = 'chapitres' 
   AND COLUMN_NAME = 'id_categ') > 0,
  'ALTER TABLE chapitres CHANGE id_categ id_form int(11) NOT NULL;',
  'SELECT "La colonne id_form existe déjà" as message;'
));

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 4. Ajouter les contraintes de clés étrangères
-- Supprimer d'abord les anciennes contraintes si elles existent
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
   WHERE TABLE_SCHEMA = 'formation' 
   AND TABLE_NAME = 'chapitres' 
   AND CONSTRAINT_NAME = 'fk_chapitre_categorie') > 0,
  'ALTER TABLE chapitres DROP FOREIGN KEY fk_chapitre_categorie;',
  'SELECT "Contrainte fk_chapitre_categorie n\'existe pas" as message;'
));

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter la nouvelle contrainte pour chapitres
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
   WHERE TABLE_SCHEMA = 'formation' 
   AND TABLE_NAME = 'chapitres' 
   AND CONSTRAINT_NAME = 'fk_chapitre_formation') = 0,
  'ALTER TABLE chapitres ADD CONSTRAINT fk_chapitre_formation FOREIGN KEY (id_form) REFERENCES formations(id_form) ON DELETE CASCADE ON UPDATE CASCADE;',
  'SELECT "Contrainte fk_chapitre_formation existe déjà" as message;'
));

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter la contrainte pour ressources
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
   WHERE TABLE_SCHEMA = 'formation' 
   AND TABLE_NAME = 'ressources' 
   AND CONSTRAINT_NAME = 'fk_ressource_chapitre') = 0,
  'ALTER TABLE ressources ADD CONSTRAINT fk_ressource_chapitre FOREIGN KEY (id_chap) REFERENCES chapitres(id_chap) ON DELETE CASCADE ON UPDATE CASCADE;',
  'SELECT "Contrainte fk_ressource_chapitre existe déjà" as message;'
));

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 5. Vérifier la structure finale
SELECT 'Tables créées avec succès!' as status;
SELECT TABLE_NAME, TABLE_ROWS FROM information_schema.tables WHERE TABLE_SCHEMA = 'formation' AND TABLE_NAME IN ('formations', 'chapitres', 'ressources');
