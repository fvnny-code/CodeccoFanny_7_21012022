-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 10 juin 2022 à 14:39
-- Version du serveur :  5.7.34
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania2`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) UNSIGNED NOT NULL,
  `userId` int(11) UNSIGNED NOT NULL,
  `postId` int(11) UNSIGNED NOT NULL,
  `comContent` text NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `comContent`, `date_creation`) VALUES
(89, 20, 49, 'pas de bol !', '2022-06-01 22:33:32'),
(107, 6, 75, 'rhooo ... c\'te classe !', '2022-06-02 14:23:43'),
(121, 6, 82, 'Tata Yoyo, on m\'a dit qu\'y a même un grelot', '2022-06-03 14:05:53'),
(122, 20, 82, 'Mais, moi j\'aime ça quand ça fait ding ding di gue ding\nComme une samba !', '2022-06-03 14:06:30'),
(127, 18, 82, 'Cette chanson : toute mon enfance en vacances chez tata Josiane ^^', '2022-06-09 09:23:20'),
(128, 18, 75, '\"Qu\'on lui coupe la tête !\" hurla la reine de coeur', '2022-06-09 09:24:11'),
(139, 50, 82, 'Tata Yoyo, tata Josiane, vous avez pas plus ringard, srx ?', '2022-06-09 22:08:53'),
(141, 50, 49, 'hé bé non ! hin hin hin !', '2022-06-09 22:09:48'),
(142, 50, 10, 'Ouais bon, on voit toujours pas d\'image à l\'affichage.\nJe dis ça je dis rien', '2022-06-09 22:10:30'),
(143, 20, 90, 'Nice, J-E !', '2022-06-09 22:11:14'),
(144, 50, 92, 'on est pas vendredi ?', '2022-06-10 10:49:29'),
(145, 6, 92, 'Rhooo c\'était une blague, Jean Eudes ! mdr', '2022-06-10 10:50:33'),
(146, 6, 93, 'My sentiment, exactly ! ^^', '2022-06-10 15:59:41'),
(147, 20, 94, 'hu hu hu !', '2022-06-10 16:35:04');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) UNSIGNED NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(555) DEFAULT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `content`, `image_url`, `date_creation`) VALUES
(10, 6, 'Second post du front ?', 'Wiiiiiii !', NULL, '2022-04-06 11:38:20'),
(49, 6, 'test image', 'oui ? Allez allez allez  ?', NULL, '2022-05-13 14:44:46'),
(75, 20, 'Humeur du jour :', 'Sportive ?', 'unnamed1654160142730.jpg', '2022-06-02 10:55:42'),
(82, 39, 'Tata Yoyo', 'Qu\'est ce qu\'il y a sous ton grand chapeau ?', 'tataYoyo1654257877552.jpg', '2022-06-03 14:04:37'),
(90, 50, '69420', 'Mood of ze day', NULL, '2022-06-09 22:06:41'),
(91, 18, 'Partage du jour :', 'ma vie, mon oeuvre', 'IMG_67571654806346358.jpg', '2022-06-09 22:25:46'),
(92, 18, 'Comment ça va ?', 'Comme un lundi', 'bunny-rabbit1654850878145.gif', '2022-06-10 10:47:58'),
(93, 20, 'Mon rêve secret', 'le plus fou', 'Capture_d’écran_2022-02-18_à_191654852436343.png', '2022-06-10 11:13:56'),
(94, 6, 'pouip ?', 'POYO !', 'IMG_67591654871577213.jpg', '2022-06-10 16:32:57');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `isAdmin` tinyint(4) UNSIGNED DEFAULT '0',
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`, `isAdmin`, `date_creation`) VALUES
(6, 'fannyPoui', 'fanny@poui.fr', '$2b$10$hshwNke6uw0G26MY3X/4duObMyUWvlt64doNfaTamZ7tPcL1DTdgu', 'hugs-and1654871657502.gif', 0, '2022-03-31 16:47:12'),
(18, 'Blabla', 'bla@blabla.fr', '$2b$10$jgmwaaygIUb4yfPHoxkLVuI3HnbGcLKyGsBz1FrZABDDSFEHacJTG', 'introvert-panic1654804132466.jpg', 0, '2022-05-20 11:42:09'),
(20, 'Toto', 'toto@toto.fr', '$2b$10$3zEPif8iIaZ7t4QjWvcxuOMLV9ErYadjsZvfRoGrh6Oa9.PvFVGcW', 'avatarcodex1654804712832.jpg', 1, '2022-06-01 21:37:30'),
(39, 'Tata Yoyo', 'tata@yoyo.fr', '$2b$10$qS0obpzw0M8JMq94X/FOyOINk3Q10E4RP67Q6xMM5RFEX0CR00qLO', 'tataYoyo1654257841838.jpg', 0, '2022-06-03 13:58:01'),
(50, 'jean eudes di moustaccio', 'jean@eudes.fr', '$2b$10$UHwzc76i5uqGG.PwyFX8xemeBklzv5dslUnVnfiJaDvtLERg6uhE2', 'mustache-rawa-tv1654805754494.gif', 0, '2022-06-09 18:37:54');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`) USING BTREE,
  ADD KEY `post_id` (`postId`) USING BTREE;

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lien_post_user` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `lien_comment_post` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lien_comment_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `lien_post_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
