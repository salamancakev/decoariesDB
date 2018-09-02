-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: decoaries
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `client` (
  `idClient` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Gender` char(1) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `createDate` datetime NOT NULL,
  `idCompany` varchar(50) NOT NULL,
  `idUser` varchar(50) NOT NULL,
  PRIMARY KEY (`idClient`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `fk_Client_Company_idx` (`idCompany`),
  KEY `fk_client_user1_idx` (`idUser`),
  CONSTRAINT `fk_Client_Company` FOREIGN KEY (`idCompany`) REFERENCES `company` (`idcompany`),
  CONSTRAINT `fk_client_user1` FOREIGN KEY (`idUser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('12c0d912-0d6c-439d-3a84-1eab5ff4ff8e','Kimberly Salamanca','kimberly@reponic.org','F','Active','2018-08-26 12:30:07','34c88743-5b38-49cc-e224-ea5e6cbf8de1','0300a778-6b23-4658-fa68-0afce8351edc'),('566216ab-886d-486f-2a47-013f3dc82ef0','Diego Rodriguez','diego@gmail.com','M','Active','2018-08-26 13:16:08','18e18413-5847-415c-fc22-0563eb2a05c9','0300a778-6b23-4658-fa68-0afce8351edc'),('db89ab86-45ef-427d-9c67-2d1ca87d9d43','Jorge Salamanca','yuribiac@gmail.com','M','Active','2018-08-25 21:56:06','18e18413-5847-415c-fc22-0563eb2a05c9','0300a778-6b23-4658-fa68-0afce8351edc'),('dbc8b099-d6ae-4824-b1d6-e2ae9c56be30','Test','test@gmail.com','F','Active','2018-08-26 15:52:21','34c88743-5b38-49cc-e224-ea5e6cbf8de1','0300a778-6b23-4658-fa68-0afce8351edc');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `company` (
  `idCompany` varchar(50) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Website` varchar(100) DEFAULT NULL,
  `From` varchar(45) NOT NULL,
  `idUser` varchar(50) NOT NULL,
  PRIMARY KEY (`idCompany`),
  UNIQUE KEY `Name_UNIQUE` (`Name`),
  KEY `fk_company_user1_idx` (`idUser`),
  CONSTRAINT `fk_company_user1` FOREIGN KEY (`idUser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('18e18413-5847-415c-fc22-0563eb2a05c9','Company','www.company.com','Web App','0300a778-6b23-4658-fa68-0afce8351edc'),('34c88743-5b38-49cc-e224-ea5e6cbf8de1','Reponic','www.reponic.org','Web App','0300a778-6b23-4658-fa68-0afce8351edc'),('d015e9b3-a70c-4d96-4993-858728e5a57c','adsfdsf','sdfsd','Web App','0300a778-6b23-4658-fa68-0afce8351edc'),('dbbb2aac-8040-49f3-c507-7f655c5c0a0d','Kim\'s Company','www.kim.com','Web App','0300a778-6b23-4658-fa68-0afce8351edc');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `orderdetails` (
  `idOrderDetail` varchar(50) NOT NULL,
  `idOrder` varchar(50) NOT NULL,
  `idProduct` varchar(50) NOT NULL,
  `Quantity` int(11) NOT NULL,
  PRIMARY KEY (`idOrderDetail`),
  KEY `fk_Order_has_Product_Order1_idx` (`idOrder`),
  KEY `fk_Order_has_Product_Product1_idx` (`idProduct`),
  CONSTRAINT `fk_Order_has_Product_Order1` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`idorder`),
  CONSTRAINT `fk_Order_has_Product_Product1` FOREIGN KEY (`idProduct`) REFERENCES `product` (`idproduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES ('80f9fbb8-83a4-4ab6-4184-005f2021682e','e3320bd7-f30e-4e0f-e588-ab98ba026dbc','fd831f76-801b-4c29-3fad-89ca40f4ebb4',65),('85039865-3edf-4b84-511d-141d54ade487','e3320bd7-f30e-4e0f-e588-ab98ba026dbc','ca4a9d89-4d9d-4b72-9aef-7b11d45a942c',23);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `orders` (
  `idOrder` varchar(50) NOT NULL,
  `OrderDate` date NOT NULL,
  `Price` float NOT NULL,
  `idClient` varchar(50) NOT NULL,
  PRIMARY KEY (`idOrder`),
  KEY `fk_Order_Client1_idx` (`idClient`),
  CONSTRAINT `fk_Order_Client1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idclient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('e3320bd7-f30e-4e0f-e588-ab98ba026dbc','2018-08-26',57,'dbc8b099-d6ae-4824-b1d6-e2ae9c56be30');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone`
--

DROP TABLE IF EXISTS `phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `phone` (
  `idPhone` varchar(50) NOT NULL,
  `PhoneNumber` varchar(50) NOT NULL,
  `idClient` varchar(45) NOT NULL,
  PRIMARY KEY (`idPhone`),
  UNIQUE KEY `PhoneNumber_UNIQUE` (`PhoneNumber`),
  KEY `client_FK_idx` (`idClient`),
  CONSTRAINT `client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idclient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone`
--

LOCK TABLES `phone` WRITE;
/*!40000 ALTER TABLE `phone` DISABLE KEYS */;
INSERT INTO `phone` VALUES ('0360c901-df95-4c8d-0d77-9de90d7f3a79','95957746','dbc8b099-d6ae-4824-b1d6-e2ae9c56be30'),('4bc45fb5-8ceb-4f8a-f553-5e63cf8e184e','213546324','12c0d912-0d6c-439d-3a84-1eab5ff4ff8e'),('542bbe36-ab67-45d1-53fd-350358694fd1','213563436','12c0d912-0d6c-439d-3a84-1eab5ff4ff8e'),('67976b88-3394-4bf3-302c-840c62e56564','95940356','dbc8b099-d6ae-4824-b1d6-e2ae9c56be30'),('a66b479e-1d62-4bf0-48c9-c898e816b104','123456','12c0d912-0d6c-439d-3a84-1eab5ff4ff8e'),('e69e2497-78f1-4187-7986-d4adf1c52406','4123127069','db89ab86-45ef-427d-9c67-2d1ca87d9d43');
/*!40000 ALTER TABLE `phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `product` (
  `idProduct` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(45) DEFAULT NULL,
  `Size` varchar(45) NOT NULL,
  `ClothType` varchar(45) NOT NULL,
  `URL` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('2a307507-7495-4786-ef24-09cce9de3ba5','Test Product edited','Edited','49','Denim','www.url.com'),('ca4a9d89-4d9d-4b72-9aef-7b11d45a942c','Test','A test product','57','Cloth',NULL),('fd831f76-801b-4c29-3fad-89ca40f4ebb4','Hola',NULL,'12.5','Denim',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote`
--

DROP TABLE IF EXISTS `quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `quote` (
  `idQuote` varchar(50) NOT NULL,
  `idProduct` varchar(50) NOT NULL,
  `Details` varchar(45) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `idUser` varchar(50) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL,
  `CompanyOrClient` varchar(45) NOT NULL,
  PRIMARY KEY (`idQuote`),
  KEY `fk_quote_user1_idx` (`idUser`),
  KEY `fk_quote_product1_idx` (`idProduct`),
  CONSTRAINT `fk_quote_product1` FOREIGN KEY (`idProduct`) REFERENCES `product` (`idproduct`),
  CONSTRAINT `fk_quote_user1` FOREIGN KEY (`idUser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quote`
--

LOCK TABLES `quote` WRITE;
/*!40000 ALTER TABLE `quote` DISABLE KEYS */;
/*!40000 ALTER TABLE `quote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `user` (
  `idUser` varchar(50) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `createDate` datetime NOT NULL,
  `Type` varchar(45) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('0300a778-6b23-4658-fa68-0afce8351edc','Kevin Salamanca','kevin@reponic.org','2018-08-25 00:00:00','Admin'),('dcb0425d-a4ce-4865-f967-3e917d863e76','Kevin','kevinsalamanca26@gmail.com','2018-08-25 13:24:35','Employee');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-26 16:01:13
