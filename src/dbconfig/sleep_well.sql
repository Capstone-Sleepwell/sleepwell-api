-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 22, 2024 at 05:36 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sleep_well`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(21) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_birthdate` date DEFAULT NULL,
  `user_gender` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `google_id` varchar(21) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `user_birthdate`, `user_gender`, `google_id`) VALUES
('44e1cb313e', 'Dhimas', 'satriyowibowo559@gmail.com', NULL, '2004-03-31', 'M', '118253409515994439548'),
('1111522755', 'RAJA_JAWA', 'satriyodimas258@gmail.com', NULL, '2002-05-10', 'M', '102872393225116553270'),
('3ab61769f9', 'yola', 'dhimas@gmail.com', '$2a$10$/EwNN3HYTwdCO6EWc8ElmO3fTvoAR/P2pOpg0qSmaaMKd9ClQ6Qa2', '2000-01-19', 'F', NULL),
('e80653c76b', 'samuel', 'samuel@gmail.com', '$2a$10$/9FRsbM9uOHlQDvogDkzZeByu8lxcy5WZqtsyt1oFO7dQM8ugHyMm', '2004-05-15', 'M', NULL),
('28f219030f', 'ilham', 'ilham@gmail.com', '$2a$10$qd//UGu2/VzbOkj3PQ3QQ.0DcWJcC4A/m4sgseddmzQt9UBgra5gO', '2002-05-15', 'M', NULL),
('fd541e38e5', 'aa', 'a@gmail.com', '$2a$10$KZ/tW3NQfk81Amr1pC2hc.C/cgL1ANI8fj.XR6qbLzfMqQfICszBa', '2002-05-15', 'M', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
