-- Script de mise à jour de la base de données pour les formations
-- Exécutez ce script dans votre base de données MySQL

USE formation;

-- Créer la table formations si elle n'existe pas
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

-- Créer la table ressources si elle n'existe pas
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

-- Modifier la table chapitres pour pointer vers formations au lieu de categories
-- D'abord, supprimer la contrainte existante si elle existe
ALTER TABLE `chapitres` DROP FOREIGN KEY IF EXISTS `fk_chapitre_categorie`;

-- Modifier la colonne id_categ en id_form
ALTER TABLE `chapitres` CHANGE `id_categ` `id_form` int(11) NOT NULL;

-- Ajouter la nouvelle contrainte
ALTER TABLE `chapitres` 
ADD CONSTRAINT `fk_chapitre_formation` FOREIGN KEY (`id_form`) REFERENCES `formations` (`id_form`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Ajouter la contrainte pour les ressources
ALTER TABLE `ressources` 
ADD CONSTRAINT `fk_ressource_chapitre` FOREIGN KEY (`id_chap`) REFERENCES `chapitres` (`id_chap`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Créer les dossiers d'upload s'ils n'existent pas
-- Note: Ces commandes doivent être exécutées dans le terminal, pas dans MySQL
-- mkdir -p uploads/couvertures
-- mkdir -p uploads/ressources
