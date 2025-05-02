-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2025 at 02:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `acmarket`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `user_id` char(36) NOT NULL,
  `category_id` char(36) NOT NULL,
  `subcategory_id` char(36) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `user_id`, `category_id`, `subcategory_id`, `title`, `price`, `description`, `stock`, `created_at`, `updated_at`) VALUES
('9c730005-1e7d-11f0-9f08-a16102e67fc5', '066bdb80-1a11-11f0-aaff-54e1ad54eb8d', '140cb3ea-1d31-11f0-befd-54e1ad54eb8d', '3f1aefd6-1d31-11f0-befd-54e1ad54eb8d', 'Facebook Softreg 1', 1243.00, 'FB Accounts | The advertising office is blocked. Verified by email, email NOT included. Male or female. The prifiles are not filled at all. 2FA included. Token, cookies included. Accounts are registered in IP addresses of different countries.', 11, '2025-04-21 06:55:29', '2025-04-21 06:55:29'),
('b4f7230e-1e7d-11f0-9f08-a16102e67fc5', '066bdb80-1a11-11f0-aaff-54e1ad54eb8d', '140cb3ea-1d31-11f0-befd-54e1ad54eb8d', '3f1aefd6-1d31-11f0-befd-54e1ad54eb8d', 'Facebook Softregs 2', 12.00, 'FB Accounts | Verified by e-mail, there is no email in the set. Sex can be both male and female. The account profiles may be empty or have limited entries such as photos and other information. Cookies are included. Accounts are registered in IP addresses of different countries.', 1, '2025-04-21 06:56:10', '2025-04-21 06:56:10'),
('d5b1522a-1e7d-11f0-9f08-a16102e67fc5', '066bdb80-1a11-11f0-aaff-54e1ad54eb8d', '140cb3ea-1d31-11f0-befd-54e1ad54eb8d', '4888ab17-1d31-11f0-befd-54e1ad54eb8d', 'Facebook Aged 1', 1343.00, 'FB Accounts | The accounts are registered in 2023. Verified by e-mail, there is no email in the set. Sex can be both male and female. The account profiles may be empty or have limited entries such as photos and other information. Registered from Turkey IP.', 1, '2025-04-21 06:57:05', '2025-04-21 06:57:05'),
('f8b9a39d-1e7d-11f0-9f08-a16102e67fc5', '066bdb80-1a11-11f0-aaff-54e1ad54eb8d', '1c3edcef-1d31-11f0-befd-54e1ad54eb8d', '62947872-1d31-11f0-befd-54e1ad54eb8d', 'Instagram Softregs 1', 1321.00, 'IG Accounts | Email included (outlook.com/hotmail.com, native). An avatar is added to a profile. Registered from the MIX IP.', 1, '2025-04-21 06:58:04', '2025-04-21 06:58:04');

-- --------------------------------------------------------

--
-- Table structure for table `account_images`
--

CREATE TABLE `account_images` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `account_id` char(36) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
('140cb3ea-1d31-11f0-befd-54e1ad54eb8d', 'Facebook'),
('1c3edcef-1d31-11f0-befd-54e1ad54eb8d', 'Instagram');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `user_id` char(36) NOT NULL,
  `account_id` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `sender_id` char(36) NOT NULL,
  `receiver_id` char(36) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `user_id` char(36) NOT NULL,
  `account_id` char(36) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `category_id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `category_id`, `name`) VALUES
('3f1aefd6-1d31-11f0-befd-54e1ad54eb8d', '140cb3ea-1d31-11f0-befd-54e1ad54eb8d', 'Softregs'),
('4888ab17-1d31-11f0-befd-54e1ad54eb8d', '140cb3ea-1d31-11f0-befd-54e1ad54eb8d', 'Aged'),
('62947872-1d31-11f0-befd-54e1ad54eb8d', '1c3edcef-1d31-11f0-befd-54e1ad54eb8d', 'Softregs');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `buyer_id` char(36) NOT NULL,
  `account_id` char(36) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('buyer','seller','admin') NOT NULL DEFAULT 'buyer',
  `status` enum('active','suspended') NOT NULL DEFAULT 'suspended',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `status`, `created_at`) VALUES
('066bdb80-1a11-11f0-aaff-54e1ad54eb8d', 'user', 'user@gmail.com', '$2y$10$58y4SvvM0I80wMAdq5evFuwBQOgGNx5zTszaa/J0bqVBHOJUMyo6S', 'buyer', 'suspended', '2025-04-15 15:48:09'),
('0ba906b7-2722-11f0-bfdd-da9041973236', 'Navratna Jewellers', 'navratnajewellers0@gmail.com', '', 'buyer', 'suspended', '2025-05-02 06:52:42'),
('262e8696-1eb1-11f0-9f08-a16102e67fc5', 'demo', 'demo@gmail.com', '$2y$10$0/x0bwT0LC3sE7251ao/vuvWg7be8d3OKxU3dyM9wXXL/jiOFY4ju', 'buyer', 'suspended', '2025-04-21 13:04:26'),
('8b933a36-25c4-11f0-9e76-7beb2c19f995', 'demo2', 'demo2@gmail.com', '$2y$10$D8VYD1.RmR8pKGCegpI7TewlTlegu/oJTwno4nnbXGl1I31nQVx/K', 'buyer', 'suspended', '2025-04-30 13:10:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `subcategory_id` (`subcategory_id`);

--
-- Indexes for table `account_images`
--
ALTER TABLE `account_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`account_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `accounts_ibfk_3` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`);

--
-- Constraints for table `account_images`
--
ALTER TABLE `account_images`
  ADD CONSTRAINT `account_images_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
