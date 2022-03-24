-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
<<<<<<< HEAD
-- Generation Time: Mar 13, 2022 at 12:00 PM
=======
-- Generation Time: Mar 14, 2022 at 07:47 AM
>>>>>>> 2a8b3bdf41a565b084a15f834fff574bb6d5308a
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
<<<<<<< HEAD
  `type` int NOT NULL,
  `in_folder_id` int NOT NULL DEFAULT '0',
  `user_id` int NOT NULL,
  `pos_row` int DEFAULT NULL,
  `pos_col` int DEFAULT NULL,
  `data_url` varchar(512) COLLATE utf8mb4_unicode_520_ci NOT NULL
=======
  `in_folder_id` int NOT NULL,
  `type` int NOT NULL,
  `user_id` int NOT NULL,
  `pos_row` int NOT NULL,
  `pos_col` int NOT NULL
>>>>>>> 2a8b3bdf41a565b084a15f834fff574bb6d5308a
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `icons`
--

<<<<<<< HEAD
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
=======
INSERT INTO `icons` (`id`, `name`, `in_folder_id`, `type`, `user_id`, `pos_row`, `pos_col`) VALUES
(1, 'New Folder', 0, 1, 2, 2, 3),
(2, 'Text Document', 0, 2, 2, 2, 2);
>>>>>>> 2a8b3bdf41a565b084a15f834fff574bb6d5308a

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
<<<<<<< HEAD
  `bg_type` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'img',
  `bg_url` varchar(256) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '/assets/img/bg/win10.jpg',
  `bg_style` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'cover',
  `icon_size` int NOT NULL DEFAULT '100',
  `taskbar_color` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '#c4c4c4',
  `modal_top_color` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'rgb(82, 82, 241)',
  `modal_top_text_color` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '#000000'
=======
  `bg_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'img',
  `bg_url` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '/assets/img/bg/win10.jpg',
  `bg_style` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'cover',
  `icon_size` int NOT NULL DEFAULT '100',
  `taskbar_color` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '#c4c4c4',
  `modal_top_color` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '#000000',
  `modal_top_text_color` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '#ffffff'
>>>>>>> 2a8b3bdf41a565b084a15f834fff574bb6d5308a
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`user_id`, `bg_type`, `bg_url`, `bg_style`, `icon_size`, `taskbar_color`, `modal_top_color`, `modal_top_text_color`) VALUES
<<<<<<< HEAD
(1, 'vid', 'http://webos.test/assets/vid/bg/blue-abstract-green-leaves.mp4', 'cover', 100, '#005086', '#78c218', '#000000');
=======
(1, 'img', '/assets/img/bg/win10.jpg', 'cover', 100, '#c4c4c4', '#000000', '#ffffff'),
(2, 'vid', 'http://webos.test/assets/vid/bg/blue-abstract-green-leaves.mp4', 'cover', 100, '#0d5177', '#71d246', '#4a4a4a');
>>>>>>> 2a8b3bdf41a565b084a15f834fff574bb6d5308a

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
<<<<<<< HEAD
  `username` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_unicode_520_ci NOT NULL
=======
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL
>>>>>>> 2a8b3bdf41a565b084a15f834fff574bb6d5308a
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'tw1sty-', '202cb962ac59075b964b07152d234b70'),
(2, '123', '202cb962ac59075b964b07152d234b70');

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
<<<<<<< HEAD
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
=======
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
>>>>>>> 2a8b3bdf41a565b084a15f834fff574bb6d5308a

--
-- AUTO_INCREMENT for table `icon_types`
--
ALTER TABLE `icon_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
<<<<<<< HEAD
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
=======
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
>>>>>>> 2a8b3bdf41a565b084a15f834fff574bb6d5308a
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
