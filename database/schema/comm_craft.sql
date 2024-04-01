-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2024 at 10:59 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comm_craft`
--

-- --------------------------------------------------------

--
-- Table structure for table `borrow`
--

CREATE TABLE `borrow` (
  `borrow_id` int(50) NOT NULL,
  `UserID` int(50) NOT NULL,
  `MaterialID` int(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `cost` varchar(1000) NOT NULL,
  `expired` varchar(10) NOT NULL,
  `returned` varchar(50) NOT NULL DEFAULT 'no',
  `notified` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collaborations`
--

CREATE TABLE `collaborations` (
  `collaboration_id` int(50) NOT NULL,
  `status` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collaborations_users`
--

CREATE TABLE `collaborations_users` (
  `collaboration_user_id` int(11) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `MaterialID` int(50) NOT NULL,
  `MaterialName` varchar(255) NOT NULL,
  `Price` int(255) NOT NULL,
  `Quantity` int(100) NOT NULL,
  `Available` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `ProjectID` int(50) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Difficulty` varchar(300) DEFAULT NULL,
  `Material_id` int(255) NOT NULL,
  `Skills` varchar(500) DEFAULT NULL,
  `GroupSize` int(100) DEFAULT NULL,
  `Ranging` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skills_user`
--

CREATE TABLE `skills_user` (
  `Skill_id` varchar(255) NOT NULL,
  `Skill_Name` varchar(255) NOT NULL,
  `UserID` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `TaskID` int(50) NOT NULL,
  `UserID` int(50) NOT NULL,
  `TaskName` varchar(255) NOT NULL,
  `Details` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(50) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `FullName` varchar(255) NOT NULL,
  `Bio` varchar(700) NOT NULL,
  `Locations` varchar(255) NOT NULL,
  `Birthdate` varchar(50) NOT NULL,
  `Gender` varchar(50) NOT NULL,
  `Phone` int(50) NOT NULL,
  `SocialLinks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_res_book`
--

CREATE TABLE `user_res_book` (
  `booking_id` int(50) NOT NULL,
  `UserID` int(50) NOT NULL,
  `MaterialID` int(50) NOT NULL,
  `booking_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrow`
--
ALTER TABLE `borrow`
  ADD PRIMARY KEY (`borrow_id`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `MaterialID` (`MaterialID`);

--
-- Indexes for table `collaborations`
--
ALTER TABLE `collaborations`
  ADD PRIMARY KEY (`collaboration_id`);

--
-- Indexes for table `collaborations_users`
--
ALTER TABLE `collaborations_users`
  ADD PRIMARY KEY (`collaboration_user_id`),
  ADD KEY `collaborations_users_ibfk_1` (`user_id`),
  ADD KEY `collaborations_users_ibfk_2` (`collaboration_id`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`MaterialID`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ProjectID`),
  ADD KEY `Material_id` (`Material_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`TaskID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `user_res_book`
--
ALTER TABLE `user_res_book`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `MaterialID` (`MaterialID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `borrow`
--
ALTER TABLE `borrow`
  MODIFY `borrow_id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collaborations`
--
ALTER TABLE `collaborations`
  MODIFY `collaboration_id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collaborations_users`
--
ALTER TABLE `collaborations_users`
  MODIFY `collaboration_user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `ProjectID` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_res_book`
--
ALTER TABLE `user_res_book`
  MODIFY `booking_id` int(50) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `borrow`
--
ALTER TABLE `borrow`
  ADD CONSTRAINT `borrow_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `borrow_ibfk_2` FOREIGN KEY (`MaterialID`) REFERENCES `material` (`MaterialID`);

--
-- Constraints for table `collaborations_users`
--
ALTER TABLE `collaborations_users`
  ADD CONSTRAINT `collaborations_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `collaborations_users_ibfk_2` FOREIGN KEY (`collaboration_id`) REFERENCES `collaborations` (`collaboration_id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`Material_id`) REFERENCES `material` (`MaterialID`);

--
-- Constraints for table `user_res_book`
--
ALTER TABLE `user_res_book`
  ADD CONSTRAINT `user_res_book_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `user_res_book_ibfk_2` FOREIGN KEY (`MaterialID`) REFERENCES `material` (`MaterialID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
