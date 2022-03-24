-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 13, 2022 at 12:00 PM
-- Server version: 8.0.28
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webos`
--

-- --------------------------------------------------------

--
-- Table structure for table `icons`
--

CREATE TABLE `icons` (
  `id` int NOT NULL,
  `name` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `type` int NOT NULL,
  `in_folder_id` int NOT NULL DEFAULT '0',
  `user_id` int NOT NULL,
  `pos_row` int DEFAULT NULL,
  `pos_col` int DEFAULT NULL,
  `data_url` varchar(512) COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `icons`
--

INSERT INTO `icons` (`id`, `name`, `type`, `in_folder_id`, `user_id`, `pos_row`, `pos_col`, `data_url`) VALUES
(1, 'Fassaassasa', 1, 0, 1, 2, 1, ''),
(2, 'Second Folder', 1, 0, 1, 2, 10, ''),
(5, 'New Folder', 1, 0, 1, 2, 6, ''),
(6, 'sssss', 1, 0, 1, 5, 4, ''),
(7, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 1, 0, 1, 4, 4, ''),
(8, 'New Folder', 1, 0, 1, 7, 8, ''),
(9, 'New Folder', 1, 0, 1, 8, 2, ''),
(10, 'New Folder', 1, 0, 1, 5, 1, ''),
(11, 'New Fo<b>lder</b>', 1, 0, 1, 5, 5, ''),
(12, 'Text Document', 2, 0, 1, 1, 1, ''),
(13, 'Text Document', 2, 0, 1, 3, 2, ''),
(14, 'Text Document', 2, 0, 1, 1, 8, '');

-- --------------------------------------------------------

--
-- Table structure for table `icon_types`
--

CREATE TABLE `icon_types` (
  `id` int NOT NULL,
  `label` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `name` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `icon_types`
--

INSERT INTO `icon_types` (`id`, `label`, `name`) VALUES
(1, 'folder', 'Folder'),
(2, 'txt', 'Text Document');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `user_id` int NOT NULL,
  `bg_type` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'img',
  `bg_url` varchar(256) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '/assets/img/bg/win10.jpg',
  `bg_style` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'cover',
  `icon_size` int NOT NULL DEFAULT '100',
  `taskbar_color` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '#c4c4c4',
  `modal_top_color` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'rgb(82, 82, 241)',
  `modal_top_text_color` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '#000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`user_id`, `bg_type`, `bg_url`, `bg_style`, `icon_size`, `taskbar_color`, `modal_top_color`, `modal_top_text_color`) VALUES
(1, 'vid', 'http://webos.test/assets/vid/bg/blue-abstract-green-leaves.mp4', 'cover', 100, '#005086', '#78c218', '#000000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'tw1sty-', '202cb962ac59075b964b07152d234b70');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `icons`
--
ALTER TABLE `icons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icon_types`
--
ALTER TABLE `icon_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `icons`
--
ALTER TABLE `icons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `icon_types`
--
ALTER TABLE `icon_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
