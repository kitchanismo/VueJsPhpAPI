-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 18, 2017 at 04:45 AM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblbooks`
--

CREATE TABLE IF NOT EXISTS `tblbooks` (
  `bookid` int(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `qty` int(255) NOT NULL,
  `isdelete` varchar(10) NOT NULL,
  PRIMARY KEY (`bookid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `tblbooks`
--

INSERT INTO `tblbooks` (`bookid`, `title`, `category`, `author`, `publisher`, `qty`, `isdelete`) VALUES
(1, 'algebra', 'math', 'kitchan', '5', 5, 'false'),
(2, 'geometry', 'chan', 'science', 'def', 4, 'true'),
(3, 'vampiping', 'sd', 'sd', 'sd', 5, 'true'),
(4, 'sds', 'computer', 'chan', '5', 5, 'false'),
(5, 'ABC', 'abc', 'abcdd', '123', 123, 'false'),
(6, 'bvv', 'vvv', 'asdsd', '5', 5, 'true'),
(7, 'kitchan', 'sd', 'ss', '5', 5, 'true'),
(8, 'adsssss', 'sdsd', 'd', '545', 545, 'true'),
(9, 'seeee', 'f', 'd', '3', 3, 'true'),
(10, 'sdfgfyyu', 'sdfgggf', 'sd', '0', 0, 'false');

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE IF NOT EXISTS `tbluser` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(99) NOT NULL,
  `email` varchar(99) NOT NULL,
  `password` varchar(99) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`id`, `username`, `email`, `password`) VALUES
(1, 'kitchan', 'kitchanismo@yahoo.com', 'admin'),
(2, 'chan', 'admin', 'admin'),
(3, 'vampiping', 'admin', 'admin'),
(4, 'nechi', 'admin', 'admin'),
(5, 'chan', 'admin', 'admin'),
(6, 'chan', 'admin', 'admin'),
(7, 'vampiping', 'kitcham', 'admin'),
(8, 'vampiping', 'admin', ''),
(9, 's', 's', 's'),
(10, 's', 's', 's'),
(11, 's', 's', 's'),
(12, 'd', 'd', 'dd'),
(13, 's', 's', 's'),
(14, 's', 's', 's'),
(15, 'r', 'r', 'r'),
(16, 'r', 's', 'r'),
(17, '5', '5', '5'),
(18, 'vam', 'vam', 'vam'),
(19, 'ki', 's', 'f'),
(20, 'd', 'd', 'd'),
(21, 's', 's', 's'),
(22, 's', 's', 's'),
(23, 's', 's', 's'),
(24, 'sssss', 's', 's'),
(25, 'sssss', 's', 's'),
(26, 'ssssss', 's', 's'),
(27, 'ssssssssssss', 's', 's'),
(28, 'ssssssss', 'ss', 'ssssss'),
(29, 'oooooo', 'ooooo', 'oooooo'),
(30, 'ssssss', 'ss', 'ssssss'),
(31, 'ss', 'ss', 'ss'),
(32, 'sdsdsd', 'sdsdsd', 'sdsdsd'),
(33, 'sssssss5', 'ss', '222222'),
(34, 'ssssss', 'ssssss@yahoo.com', 'ssssss'),
(35, 'kitchan', 'vampiping@yahoo.com', 'adminx'),
(36, 'kitchan', 'admin@yahoo.com', 'adminx'),
(37, 'kitchan', 'admin@yahoo.com', 'adminx'),
(38, 'kitchan', 'admin@yahoo.com', 'adminx'),
(39, 'kitchan', 'admin@yahoo.com', 'adminx'),
(40, 'kitchan', 'admin@yahoo.com', 'adminx'),
(41, 'kitchan', 'admin@yahoo.com', 'adminx'),
(42, 'kitchan', 'admin@yahoo.com', 'adminx'),
(43, 'kitchan', 'admin@yahoo.com', 'ad,omx'),
(44, 'kitchan', 'admin@yahoo.com', 'adminx'),
(45, 'kitchan', 'admin@yahoo.com', 'adminx'),
(46, 'kitchan', 'admin@yahoo.com', 'adminx'),
(47, 'kitchan', 'admin@yahoo.com', 'adminx'),
(48, 'kitchan', 'admin@yahoo.com', 'adminx'),
(49, 'kitchan', 'admin@yahoo.com', 'adminx'),
(50, 'kitchans', 'admin@yahoo.com', 'admin2'),
(51, 'kitchan', 'admin@yahoo.com', 'adminz'),
(52, 'kitchan', 'admin@yahoo.com', 'adminx'),
(53, 'kitchan', 'admin@yahoo.com', 'adminx'),
(54, 'kitchan', 'admin@yahoo.com', 'adminx'),
(55, 'kitchan', 'vampiping@yahoo.com', 'admins'),
(56, 'kitchanss', 'admin@yahoo.com', 'admins'),
(57, 'kitchan', 'admin@yahoo.com', 'adminc'),
(58, 'kitchan', 'admin@yahoo.com', 'admins'),
(59, 'kitchanc', 'admin@yahoo.com', 'admindg'),
(60, 'vampipingv', 'vampiping@yahoo.com', '11111111'),
(61, 'dddddd', 'ddd@yahoo.com', 'dddddd'),
(62, 'kitchanx', 'admin@yahoo.com', 'admins');
