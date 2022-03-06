-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Време на генериране:  6 март 2022 в 21:51
-- Версия на сървъра: 5.7.33
-- Версия на PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данни: `webos`
--

-- --------------------------------------------------------

--
-- Структура на таблица `settings`
--

CREATE TABLE `settings` (
  `user_id` int(11) NOT NULL,
  `bg_type` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'img',
  `bg_url` varchar(256) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '/assets/img/bg/win10.jpg',
  `bg_style` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'cover',
  `icon_size` int(11) NOT NULL DEFAULT '100',
  `taskbar_color` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '#c4c4c4',
  `modal_top_color` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'rgb(82, 82, 241)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Схема на данните от таблица `settings`
--

INSERT INTO `settings` (`user_id`, `bg_type`, `bg_url`, `bg_style`, `icon_size`, `taskbar_color`, `modal_top_color`) VALUES
(1, 'img', '/assets/img/bg/win10.jpg', 'cover', 100, '#c4c4c4', 'rgb(82, 82, 241)');

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'tw1sty-', '202cb962ac59075b964b07152d234b70');

--
-- Indexes for dumped tables
--

--
-- Индекси за таблица `settings`
--
ALTER TABLE `settings`
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Индекси за таблица `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
