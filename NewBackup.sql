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
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('abf7a5a3-a06d-4ee2-1804-bb8b0b3532db','Kevin','kevinsalamanca26@gmail.com','M','Active','2018-08-26 20:58:43','f5f59161-a39a-435b-05e2-7a955ef0c543','6eecbc32-e6ec-49e7-43de-955851e5c648'),('f46842ee-0b35-4821-3884-9631ec313668','Jorge Salamanca','jorge@gmail.com','M','Active','2018-08-26 20:57:43','0e3eccae-2945-4272-96ea-5a5e5c560078','6eecbc32-e6ec-49e7-43de-955851e5c648');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8  ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('0e3eccae-2945-4272-96ea-5a5e5c560078','Jorge\'s Company','www.jorge.com','Web App','6eecbc32-e6ec-49e7-43de-955851e5c648'),('f5f59161-a39a-435b-05e2-7a955ef0c543','Reponic','www.reponic.org','Web App','6eecbc32-e6ec-49e7-43de-955851e5c648');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8  ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES ('ca8b4305-7355-49b2-4e57-abea0873485d','23368878-7989-420b-2d6d-0aa7b61919f2','e0f1b840-1e46-4333-0e3c-6a23e367e53f',34),('f7a67e60-9799-4c14-f0b6-db9c20eb0feb','23368878-7989-420b-2d6d-0aa7b61919f2','d6a31ce7-3c14-4270-fe2c-ecaed12a199c',123);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8  ;
CREATE TABLE `orders` (
  `idOrder` varchar(50) NOT NULL,
  `OrderDate` date NOT NULL,
  `Price` float NOT NULL,
  `idClient` varchar(50) NOT NULL,
  PRIMARY KEY (`idOrder`),
  KEY `fk_Order_Client1_idx` (`idClient`),
  CONSTRAINT `fk_Order_Client1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idclient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('23368878-7989-420b-2d6d-0aa7b61919f2','2018-08-26',70,'abf7a5a3-a06d-4ee2-1804-bb8b0b3532db');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone`
--

DROP TABLE IF EXISTS `phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8  ;
CREATE TABLE `phone` (
  `idPhone` varchar(50) NOT NULL,
  `PhoneNumber` varchar(50) NOT NULL,
  `idClient` varchar(45) NOT NULL,
  PRIMARY KEY (`idPhone`),
  UNIQUE KEY `PhoneNumber_UNIQUE` (`PhoneNumber`),
  KEY `client_FK_idx` (`idClient`),
  CONSTRAINT `client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idclient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone`
--

LOCK TABLES `phone` WRITE;
/*!40000 ALTER TABLE `phone` DISABLE KEYS */;
INSERT INTO `phone` VALUES ('09ac0eec-300e-484c-4683-9465c63c1f82','124154','f46842ee-0b35-4821-3884-9631ec313668'),('4fc6c428-62a7-4574-1faf-d2dd995e99f3','324235423','abf7a5a3-a06d-4ee2-1804-bb8b0b3532db'),('9c949e30-06e1-4e60-dd7c-7fa65f532072','4123127069','f46842ee-0b35-4821-3884-9631ec313668'),('faf96213-3b54-4d9a-3e21-c47c9db07a9f','2345123','abf7a5a3-a06d-4ee2-1804-bb8b0b3532db');
/*!40000 ALTER TABLE `phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8  ;
CREATE TABLE `product` (
  `idProduct` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(45) DEFAULT NULL,
  `Size` varchar(45) NOT NULL,
  `ClothType` varchar(45) NOT NULL,
  `URL` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('d6a31ce7-3c14-4270-fe2c-ecaed12a199c','Test','A test product','12.5','Denim',NULL),('e0f1b840-1e46-4333-0e3c-6a23e367e53f','Pillow',NULL,'15','Cloth',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote`
--

DROP TABLE IF EXISTS `quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8  ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;
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
 SET character_set_client = utf8  ;
CREATE TABLE `user` (
  `idUser` varchar(50) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `createDate` datetime NOT NULL,
  `Type` varchar(45) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('6eecbc32-e6ec-49e7-43de-955851e5c648','Kevin Salamanca','kevin@reponic.org','2018-08-26 00:00:00','Admin');
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

-- Dump completed on 2018-08-26 21:35:21
