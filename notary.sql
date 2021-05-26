-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: notary
-- ------------------------------------------------------
-- Server version	8.0.24

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
) ENGINE=InnoDB AUTO_INCREMENT=7244 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=7352 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=7209 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=3324 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=2175 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=4124 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=2178 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=4403 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=8197 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=4240 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=1188 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=1371 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


--
-- Dump data
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin',1,NULL,NULL),(2,'Lawyer',1,NULL,NULL),(3,'Secretary',1,NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','System','Admin System','0000 00 00 00','admin@example.com','$2a$08$teWqanFGHJNAbLI5.y9ZAON6pqD77mYCF6F0Xa/KsS2fT4kMaWlqa',1,'YNmc5vPj65',NULL,'2021-05-21 15:29:43',1),(82,'Juan','Perez Dominguez','Juan Perez Dominguez','','juan@example.com','$2a$08$BdbjzsBvk9SnWbXZo9KiYepKyEAc8eywUrKpfdtmG5Yk/54zAMlWO',1,NULL,'2021-05-21 15:23:42','2021-05-21 15:23:42',2),(83,'Julio','Echeverria','Julio Echeverria','','julio@example.com','$2a$08$B42k7MvGt.civCaqjoV4uOlr.x1Z3qXTPeZxFuyey7rShUYAteAXq',1,NULL,'2021-05-21 15:24:45','2021-05-21 15:24:45',2),(84,'Monica','Diaz','Monica Diaz','','monica@example.com','$2a$08$39I0t.W6c3B5RTPmXRizqu6bcz9tNL9ht6gQ16Zj9D8/b9XucuJ6m',1,NULL,'2021-05-21 15:26:28','2021-05-21 15:29:09',2),(85,'Alberto','Chan','Alberto Chan','','alberto@example.com','$2a$08$A4COeJGCLtBuHmaxmUaxXujpk8GCVKRzDbn0jgHRA0EFo/LyOseZa',1,NULL,'2021-05-21 15:29:00','2021-05-21 15:29:00',2),(86,'Lawyer','System','Lawyer System','','lawyer@example.com','$2a$08$.AUs1Mjf9isr/aSN87fJh.zIn1nofMfYIooDYAC7.lKcaIJyP7bou',1,NULL,'2021-05-21 15:30:36','2021-05-21 15:30:45',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

LOCK TABLES `grantors` WRITE;
/*!40000 ALTER TABLE `grantors` DISABLE KEYS */;
INSERT INTO `grantors` VALUES (1188,'Roberto','Dominguez','Roberto Dominguez','robertodominguez@example.com','','','','','','',1,'2021-05-21 15:34:16','2021-05-21 15:35:29'),(1189,'Paola','Chui','Paola Chui','paolachui@example.com','','','','','','',1,'2021-05-21 15:36:26','2021-05-21 15:36:26'),(1190,'Daniel','Perez','Daniel Perez','danielperez@example.com','','','','','','',1,'2021-05-21 15:37:48','2021-05-21 15:37:48'),(1191,'Alan','Hurtado','Alan Hurtado','alanhurtado@example.com','','','','','','',1,'2021-05-21 15:38:40','2021-05-21 15:38:40'),(1192,'Isabel','Mui','Isabel Mui','isabelmui@example.com','','','','','','',1,'2021-05-21 15:38:56','2021-05-21 15:38:56');
/*!40000 ALTER TABLE `grantors` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (9,'Juan\'s group',1,'2021-05-21 15:22:57','2021-05-21 15:22:57',1),(10,'Monica\'s group',1,'2021-05-21 15:26:49','2021-05-21 15:26:49',84);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (3324,'Miguel','Hernandez','Miguel Hernandez','miguelhernandez@example.com','','','','','','',1,'2021-05-21 15:34:47','2021-05-21 15:34:47'),(3325,'Daniel','Hernandez','Daniel Hernandez','danielhernandez@example.com','','','','','','',1,'2021-05-21 15:35:55','2021-05-21 15:35:55'),(3326,'Fernando','Sosa','Fernando Sosa','fernandososa@example.com','','','','','','',1,'2021-05-21 15:36:48','2021-05-21 15:36:48'),(3327,'Alejandro','Orozco','Alejandro Orozco','alejandroorozco@example.com','','','','','','',1,'2021-05-21 15:37:19','2021-05-21 15:37:19');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES (67,1,'2021-05-21 15:22:57','2021-05-21 15:22:57',1,9),(68,1,'2021-05-21 15:23:42','2021-05-21 15:23:42',82,9),(69,1,'2021-05-21 15:24:45','2021-05-21 15:24:45',83,9),(70,1,'2021-05-21 15:26:28','2021-05-21 15:26:28',84,9),(71,1,'2021-05-21 15:26:49','2021-05-21 15:26:49',84,10),(72,1,'2021-05-21 15:29:00','2021-05-21 15:29:00',85,10),(73,1,'2021-05-21 15:30:36','2021-05-21 15:30:36',86,10);
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `client_grantor` WRITE;
/*!40000 ALTER TABLE `client_grantor` DISABLE KEYS */;
INSERT INTO `client_grantor` VALUES (123,1,'2021-05-21 15:35:29','2021-05-21 15:35:29',1188,3324),(124,1,'2021-05-21 15:35:55','2021-05-21 15:35:55',1188,3325),(125,1,'2021-05-21 15:36:26','2021-05-21 15:36:26',1189,3325),(126,1,'2021-05-21 15:36:26','2021-05-21 15:36:26',1189,3324),(127,1,'2021-05-21 15:37:48','2021-05-21 15:37:48',1190,3326),(128,1,'2021-05-21 15:38:40','2021-05-21 15:38:40',1191,3326),(129,1,'2021-05-21 15:38:40','2021-05-21 15:38:40',1191,3327);
/*!40000 ALTER TABLE `client_grantor` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
INSERT INTO `attachments` VALUES (1,'Marriage Certificate',1,NULL,NULL),(2,'Birth Certificate',1,NULL,NULL),(3,'Fiscal Freedom',1,NULL,NULL),(4,'First Notification',1,NULL,NULL),(5,'Second Notification',1,NULL,NULL),(6,'Building',1,NULL,NULL),(7,'Identification Card',1,NULL,NULL),(8,'Construction Card',1,NULL,NULL),(9,'Cadastre Trades',1,NULL,NULL),(10,'Valuation',1,NULL,NULL),(11,'ISAI',1,NULL,NULL),(12,'CDFI ISAI',1,NULL,NULL),(13,'Japay',1,NULL,NULL),(14,'Reserve Zone',1,NULL,NULL),(15,'Both Right',1,NULL,NULL),(16,'IVA',1,NULL,NULL),(17,'Notification S.R.E.',1,NULL,NULL),(18,'RAN Certificate',1,NULL,NULL),(19,'CDFI',1,NULL,NULL),(20,'Regulation',1,NULL,NULL),(21,'Pay Tax',1,NULL,NULL),(22,'State Tax (ISR)',1,NULL,NULL),(23,'Exception Document',1,NULL,NULL),(24,'DeclaraNOT',1,NULL,NULL),(25,'Schedule Tax',1,NULL,NULL),(26,'Town Hall Notice',1,NULL,NULL),(27,'F2 Cadastre',1,NULL,NULL),(28,'Others',1,NULL,NULL),(29,'Permit S.E.',1,NULL,NULL),(30,'Usage Notice',1,NULL,NULL),(31,'RFC Society',1,NULL,NULL),(32,'RFC Partners',1,NULL,NULL),(33,'Assembly',1,NULL,NULL),(34,'Foreign Investment Notice',1,NULL,NULL),(35,'Omission Notice',1,NULL,NULL),(36,'Notarial File Notice',1,NULL,NULL),(37,'RENAP',1,NULL,NULL),(38,'Precoded Form',1,NULL,NULL),(39,'Disk',1,NULL,NULL),(40,'Publications',1,NULL,NULL),(41,'Photos',1,NULL,NULL),(42,'Trades',1,NULL,NULL),(43,'Filed Document',1,NULL,NULL),(44,'Will',1,NULL,NULL),(45,'Statements',1,NULL,NULL);
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `operations` WRITE;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
INSERT INTO `operations` VALUES (1,'Understand',1,NULL,NULL),(2,'Donation',1,NULL,NULL),(3,'Understand/Donation',1,NULL,NULL),(4,'Mortgage',1,NULL,NULL),(5,'Union',1,NULL,NULL),(6,'Division',1,NULL,NULL),(7,'Rectification Action',1,NULL,NULL),(8,'Lease',1,NULL,NULL),(9,'Condominium Regime',1,NULL,NULL),(10,'Traditional Agreement',1,NULL,NULL),(11,'Assignment of Rights',1,NULL,NULL),(12,'Promise',1,NULL,NULL),(13,'Mortgage Cancellation',1,NULL,NULL),(14,'Inheritance Awards',1,NULL,NULL),(15,'Auction Awards',1,NULL,NULL),(16,'Escrow',1,NULL,NULL),(17,'Constitution',1,NULL,NULL),(18,'Protocolization',1,NULL,NULL),(19,'Power Moral Person',1,NULL,NULL),(20,'Revocation',1,NULL,NULL),(21,'Will',1,NULL,NULL),(22,'Notarise Facts',1,NULL,NULL),(23,'Notifications',1,NULL,NULL),(24,'Physical Person Powers',1,NULL,NULL),(25,'Errands',1,NULL,NULL),(26,'Denounces Succession',1,NULL,NULL),(27,'Inventory Protocolization',1,NULL,NULL),(28,'Contract Protocolization',1,NULL,NULL),(29,'Others',1,NULL,NULL);
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `document_status` WRITE;
/*!40000 ALTER TABLE `document_status` DISABLE KEYS */;
INSERT INTO `document_status` VALUES (1,'Pending',1,NULL,NULL),(2,'Public registry',1,NULL,NULL),(3,'Delivering',1,NULL,NULL),(4,'Delivered',1,NULL,NULL);
/*!40000 ALTER TABLE `document_status` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `document_type` WRITE;
/*!40000 ALTER TABLE `document_type` DISABLE KEYS */;
INSERT INTO `document_type` VALUES (1,'Property',1,NULL,NULL),(2,'Commerce',1,NULL,NULL),(3,'Others',1,NULL,NULL);
/*!40000 ALTER TABLE `document_type` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `document_type_attachment` WRITE;
/*!40000 ALTER TABLE `document_type_attachment` DISABLE KEYS */;
INSERT INTO `document_type_attachment` VALUES (1,NULL,NULL,1,1,1),(2,NULL,NULL,1,1,2),(3,NULL,NULL,1,1,3),(4,NULL,NULL,1,1,4),(5,NULL,NULL,1,1,5),(6,NULL,NULL,1,1,6),(7,NULL,NULL,1,1,7),(8,NULL,NULL,1,1,8),(9,NULL,NULL,1,1,9),(10,NULL,NULL,1,1,10),(11,NULL,NULL,1,1,11),(12,NULL,NULL,1,1,12),(13,NULL,NULL,1,1,13),(14,NULL,NULL,1,1,14),(15,NULL,NULL,1,1,15),(16,NULL,NULL,1,1,16),(17,NULL,NULL,1,1,17),(18,NULL,NULL,1,1,18),(19,NULL,NULL,1,1,19),(20,NULL,NULL,1,1,20),(21,NULL,NULL,1,1,21),(22,NULL,NULL,1,1,22),(23,NULL,NULL,1,1,23),(24,NULL,NULL,1,1,24),(25,NULL,NULL,1,1,25),(26,NULL,NULL,1,1,26),(27,NULL,NULL,1,1,27),(28,NULL,NULL,1,1,28),(29,NULL,NULL,1,2,29),(30,NULL,NULL,1,2,30),(31,NULL,NULL,1,2,31),(32,NULL,NULL,1,2,32),(33,NULL,NULL,1,2,33),(34,NULL,NULL,1,2,34),(35,NULL,NULL,1,2,35),(36,NULL,NULL,1,2,17),(37,NULL,NULL,1,2,36),(38,NULL,NULL,1,2,37),(39,NULL,NULL,1,2,38),(40,NULL,NULL,1,2,39),(41,NULL,NULL,1,2,28),(42,NULL,NULL,1,3,36),(43,NULL,NULL,1,3,40),(44,NULL,NULL,1,3,41),(45,NULL,NULL,1,3,42),(46,NULL,NULL,1,3,43),(47,NULL,NULL,1,3,44),(48,NULL,NULL,1,3,45),(49,NULL,NULL,1,3,37),(50,NULL,NULL,1,3,28);
/*!40000 ALTER TABLE `document_type_attachment` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `document_type_operation` WRITE;
/*!40000 ALTER TABLE `document_type_operation` DISABLE KEYS */;
INSERT INTO `document_type_operation` VALUES (1,NULL,NULL,1,1,1),(2,NULL,NULL,1,1,2),(3,NULL,NULL,1,1,3),(4,NULL,NULL,1,1,4),(5,NULL,NULL,1,1,5),(6,NULL,NULL,1,1,6),(7,NULL,NULL,1,1,7),(8,NULL,NULL,1,1,8),(9,NULL,NULL,1,1,9),(10,NULL,NULL,1,1,10),(11,NULL,NULL,1,1,11),(12,NULL,NULL,1,1,12),(13,NULL,NULL,1,1,13),(14,NULL,NULL,1,1,14),(15,NULL,NULL,1,1,15),(16,NULL,NULL,1,1,16),(17,NULL,NULL,1,2,17),(18,NULL,NULL,1,2,18),(19,NULL,NULL,1,2,19),(20,NULL,NULL,1,2,20),(21,NULL,NULL,1,3,21),(22,NULL,NULL,1,3,22),(23,NULL,NULL,1,3,23),(24,NULL,NULL,1,3,24),(25,NULL,NULL,1,3,25),(26,NULL,NULL,1,3,26),(27,NULL,NULL,1,3,27),(28,NULL,NULL,1,3,28),(29,NULL,NULL,1,3,29);
/*!40000 ALTER TABLE `document_type_operation` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Big',1,NULL,NULL),(2,'Private',1,NULL,NULL),(3,'Common',1,NULL,NULL),(4,'Room 454',1,NULL,NULL),(5,'Rectangular',1,NULL,NULL),(6,'External',1,NULL,NULL);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
