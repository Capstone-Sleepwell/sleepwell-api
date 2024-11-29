-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 29, 2024 at 07:34 AM
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
  `id` varchar(21) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `google_id` varchar(21) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `birthdate`, `gender`, `google_id`, `createdAt`, `updatedAt`) VALUES
('44e1cb313e', 'Dhimas', 'satriyowibowo559@gmail.com', '$2a$10$V4eYy/M3cN5KN1Rib6vQ/.uxUlv4XG1ZjwYpIovv8MntT96D.KxsK', '2004-03-31', 'M', '118253409515994439548', NULL, NULL),
('1111522755', 'RAJA_JAWA', 'satriyodimas258@gmail.com', '$2a$10$lUirjxxfpePMiR2jnFKQled72uCPye0FcrmkX/vkc6xgiAVKwfd6e', '2002-05-10', 'M', '102872393225116553270', NULL, NULL),
('3ab61769f9', 'yola', 'dhimas@gmail.com', '$2a$10$T5gwumKxuooK.U7bMCKUTedJkRW5tyooMyI.YliCyxNyJk7RmI/am', '2000-01-19', 'F', NULL, NULL, NULL),
('e80653c76b', 'Sam', 'samuel@gmail.com', '$2a$10$/9FRsbM9uOHlQDvogDkzZeByu8lxcy5WZqtsyt1oFO7dQM8ugHyMm', '2004-05-15', 'M', NULL, NULL, '2024-11-26'),
('28f219030f', 'ilham', 'ilham@gmail.com', '$2a$10$qd//UGu2/VzbOkj3PQ3QQ.0DcWJcC4A/m4sgseddmzQt9UBgra5gO', '2002-05-15', 'M', NULL, NULL, NULL),
('fd541e38e5', 'aa', 'a@gmail.com', '$2a$10$KZ/tW3NQfk81Amr1pC2hc.C/cgL1ANI8fj.XR6qbLzfMqQfICszBa', '2002-05-15', 'M', NULL, NULL, NULL),
('be6e452791', 'Yosua', 'yosua@gmail.com', '$2a$10$tRTT9e8uLEIpYW0Ur1ul0evFSD9FxuMZv0.wv7TmvPf.4lEKs78D6', '2004-04-14', 'M', NULL, NULL, NULL),
('9f23df165b', 'test', 't@gmail.com', '$2a$10$SsoWVxY35X8Bg34qsUJWBueoWBQC1GC5lWm0ucRsJ3ZzZOD6oR2Iu', '2004-12-10', 'M', NULL, NULL, NULL),
('a6527ecc10', 'test1', 't1@gmail.com', '$2a$10$0x7nStYEwVhLmrKmifgnFuniPGJ70OHSitjQT544THsvJS8mdasvO', '2004-12-10', 'M', NULL, NULL, NULL),
('04107cfca9', 'test2', 't2@gmail.com', '$2a$10$JzhPJEGiBC8KgC7SABvzue.7lOyGFN8ajZMYk0eK9KZYGXGBV3aDK', '2004-12-10', 'M', NULL, NULL, NULL),
('fe44146d76', 'test3', 't3@gmail.com', '$2a$10$2ZxPJ4.SRd0l4xSfKnHgae6YYLiAqWmZpFC2q1Fzlz.45mh52roKi', '2004-12-10', 'M', NULL, NULL, NULL),
('cec1d87585', 'test4', 't4@gmail.com', '$2a$10$qZgw6CqVIgf/yRfZbVhO7.3raXUtcyYaqG.KlOwvEpf2gQzb7KQqW', '2004-12-10', 'M', NULL, NULL, NULL),
('811d48d91c', 'test5', 't5@gmail.com', '$2a$10$iG2tIwavR6d11ra8AhrpluZKvqTPOKfGsAlfMQJ8BUBYpq79d75C.', '2004-12-10', 'M', NULL, NULL, NULL),
('c7138b4dcf', 'test6', 't6@gmail.com', '$2a$10$szYzFIIyLsifeJ850mcQiuD.hBVP5cFuVWJT5.r8QJP8t2yMJWHCy', '2004-12-10', 'M', NULL, '2024-11-25', '2024-11-25'),
('81dc0ee57f', 'test7', 't7@gmail.com', '$2a$10$fknXmDKX2vRlmRFu3pgtUeb.oyymHLxYwLfclFEfk7wiHb3huo0AK', '2004-12-10', 'M', NULL, '2024-11-25', '2024-11-25');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
