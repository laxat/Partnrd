-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2021 at 07:43 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `partnrd_id_1612014184`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(3) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(258) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'password');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('044ba2d2d780dd019e35a681c5dd07e1f9e4c8a2e8da957db91bfeaa3f2cb2d5c41210bbabfd590e', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-20 00:39:01', '2021-05-20 00:39:01', '2021-05-26 20:39:01'),
('0b8f135d934d83fbb437856210dc5c55c21fe2850ab597b5911a94efec2726f3847bcc954cdded4e', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-19 08:24:19', '2021-05-19 08:24:19', '2021-05-26 04:24:19'),
('15ddf68554846f21f625f8afd3a898499790eb9f3c96c4c0c9af4da614729783f8988a71398db6f5', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-18 21:19:04', '2021-05-18 21:19:04', '2021-05-25 17:19:04'),
('1bd47d1b99c23f664fba40f262022023e7603e7897652e0d1d93be618f41cc60fd9990dbe2a07c7f', 8, 1, 'Personal Access Token', '[]', 0, '2021-05-20 21:10:25', '2021-05-20 21:10:25', '2021-05-27 17:10:25'),
('3002e263cb60b70de674d5dabf4c204982e52dce0352c0965e8450203e4a00c35fb0116b7c4874b5', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-18 07:59:30', '2021-05-18 07:59:30', '2022-05-18 03:59:30'),
('344a68cfd65e01961106f94dafad527b80b8fe4e94bbd007a5adc8a3a0608012af08ef212c594928', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-18 08:00:05', '2021-05-18 08:00:05', '2021-05-25 04:00:05'),
('3c4299d21d5ed5e537ca894b176e879be86f98913eea6b44d7891ab1265b1e8f3e26fc3bea7ed6a2', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-18 21:21:06', '2021-05-18 21:21:06', '2021-05-25 17:21:06'),
('440a77e5d4d33e03b0e289f566a6cfbcb6fe62247ceedb25a0cb507b815bebfafc1aaa549f969c62', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-18 11:08:32', '2021-05-18 11:08:32', '2021-05-25 07:08:32'),
('494b0ca300aec48461080e5f9286179911caba132576ee4cf949e0c1213f648dab587010d11ff7d8', 4, 1, 'larx@yahoo.com-2021-05-18 05:30:37', '[]', 0, '2021-05-18 09:30:37', '2021-05-18 09:30:37', '2022-05-18 05:30:37'),
('4b27866ec0210e9876587e79284c2fe23812aa9edd7378c95a5f4ce1e06ffa6a24f7aa708fdcb246', 10, 1, 'Personal Access Token', '[]', 0, '2021-05-22 06:18:09', '2021-05-22 06:18:09', '2021-05-29 02:18:09'),
('5af99ad7ba7fda17ddb281ad91d2aadab9fb8adcfd493958bd9e935516b80ce418a5abfb96303ca4', 1, 1, 'fam23@gmail.com-2021-05-18 03:55:36', '[]', 0, '2021-05-18 07:55:37', '2021-05-18 07:55:37', '2022-05-18 03:55:37'),
('5b16013e0488f3230f19045ed2bca94cebdd32ba0f0120c1b94004e94776c8fadf4a8b213b38dec6', 10, 1, 'Personal Access Token', '[]', 0, '2021-05-21 22:26:54', '2021-05-21 22:26:54', '2021-05-28 18:26:54'),
('65269355c997e1cd5d7e5e474e465d7a75b605510b704b11f2b283ce39f44ddfd572022e3a347e19', 5, 1, 'son@gmail.com-2021-05-18 05:35:33', '[]', 0, '2021-05-18 09:35:33', '2021-05-18 09:35:33', '2022-05-18 05:35:33'),
('6982b161e8d51fe1072c5ee4cad9b8b3c7c24574c383574a58899dc6866ec7b94dd6875f29b5102e', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-20 19:09:39', '2021-05-20 19:09:39', '2021-05-27 15:09:39'),
('6cd820ffe665f920d51a9ae0682f27c581eb46661f01893de8114b970e85056a1fc2758661e589b3', 6, 1, 'HelloFresh@gmail.com-2021-05-18 05:56:09', '[]', 0, '2021-05-18 09:56:09', '2021-05-18 09:56:09', '2022-05-18 05:56:09'),
('8be87a24ddbce4222a22d62f9770d2140ccb41aa6b66794c08c866f361ce57fc3e27481dba475acf', 29, 1, 'Personal Access Token', '[]', 0, '2021-06-16 01:41:30', '2021-06-16 01:41:30', '2021-06-22 21:41:30'),
('a57613b735d80789f7e2121409a1890f6241d6fa6edf839ca4b6f5bbbbc26c9f2f1546df279b8d20', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-20 09:04:34', '2021-05-20 09:04:34', '2021-05-27 05:04:34'),
('ac1c3f62d2ef67983a2088ba6d7757543ff58ba67b753dea901d7aa6e86ef02cfaa307f71f9a780a', 2, 1, 'richardmba7@gmail.com-2021-05-18 04:01:47', '[]', 0, '2021-05-18 08:01:47', '2021-05-18 08:01:47', '2022-05-18 04:01:47'),
('c673ae2f6efba49585b821e012d1547f6a7de4cc5f2fdb78c98931c4a153a6c0f4a8e79c2d94d627', 2, 1, 'Personal Access Token', '[]', 0, '2021-05-20 20:19:23', '2021-05-20 20:19:23', '2021-05-27 16:19:23'),
('c72d2dc1a1230a7600d1e0a18c4a4822765faa8f955a959c289a51a232e72b70147a3fea6b0ec838', 3, 1, 'fatman7100@gmail.com-2021-05-18 05:12:29', '[]', 0, '2021-05-18 09:12:29', '2021-05-18 09:12:29', '2022-05-18 05:12:29'),
('dc01d99c7c10a82e7ccb81ada750ce890db77e5870e212e514ba9af4473c60fcaa3056e18257b118', 1, 1, 'Personal Access Token', '[]', 0, '2021-05-19 11:46:43', '2021-05-19 11:46:43', '2021-05-26 07:46:43'),
('e77a73f9e0c3c19128999e741bbf48a8a98ab8104a2ae3f0c6bd66474d2bb265ff97d528432341b6', 29, 1, 'Personal Access Token', '[]', 0, '2021-06-16 01:50:22', '2021-06-16 01:50:22', '2021-06-22 21:50:22');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'K5Ujj2yxxEYbiucgVHuY4hmAGJWUrghXCfIUF5NX', NULL, 'http://localhost', 1, 0, 0, '2021-05-17 19:30:58', '2021-05-17 19:30:58'),
(2, NULL, 'Laravel Password Grant Client', 'rTbt3kg63P9SG3x6CXhpyD6IFY5aSkrTShDOq9Ir', 'users', 'http://localhost', 0, 1, 0, '2021-05-17 19:30:58', '2021-05-17 19:30:58');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2021-05-17 19:30:58', '2021-05-17 19:30:58');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('fam23@gmail.com', 'ZTqw7iO5hxV63jq', NULL),
('richardmba7@gmail.com', '$2y$10$4GfJU5R6NGVzTuZxMyxIuOO6LDAqGATbDUu.EUZL5O7U.NqePQPcC', '2021-05-22 22:09:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `verified`, `role`) VALUES
(20, 'Richard Mba', 'fatman7100@gmail.com', NULL, '$2y$10$8SQGtKewxvYiWH0EQZdbrOygehYmn79sfjiU4kFeQADfYp7YgFZQm', NULL, '2021-06-15 04:53:19', '2021-06-15 04:53:19', 1, 'Client'),
(23, 'Bov', 'fam3@gmail.com', NULL, '$2y$10$2wNz4ud.rgt0xTsnpVqjpefKV1kIOGuv4G0/rb6H48cyzABABXOA6', NULL, '2021-06-15 18:40:50', '2021-06-18 07:55:31', 1, 'Lawyer'),
(24, 'Rob', 'fatman700@gmail.com', '2021-06-15 21:20:37', '$2y$10$rkkgdULR45ahCJGv7B18z.07SxLptS4IDO.zhSvz9bgdIA8ylo3pa', NULL, '2021-06-15 21:20:01', '2021-06-18 07:55:34', 1, 'Client'),
(25, 'Dobby Name', 'richarda7@gmail.com', '2021-06-15 22:30:19', '$2y$10$JxhZbg9JfL.kkSJXDOvAVuIVmtfgjTdwQtV/RuJVxEnG9Ugid382S', NULL, '2021-06-15 22:30:07', '2021-06-18 07:55:43', 1, 'Client'),
(29, 'test', 'test@test.com', '2021-06-15 22:46:03', '$2y$10$3yffj.1ItmPSD1fpPFQ5nuo7IY7U7S5iXffdjVGQxjRsgdYO23kBK', NULL, '2021-06-15 22:45:56', '2021-06-18 07:55:04', 1, 'Client'),
(30, 'Richard Mba', 'richardmba7@gmail.com', NULL, '$2y$10$YFEDioG.S3hY9Od03XWQDOvSi6J3XsYptB6J00DVsTw1/UPUcXzYu', NULL, '2021-06-18 07:58:13', '2021-06-18 07:58:13', 1, 'Client');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
