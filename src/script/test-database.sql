-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: notary
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment_client`
--

DROP TABLE IF EXISTS `appointment_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_client` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `appointment_id` int unsigned DEFAULT NULL,
  `client_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appointment_client_appointment_id_foreign` (`appointment_id`),
  KEY `appointment_client_client_id_foreign` (`client_id`),
  CONSTRAINT `appointment_client_appointment_id_foreign` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  CONSTRAINT `appointment_client_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6262 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `appointment_user`
--

DROP TABLE IF EXISTS `appointment_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `appointment_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appointment_user_appointment_id_foreign` (`appointment_id`),
  KEY `appointment_user_user_id_foreign` (`user_id`),
  CONSTRAINT `appointment_user_appointment_id_foreign` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  CONSTRAINT `appointment_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6350 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT '0',
  `room_id` int unsigned DEFAULT NULL,
  `created_by_user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appointments_room_id_foreign` (`room_id`),
  KEY `appointments_created_by_user_id_foreign` (`created_by_user_id`),
  CONSTRAINT `appointments_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `appointments_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6228 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `client_grantor`
--

DROP TABLE IF EXISTS `client_grantor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_grantor` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `grantor_id` int unsigned DEFAULT NULL,
  `client_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_grantor_grantor_id_foreign` (`grantor_id`),
  KEY `client_grantor_client_id_foreign` (`client_id`),
  CONSTRAINT `client_grantor_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `client_grantor_grantor_id_foreign` FOREIGN KEY (`grantor_id`) REFERENCES `grantors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address1` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address2` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `zip_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2842 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_attachment`
--

DROP TABLE IF EXISTS `document_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_attachment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `attachment_status` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  `document_id` int unsigned DEFAULT NULL,
  `attachment_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_attachment_document_id_foreign` (`document_id`),
  KEY `document_attachment_attachment_id_foreign` (`attachment_id`),
  CONSTRAINT `document_attachment_attachment_id_foreign` FOREIGN KEY (`attachment_id`) REFERENCES `attachments` (`id`),
  CONSTRAINT `document_attachment_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_comment`
--

DROP TABLE IF EXISTS `document_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `document_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_comment_document_id_foreign` (`document_id`),
  KEY `document_comment_user_id_foreign` (`user_id`),
  CONSTRAINT `document_comment_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`),
  CONSTRAINT `document_comment_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_field`
--

DROP TABLE IF EXISTS `document_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_field` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `document_id` int unsigned DEFAULT NULL,
  `field_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_field_document_id_foreign` (`document_id`),
  KEY `document_field_field_id_foreign` (`field_id`),
  CONSTRAINT `document_field_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`),
  CONSTRAINT `document_field_field_id_foreign` FOREIGN KEY (`field_id`) REFERENCES `fields` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_grantor`
--

DROP TABLE IF EXISTS `document_grantor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_grantor` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `grantor_id` int unsigned DEFAULT NULL,
  `document_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_grantor_grantor_id_foreign` (`grantor_id`),
  KEY `document_grantor_document_id_foreign` (`document_id`),
  CONSTRAINT `document_grantor_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`),
  CONSTRAINT `document_grantor_grantor_id_foreign` FOREIGN KEY (`grantor_id`) REFERENCES `grantors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1857 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_group`
--

DROP TABLE IF EXISTS `document_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_group` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `document_id` int unsigned DEFAULT NULL,
  `group_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_group_document_id_foreign` (`document_id`),
  KEY `document_group_group_id_foreign` (`group_id`),
  CONSTRAINT `document_group_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`),
  CONSTRAINT `document_group_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3510 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_lawyer`
--

DROP TABLE IF EXISTS `document_lawyer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_lawyer` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `document_lawyer_type_id` int unsigned DEFAULT NULL,
  `document_id` int unsigned DEFAULT NULL,
  `lawyer_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_lawyer_document_lawyer_type_id_foreign` (`document_lawyer_type_id`),
  KEY `document_lawyer_document_id_foreign` (`document_id`),
  KEY `document_lawyer_lawyer_id_foreign` (`lawyer_id`),
  CONSTRAINT `document_lawyer_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`),
  CONSTRAINT `document_lawyer_document_lawyer_type_id_foreign` FOREIGN KEY (`document_lawyer_type_id`) REFERENCES `document_lawyer_type` (`id`),
  CONSTRAINT `document_lawyer_lawyer_id_foreign` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_lawyer_type`
--

DROP TABLE IF EXISTS `document_lawyer_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_lawyer_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_operation`
--

DROP TABLE IF EXISTS `document_operation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_operation` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `document_id` int unsigned DEFAULT NULL,
  `operation_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_operation_document_id_foreign` (`document_id`),
  KEY `document_operation_operation_id_foreign` (`operation_id`),
  CONSTRAINT `document_operation_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`),
  CONSTRAINT `document_operation_operation_id_foreign` FOREIGN KEY (`operation_id`) REFERENCES `operations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_property`
--

DROP TABLE IF EXISTS `document_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_property` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `property` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `electronic_folio` int NOT NULL,
  `document_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_property_document_id_foreign` (`document_id`),
  CONSTRAINT `document_property_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1903 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_record`
--

DROP TABLE IF EXISTS `document_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_record` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `document_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_record_document_id_foreign` (`document_id`),
  KEY `document_record_user_id_foreign` (`user_id`),
  CONSTRAINT `document_record_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`),
  CONSTRAINT `document_record_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3772 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_status`
--

DROP TABLE IF EXISTS `document_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_status` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_type`
--

DROP TABLE IF EXISTS `document_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_type_attachment`
--

DROP TABLE IF EXISTS `document_type_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_type_attachment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  `document_type_id` int unsigned DEFAULT NULL,
  `attachment_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_type_attachment_document_type_id_foreign` (`document_type_id`),
  KEY `document_type_attachment_attachment_id_foreign` (`attachment_id`),
  CONSTRAINT `document_type_attachment_attachment_id_foreign` FOREIGN KEY (`attachment_id`) REFERENCES `attachments` (`id`),
  CONSTRAINT `document_type_attachment_document_type_id_foreign` FOREIGN KEY (`document_type_id`) REFERENCES `document_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_type_operation`
--

DROP TABLE IF EXISTS `document_type_operation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_type_operation` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  `document_type_id` int unsigned DEFAULT NULL,
  `operation_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_type_operation_document_type_id_foreign` (`document_type_id`),
  KEY `document_type_operation_operation_id_foreign` (`operation_id`),
  CONSTRAINT `document_type_operation_document_type_id_foreign` FOREIGN KEY (`document_type_id`) REFERENCES `document_type` (`id`),
  CONSTRAINT `document_type_operation_operation_id_foreign` FOREIGN KEY (`operation_id`) REFERENCES `operations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_user`
--

DROP TABLE IF EXISTS `document_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `entry_lawyer` tinyint(1) NOT NULL DEFAULT '0',
  `closure_lawyer` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int unsigned DEFAULT NULL,
  `document_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_user_user_id_foreign` (`user_id`),
  KEY `document_user_document_id_foreign` (`document_id`),
  CONSTRAINT `document_user_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`),
  CONSTRAINT `document_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6983 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `folio` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `electronic_folio` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tome` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `property` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `identifications` smallint NOT NULL DEFAULT '0',
  `public_registry_patent` smallint NOT NULL DEFAULT '0',
  `document_registry` smallint NOT NULL DEFAULT '0',
  `personalities` smallint NOT NULL DEFAULT '0',
  `marginal_notes` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `public_registry_entry_date` date DEFAULT NULL,
  `public_registry_exit_date` date DEFAULT NULL,
  `date` date DEFAULT NULL,
  `money_laundering_expiration_date` date DEFAULT NULL,
  `money_laundering` smallint NOT NULL DEFAULT '-1',
  `file_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `document_type_other` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  `document_type_id` int unsigned DEFAULT NULL,
  `document_status_id` int unsigned DEFAULT NULL,
  `client_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `documents_document_type_id_foreign` (`document_type_id`),
  KEY `documents_document_status_id_foreign` (`document_status_id`),
  KEY `documents_client_id_foreign` (`client_id`),
  CONSTRAINT `documents_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `documents_document_status_id_foreign` FOREIGN KEY (`document_status_id`) REFERENCES `document_status` (`id`),
  CONSTRAINT `documents_document_type_id_foreign` FOREIGN KEY (`document_type_id`) REFERENCES `document_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3624 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `email_record`
--

DROP TABLE IF EXISTS `email_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_record` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `from` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `to` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=265 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fields`
--

DROP TABLE IF EXISTS `fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fields` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name_str` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `grantors`
--

DROP TABLE IF EXISTS `grantors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grantors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address1` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address2` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `zip_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=984 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `groups_user_id_foreign` (`user_id`),
  CONSTRAINT `groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lawyers`
--

DROP TABLE IF EXISTS `lawyers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lawyers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address1` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address2` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `zip_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification_type`
--

DROP TABLE IF EXISTS `notification_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `operations`
--

DROP TABLE IF EXISTS `operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_group` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `group_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_group_user_id_foreign` (`user_id`),
  KEY `user_group_group_id_foreign` (`group_id`),
  CONSTRAINT `user_group_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `user_group_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_notification`
--

DROP TABLE IF EXISTS `user_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_notification` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `priority` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `document_id` int unsigned DEFAULT NULL,
  `notification_type_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_notification_user_id_foreign` (`user_id`),
  KEY `user_notification_document_id_foreign` (`document_id`),
  KEY `user_notification_notification_type_id_foreign` (`notification_type_id`),
  CONSTRAINT `user_notification_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`),
  CONSTRAINT `user_notification_notification_type_id_foreign` FOREIGN KEY (`notification_type_id`) REFERENCES `notification_type` (`id`),
  CONSTRAINT `user_notification_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1247 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `remember_token` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_role_id_foreign` (`role_id`),
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-03 12:58:39
