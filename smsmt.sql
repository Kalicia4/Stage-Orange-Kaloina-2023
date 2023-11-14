-- MariaDB dump 10.19-11.1.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: login
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Sequence structure for `inscription_seq`
--

DROP SEQUENCE IF EXISTS `inscription_seq`;
CREATE SEQUENCE `inscription_seq` start with 1 minvalue 1 maxvalue 9223372036854775806 increment by 50 cache 1000 nocycle ENGINE=InnoDB;
SELECT SETVAL(`inscription_seq`, 250001, 0);

--
-- Sequence structure for `sms_seq`
--

DROP SEQUENCE IF EXISTS `sms_seq`;
CREATE SEQUENCE `sms_seq` start with 1 minvalue 1 maxvalue 9223372036854775806 increment by 50 cache 1000 nocycle ENGINE=InnoDB;
SELECT SETVAL(`sms_seq`, 550001, 0);

--
-- Sequence structure for `sous_compte_seq`
--

DROP SEQUENCE IF EXISTS `sous_compte_seq`;
CREATE SEQUENCE `sous_compte_seq` start with 1 minvalue 1 maxvalue 9223372036854775806 increment by 50 cache 1000 nocycle ENGINE=InnoDB;
SELECT SETVAL(`sous_compte_seq`, 400001, 0);

--
-- Sequence structure for `test_user_seq`
--

DROP SEQUENCE IF EXISTS `test_user_seq`;
CREATE SEQUENCE `test_user_seq` start with 1 minvalue 1 maxvalue 9223372036854775806 increment by 50 cache 1000 nocycle ENGINE=InnoDB;
SELECT SETVAL(`test_user_seq`, 650001, 0);

--
-- Table structure for table `inscription`
--

DROP TABLE IF EXISTS `inscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inscription` (
  `id` bigint(20) NOT NULL,
  `utilisateur` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `motdepasse` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `nom_soc` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `etat` varchar(50) DEFAULT 'inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscription`
--

LOCK TABLES `inscription` WRITE;
/*!40000 ALTER TABLE `inscription` DISABLE KEYS */;
INSERT INTO `inscription` VALUES
(200103,'test','0321111111','$2a$10$oQogrC0fD5Nty34RmrZ7a.MjwluhGU4p9Z1XnLjfOkqM4ZbknK2vS','rakotoharilalakaloinaalicia@gmail.com','test','test','test','active'),
(200151,'test1','0321234567','$2a$10$75BcAGwJuaGTe1AlOn1IfeulF6.CqcHxi/ANZXt52RY3oHmWG0wL.','rakotoharilalakaloinaalicia@gmail.com','societe','test1','test1','inactive'),
(200201,'test2','0371111111','$2a$10$DbELT4bpaWKQ.8c/sXgU5OAJkkK90WYfMasoFHngikEzxPAAas.qW','rakotoharilalakaloinaalcia@gmail.com','society','test2','test2','active');
/*!40000 ALTER TABLE `inscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms`
--

DROP TABLE IF EXISTS `sms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms` (
  `id` bigint(20) NOT NULL,
  `emetteur` varchar(255) DEFAULT NULL,
  `sous_compte` varchar(255) DEFAULT NULL,
  `destination` varchar(50) DEFAULT NULL,
  `orange` int(11) DEFAULT NULL,
  `telma` int(11) DEFAULT NULL,
  `airtel` int(11) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `envoie` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms`
--

LOCK TABLES `sms` WRITE;
/*!40000 ALTER TABLE `sms` DISABLE KEYS */;
INSERT INTO `sms` VALUES
(400051,'0321111111','','0321234567',1,0,0,'this is a message','2023-12-10 12:15:50.000000',0),
(400052,'0321111111','','0331234567',0,0,1,'this is a message','2023-12-10 12:15:50.000000',0),
(400053,'0321111111','','0341234567',0,1,0,'this is a message','2023-12-10 12:15:50.000000',0),
(400054,'0321111111','','0321234567',1,0,0,'this is a message','2023-11-08 21:17:05.086400',1),
(400055,'0321111111','','0331234567',0,0,1,'this is a message','2023-11-08 21:17:05.086400',1),
(400101,'0321111111','sousCompte','0321234567',1,0,0,'this is a message using sub-account','2023-11-08 21:29:05.557056',1),
(400102,'0321111111','sousCompte','0371234567',1,0,0,'this is a message using sub-account','2023-11-08 21:29:05.557056',1),
(400151,'0321234567','','0371234567',1,0,0,'test test','2023-11-09 12:52:34.309086',1),
(400152,'0321234567','','0331234567',0,0,1,'test test','2023-11-09 12:52:34.309086',1),
(400153,'0321234567','','0371234567',1,0,0,'test test','2023-11-15 12:15:50.000000',0),
(400154,'0321234567','','0331234567',0,0,1,'test test','2023-11-15 12:15:50.000000',0),
(400201,'0321234567','sousCompte1','0371234567',1,0,0,'string TEST','2023-11-10 09:10:11.969304',1),
(450001,'0321111111','sousCompte','0371111111',1,0,0,'test test','2023-11-13 08:51:10.290250',1),
(450002,'0321111111','sousCompte','0321234567',1,0,0,'test test','2023-11-13 08:51:10.290250',1),
(450003,'0321111111','sousCompte','0321234567',1,0,0,'string','2023-11-13 10:07:05.036973',1),
(500001,'0321111111','','0341234567',0,1,0,'string','2023-11-13 15:31:45.073085',1);
/*!40000 ALTER TABLE `sms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_envoie`
--

DROP TABLE IF EXISTS `sms_envoie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_envoie` (
  `balance` int(11) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nbContacts` int(11) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `campaignName` varchar(255) DEFAULT NULL,
  `destinataire` varchar(255) DEFAULT NULL,
  `emetteur` varchar(255) DEFAULT NULL,
  `expediteur` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `destinataires` varbinary(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_envoie`
--

LOCK TABLES `sms_envoie` WRITE;
/*!40000 ALTER TABLE `sms_envoie` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_envoie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sous_compte`
--

DROP TABLE IF EXISTS `sous_compte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sous_compte` (
  `id` bigint(20) NOT NULL,
  `parent` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sous_compte`
--

LOCK TABLES `sous_compte` WRITE;
/*!40000 ALTER TABLE `sous_compte` DISABLE KEYS */;
INSERT INTO `sous_compte` VALUES
(350001,'test','sousCompte','mdp','test','0321111111'),
(350051,'test','sousCompte1','mdp','sousCompte1','0321234567'),
(350101,'test1','sousComptetest1','MDP','NOM','0372222222'),
(350102,'test2','test2SC','mdp','test2SC','0321222222');
/*!40000 ALTER TABLE `sous_compte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_user`
--

DROP TABLE IF EXISTS `test_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_user` (
  `id` bigint(20) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_user`
--

LOCK TABLES `test_user` WRITE;
/*!40000 ALTER TABLE `test_user` DISABLE KEYS */;
INSERT INTO `test_user` VALUES
(601001,'$2a$10$T51Hyn6FvymnUXFMCxSoW.Ze3nWed.YoZehHL/LLDUlEedl/XAk32','admin','admin'),
(601002,'$2a$10$D3LoHY1OpSzEx5k/QR3OQOysoV2Y0aZ2.s6kRNo7L/OcKJ3aOl8Hi','user','user'),
(601003,'$2a$10$vHEU/Iid8ii/o0VL0xE/PeLfzLCXam7EwSBLb04fPl2qkYTedCUzi','user','usertest'),
(601054,'$2a$10$8kXzzrzMkIGAkT6a6pp24.My6/clb1dTq8sQSrAW3VxRfuzFJHTK.','user','test1'),
(601151,'$2a$10$IypvLC.ZvG9EAdwkf5zKEuai8ePzbQL8Wy4LTHrDHTvAuZR/JUCs6','user','test2');
/*!40000 ALTER TABLE `test_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-14  8:05:38
