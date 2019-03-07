-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2019-03-06 08:47:55
-- 服务器版本： 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_database`
--

-- --------------------------------------------------------

--
-- 表的结构 `pagelist`
--

DROP TABLE IF EXISTS `pagelist`;
CREATE TABLE IF NOT EXISTS `pagelist` (
  `title` varchar(100) NOT NULL,
  `author` varchar(32) NOT NULL,
  `class` varchar(8) NOT NULL,
  `date` date NOT NULL,
  `reportnum` int(11) NOT NULL,
  `mainbody` varchar(200) NOT NULL,
  PRIMARY KEY (`title`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `userlist`
--

DROP TABLE IF EXISTS `userlist`;
CREATE TABLE IF NOT EXISTS `userlist` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `admin` varchar(32) NOT NULL,
  `passworld` varchar(16) NOT NULL,
  `date` date NOT NULL,
  `sign` varchar(300) DEFAULT NULL,
  `pagenum` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
