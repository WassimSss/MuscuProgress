-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 03 mars 2022 à 13:39
-- Version du serveur : 8.0.27
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `muscuprogress`
--

-- --------------------------------------------------------

--
-- Structure de la table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
CREATE TABLE IF NOT EXISTS `exercise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_exercise` text NOT NULL,
  `user` int NOT NULL,
  `muscle` text NOT NULL,
  `poids` int NOT NULL,
  `repetition` int NOT NULL,
  `date` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=664 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `exercise`
--

INSERT INTO `exercise` (`id`, `nom_exercise`, `user`, `muscle`, `poids`, `repetition`, `date`) VALUES
(663, 'Gainage', 3, 'Abdominaux', 0, 3, '03.03.22'),
(662, 'Pompes', 3, 'Pectoraux', 10, 15, '03.03.22'),
(661, 'Pompes', 3, 'Pectoraux', 10, 15, '03.03.22'),
(660, 'Gainage', 3, 'Abdominaux', 0, 3, '03.03.22'),
(659, 'Traction', 3, 'Epaules', 5, 20, '03.03.22'),
(658, 'Pompes', 3, 'Pectoraux', 10, 15, '03.03.22'),
(657, 'Traction', 3, 'Epaules', 5, 20, '03.03.22'),
(656, 'Traction', 3, 'Epaules', 5, 20, '03.03.22'),
(654, 'Traction', 3, 'Epaules', 5, 20, '03.03.22');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
