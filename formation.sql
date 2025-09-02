-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 02 sep. 2025 à 06:15
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `formation`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_categ` int(11) NOT NULL AUTO_INCREMENT,
  `nom_categ` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `statut` varchar(10) NOT NULL,
  PRIMARY KEY (`id_categ`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_categ`, `nom_categ`, `description`, `statut`) VALUES
(1, 'Développement ', 'test', 'Inactive'),
(2, 'Développement Web', 'gddxdfg', 'Active'),
(6, 'web', 'eytuioiu', 'Active'),
(7, 'Développement Web', 'zazaz', 'Inactive'),
(8, 'Développement Web', 'dqzdqds', 'Active'),
(9, 'Développement Web', 'rdstr', 'Active');

-- --------------------------------------------------------

--
-- Structure de la table `chapitres`
--

DROP TABLE IF EXISTS `chapitres`;
CREATE TABLE IF NOT EXISTS `chapitres` (
  `id_chap` int(11) NOT NULL AUTO_INCREMENT,
  `id_form` int(11) NOT NULL,
  `titre_chap` varchar(50) NOT NULL,
  `duree` varchar(10) NOT NULL,
  `ordre` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `id_categ` int(11) NOT NULL,
  PRIMARY KEY (`id_chap`),
  KEY `fk_chapitre_categorie` (`id_categ`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `chapitres`
--

INSERT INTO `chapitres` (`id_chap`, `id_form`, `titre_chap`, `duree`, `ordre`, `type`, `id_categ`) VALUES
(1, 1, 'Chapitre 1', '5h', 1, 'Publié', 2),
(2, 1, 'Chapitre 2', '8h', 2, 'Publié', 2),
(3, 2, 'Chapitre 1', '5h', 1, 'Publié', 2),
(4, 2, 'Chapitre 2', '8h', 2, 'Publié', 2),
(5, 3, 'Chapitre 1', '5h', 1, 'Publié', 2),
(6, 3, 'Chapitre 2', '8h', 2, 'Publié', 2),
(7, 4, 'Chapitre 1', '5h', 1, 'Publié', 2),
(8, 4, 'Chapitre 2', '8h', 2, 'Publié', 2),
(9, 5, 'Intrudction  Reac t  ', '2h30', 1, 'Publié', 2),
(10, 5, 'Indoction  test', '2h', 2, 'Publié', 2),
(11, 1, 'Introtuction', '2h', 1, 'Publié', 7),
(12, 1, 'gfgfg', '2h', 2, 'Publié', 7),
(13, 2, 'test', '2h', 1, 'Publié', 8),
(14, 3, 'test', '1h', 1, 'Publié', 1),
(15, 4, 'gvfgfg', '1h', 1, 'Publié', 6),
(16, 4, 'chagfgf', '3h', 2, 'Publié', 6);

-- --------------------------------------------------------

--
-- Structure de la table `formations`
--

DROP TABLE IF EXISTS `formations`;
CREATE TABLE IF NOT EXISTS `formations` (
  `id_form` int(11) NOT NULL AUTO_INCREMENT,
  `titre_form` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `statut_form` enum('Active','Inactive','Brouillon') DEFAULT 'Active',
  `duree_form` varchar(20) DEFAULT NULL,
  `frais_form` decimal(10,2) DEFAULT NULL,
  `date_form` date DEFAULT NULL,
  `id_categ` int(11) NOT NULL,
  `image_couverture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_form`),
  KEY `fk_formation_categorie` (`id_categ`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `formations`
--

INSERT INTO `formations` (`id_form`, `titre_form`, `description`, `statut_form`, `duree_form`, `frais_form`, `date_form`, `id_categ`, `image_couverture`, `created_at`, `updated_at`) VALUES
(1, 'Occaecat ea nihil au', 'Quia ipsa tempor ei', 'Inactive', '85', '54.29', '1981-10-10', 7, '/uploads/couvertures/1756532886645-394086774.jpeg', '2025-08-30 05:48:06', '2025-08-30 05:48:06'),
(2, 'Formations python', 'zazazaza', 'Active', '32', '20.00', '2025-09-11', 8, '/uploads/couvertures/1756534215643-491669063.jpeg', '2025-08-30 06:10:15', '2025-08-30 06:10:15'),
(3, 'Aliquam tenetur dolo', 'Do ut illo omnis cum', 'Active', '66', '97.47', '1995-11-21', 1, '/uploads/couvertures/1756535902846-154398004.jpeg', '2025-08-30 06:38:22', '2025-08-30 06:38:22'),
(4, 'Eos lorem amet vol', 'Sed pariatur Doloru', 'Active', '89', '65.88', '1992-09-19', 6, '/uploads/couvertures/1756536016960-186616701.jpeg', '2025-08-30 06:40:16', '2025-08-30 06:40:16');

-- --------------------------------------------------------

--
-- Structure de la table `qcm`
--

DROP TABLE IF EXISTS `qcm`;
CREATE TABLE IF NOT EXISTS `qcm` (
  `id_qcm` int(11) NOT NULL AUTO_INCREMENT,
  `titre_qcm` varchar(50) NOT NULL,
  PRIMARY KEY (`id_qcm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id_quest` int(11) NOT NULL AUTO_INCREMENT,
  `quest` varchar(100) NOT NULL,
  `point` float NOT NULL,
  PRIMARY KEY (`id_quest`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id_quest`, `quest`, `point`) VALUES
(1, 'comment installe node ?', 2),
(3, 'comment installe Node.js ?', 2);

-- --------------------------------------------------------

--
-- Structure de la table `reponses`
--

DROP TABLE IF EXISTS `reponses`;
CREATE TABLE IF NOT EXISTS `reponses` (
  `id_rep` int(11) NOT NULL AUTO_INCREMENT,
  `correction` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rep`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `ressources`
--

DROP TABLE IF EXISTS `ressources`;
CREATE TABLE IF NOT EXISTS `ressources` (
  `id_res` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('pdf','video') NOT NULL,
  `url` varchar(255) NOT NULL,
  `nom_fichier` varchar(255) DEFAULT NULL,
  `taille_fichier` bigint(20) DEFAULT NULL,
  `id_chap` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_res`),
  KEY `fk_ressource_chapitre` (`id_chap`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ressources`
--

INSERT INTO `ressources` (`id_res`, `type`, `url`, `nom_fichier`, `taille_fichier`, `id_chap`, `created_at`) VALUES
(1, 'pdf', '/uploads/ressources/1756532886656-916556602.pdf', 'CV_RANDRIANASOLO Jean Marc Thonny.pdf', 154609, 11, '2025-08-30 05:48:06'),
(2, 'pdf', '/uploads/ressources/1756532886660-619847544.pdf', 'Short Stories in French for Intermediate Learners.pdf', 3361157, 12, '2025-08-30 05:48:06'),
(3, 'pdf', '/uploads/ressources/1756534215649-32903900.pdf', 'offre_service_25-08-0000074.pdf', 1362908, 13, '2025-08-30 06:10:15'),
(4, 'video', '/uploads/ressources/1756535902860-350501359.mp4', 'FranÃ§ais actuel (@francaisactuel)_9.mp4', 1802193, 14, '2025-08-30 06:38:22'),
(5, 'video', '/uploads/ressources/1756535902863-467351083.mp4', 'Dialogues en franÃ§ais â Vocabulaire et grammaire Niveau A1 A2 (2) Assan info.mp4', 38785670, 14, '2025-08-30 06:38:22'),
(6, 'video', '/uploads/ressources/1756535902975-2752326.mp4', 'ðð¬ 50 MOTS franÃ§ais pour la conversation - ADJECTIFS pour qualifier et dÃ©crire en franÃ§ais.mp4', 99119409, 14, '2025-08-30 06:38:23'),
(7, 'video', '/uploads/ressources/1756536016970-99464084.mp4', 'FranÃ§ais actuel (@francaisactuel)_6.mp4', 1366374, 15, '2025-08-30 06:40:16'),
(8, 'video', '/uploads/ressources/1756536016972-45224576.mp4', 'FranÃ§ais actuel (@francaisactuel)_6.mp4', 1366374, 15, '2025-08-30 06:40:16'),
(9, 'video', '/uploads/ressources/1756536016978-423850834.mp4', 'FranÃ§ais actuel (@francaisactuel)_6.mp4', 1366374, 16, '2025-08-30 06:40:16');

-- --------------------------------------------------------

--
-- Structure de la table `resultats`
--

DROP TABLE IF EXISTS `resultats`;
CREATE TABLE IF NOT EXISTS `resultats` (
  `id_result` int(11) NOT NULL AUTO_INCREMENT,
  `note` float NOT NULL,
  PRIMARY KEY (`id_result`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `role` enum('admin','formateur','apprenant') DEFAULT 'apprenant',
  `specialite` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `mdp`, `role`, `specialite`) VALUES
(1, 'RANDRIANASOLO', 'Jean Marc Thonny', 'randrianasolothonny@gmail.com', '$2b$10$FLv2/WnBY.epS2/2I7/douxrP6gG/OZHswvW143hLPre1qSnv29fm', 'apprenant', NULL),
(2, 'dsqdsqd', 'sqdsqdsqdsq@gmail.com', 'dsqfdsqfds@gmail.com', '$2b$10$ccLYSw/HWYfkB2RPmPzbO.bXaeEVXACe2EyPN4A7uUu7/ikIDv7WS', 'apprenant', NULL),
(3, 'dsqdsqd', 'dsdsqds', 'sdsqdsqds@gmail.com', '$2b$10$h8RuWzqGfLxdAMYolnpKnOyKFuB6X61iDhASTYoamoRhCUN7BtPYm', 'apprenant', NULL),
(4, 'cdsqcsqdsqds', 'dsdsdsdsdsqds', 'dsdsdsq@gmail.com', '$2b$10$1ANRuJTnNEImKqu.sKdIF.x960sGrxhpWYi8aU2MyrIq6OMDFxB1u', 'formateur', NULL),
(5, 'rapizany', 'dsdsds', 'leonardineornela@gmail.com', '$2b$10$9wu4C6lOLPq5n5D7dAdIHeFD4BcN9Z/yNlciG1gTgfGtCpfizSItG', 'formateur', NULL),
(6, 'rapizany', 'dsdsdsdsdsqds', 'ornella@gmail.com', '$2b$10$tc1XzW5Ff0NxO1sTU3/x8uJuC6Zr5AZyLmmVi1/LOwgw5Z9vlJl5i', 'formateur', NULL),
(7, 'kaka', 'kaka', 'kaka@example.com', '$2b$10$cG0ZeLxaqoPEnqNWk8ssKe4mHJf8wDLeX9Gb/BFo6k.oPmiuQaMf.', 'apprenant', NULL),
(8, 'ADMIN', 'Admin', 'admin@example.com', '$2b$10$rKXFpMKEVB5Y5EKHnloK..p/5hSJSxfKfKKBnxIXGNiNxCGWR03L6', 'admin', NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chapitres`
--
ALTER TABLE `chapitres`
  ADD CONSTRAINT `fk_chapitre_categorie` FOREIGN KEY (`id_categ`) REFERENCES `categories` (`id_categ`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `formations`
--
ALTER TABLE `formations`
  ADD CONSTRAINT `fk_formation_categorie` FOREIGN KEY (`id_categ`) REFERENCES `categories` (`id_categ`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
