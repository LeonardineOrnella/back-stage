-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 25 août 2025 à 21:32
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `formation`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id_categ` int(11) NOT NULL,
  `nom_categ` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `statut` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `chapitres` (
  `id_chap` int(11) NOT NULL,
  `titre_chap` varchar(50) NOT NULL,
  `duree` varchar(10) NOT NULL,
  `ordre` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `id_categ` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chapitres`
--

INSERT INTO `chapitres` (`id_chap`, `titre_chap`, `duree`, `ordre`, `type`, `id_categ`) VALUES
(1, 'react', '35h', 1, 'Publié', 6),
(2, 'react native', '40h', 2, 'Publié', 2);

-- --------------------------------------------------------

--
-- Structure de la table `qcm`
--

CREATE TABLE `qcm` (
  `id_qcm` int(11) NOT NULL,
  `titre_qcm` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id_quest` int(11) NOT NULL,
  `quest` varchar(100) NOT NULL,
  `point` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `reponses` (
  `id_rep` int(11) NOT NULL,
  `correction` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `resultats`
--

CREATE TABLE `resultats` (
  `id_result` int(11) NOT NULL,
  `note` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `role` enum('admin','formateur','apprenant') DEFAULT 'apprenant',
  `specialite` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `mdp`, `role`, `specialite`) VALUES
(1, 'RANDRIANASOLO', 'Jean Marc Thonny', 'randrianasolothonny@gmail.com', '$2b$10$FLv2/WnBY.epS2/2I7/douxrP6gG/OZHswvW143hLPre1qSnv29fm', 'apprenant', NULL),
(2, 'dsqdsqd', 'sqdsqdsqdsq@gmail.com', 'dsqfdsqfds@gmail.com', '$2b$10$ccLYSw/HWYfkB2RPmPzbO.bXaeEVXACe2EyPN4A7uUu7/ikIDv7WS', 'apprenant', NULL),
(3, 'dsqdsqd', 'dsdsqds', 'sdsqdsqds@gmail.com', '$2b$10$h8RuWzqGfLxdAMYolnpKnOyKFuB6X61iDhASTYoamoRhCUN7BtPYm', 'apprenant', NULL),
(4, 'cdsqcsqdsqds', 'dsdsdsdsdsqds', 'dsdsdsq@gmail.com', '$2b$10$1ANRuJTnNEImKqu.sKdIF.x960sGrxhpWYi8aU2MyrIq6OMDFxB1u', 'formateur', NULL),
(5, 'rapizany', 'dsdsds', 'leonardineornela@gmail.com', '$2b$10$9wu4C6lOLPq5n5D7dAdIHeFD4BcN9Z/yNlciG1gTgfGtCpfizSItG', 'formateur', NULL),
(6, 'rapizany', 'dsdsdsdsdsqds', 'ornella@gmail.com', '$2b$10$tc1XzW5Ff0NxO1sTU3/x8uJuC6Zr5AZyLmmVi1/LOwgw5Z9vlJl5i', 'formateur', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_categ`);

--
-- Index pour la table `chapitres`
--
ALTER TABLE `chapitres`
  ADD PRIMARY KEY (`id_chap`),
  ADD KEY `fk_chapitre_categorie` (`id_categ`);

--
-- Index pour la table `qcm`
--
ALTER TABLE `qcm`
  ADD PRIMARY KEY (`id_qcm`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id_quest`);

--
-- Index pour la table `reponses`
--
ALTER TABLE `reponses`
  ADD PRIMARY KEY (`id_rep`);

--
-- Index pour la table `resultats`
--
ALTER TABLE `resultats`
  ADD PRIMARY KEY (`id_result`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_categ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `chapitres`
--
ALTER TABLE `chapitres`
  MODIFY `id_chap` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `qcm`
--
ALTER TABLE `qcm`
  MODIFY `id_qcm` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id_quest` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `reponses`
--
ALTER TABLE `reponses`
  MODIFY `id_rep` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `resultats`
--
ALTER TABLE `resultats`
  MODIFY `id_result` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chapitres`
--
ALTER TABLE `chapitres`
  ADD CONSTRAINT `fk_chapitre_categorie` FOREIGN KEY (`id_categ`) REFERENCES `categories` (`id_categ`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
