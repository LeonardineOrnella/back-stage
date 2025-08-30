-- Script simple pour créer les tables manquantes
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
  PRIMARY KEY (`id_form`)
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
  PRIMARY KEY (`id_res`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 3. Vérifier si la table chapitres a la bonne structure
-- Si elle n'existe pas, la créer
CREATE TABLE IF NOT EXISTS `chapitres` (
  `id_chap` int(11) NOT NULL AUTO_INCREMENT,
  `titre_chap` varchar(50) NOT NULL,
  `duree` varchar(10) NOT NULL,
  `ordre` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `id_form` int(11) NOT NULL,
  PRIMARY KEY (`id_chap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. Ajouter les clés étrangères après avoir créé toutes les tables
-- (à exécuter séparément si nécessaire)

-- Message de confirmation
SELECT 'Tables créées avec succès!' as message;
