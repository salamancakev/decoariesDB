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
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('390ffc12-1a08-4f6a-3b99-876e4ef243bb','Kimberly Salamanca','kimberly@reponic.org','F','Active','2018-09-02 17:20:35','f5f59161-a39a-435b-05e2-7a955ef0c543','6eecbc32-e6ec-49e7-43de-955851e5c648'),('52d8a777-0673-48a9-6e5c-f986c609d6c4','New Client','client@client.com','M','Active','2018-09-04 10:18:16','e4b941dd-f881-4ade-7804-4877234d2cfd','6eecbc32-e6ec-49e7-43de-955851e5c648'),('abf7a5a3-a06d-4ee2-1804-bb8b0b3532db','Kevin','kevinsalamanca26@gmail.com','M','Active','2018-08-26 20:58:43','f5f59161-a39a-435b-05e2-7a955ef0c543','6eecbc32-e6ec-49e7-43de-955851e5c648');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('e4b941dd-f881-4ade-7804-4877234d2cfd','New Company','www.company.com','Web App','6eecbc32-e6ec-49e7-43de-955851e5c648'),('f5f59161-a39a-435b-05e2-7a955ef0c543','Reponic','www.reponic.org','Web App','6eecbc32-e6ec-49e7-43de-955851e5c648');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES ('091ea381-1224-4ce3-53cd-7d126fbe2bad','23368878-7989-420b-2d6d-0aa7b61919f2','1a9b5188-f473-48c1-072d-8c8fd374380c',13),('45e268f3-6ccf-4deb-9731-29d749def995','c890cf0c-8f08-43fc-e19f-b74b1067b2c7','d6a31ce7-3c14-4270-fe2c-ecaed12a199c',44),('fde8a86b-224f-4478-1bdd-cf2d3abbb923','23368878-7989-420b-2d6d-0aa7b61919f2','d6a31ce7-3c14-4270-fe2c-ecaed12a199c',12);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orders` (
  `idOrder` varchar(50) NOT NULL,
  `OrderDate` date NOT NULL,
  `Price` float NOT NULL,
  `Status` varchar(45) NOT NULL,
  `Observations` varchar(45) DEFAULT NULL,
  `idClient` varchar(50) NOT NULL,
  PRIMARY KEY (`idOrder`),
  KEY `fk_Order_Client1_idx` (`idClient`),
  CONSTRAINT `fk_Order_Client1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idclient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('23368878-7989-420b-2d6d-0aa7b61919f2','2018-08-26',75,'Confirmed','Order confirmed','abf7a5a3-a06d-4ee2-1804-bb8b0b3532db'),('c890cf0c-8f08-43fc-e19f-b74b1067b2c7','2018-09-02',65,'Completed','Updated Products','390ffc12-1a08-4f6a-3b99-876e4ef243bb');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone`
--

DROP TABLE IF EXISTS `phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `phone` (
  `idPhone` varchar(50) NOT NULL,
  `PhoneNumber` varchar(50) NOT NULL,
  `idClient` varchar(45) NOT NULL,
  PRIMARY KEY (`idPhone`),
  UNIQUE KEY `PhoneNumber_UNIQUE` (`PhoneNumber`),
  KEY `client_FK_idx` (`idClient`),
  CONSTRAINT `client_FK` FOREIGN KEY (`idClient`) REFERENCES `client` (`idclient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone`
--

LOCK TABLES `phone` WRITE;
/*!40000 ALTER TABLE `phone` DISABLE KEYS */;
INSERT INTO `phone` VALUES ('4fc6c428-62a7-4574-1faf-d2dd995e99f3','324235423','abf7a5a3-a06d-4ee2-1804-bb8b0b3532db'),('733fb0d1-8cfe-4677-c9a5-d32894ae4d07','3152463426','390ffc12-1a08-4f6a-3b99-876e4ef243bb'),('e8662369-30f9-413a-3ae5-fb14f3ec2239','134325235','52d8a777-0673-48a9-6e5c-f986c609d6c4'),('faf96213-3b54-4d9a-3e21-c47c9db07a9f','2345123','abf7a5a3-a06d-4ee2-1804-bb8b0b3532db');
/*!40000 ALTER TABLE `phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `idProduct` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(45) DEFAULT NULL,
  `Size` varchar(45) NOT NULL,
  `ClothType` varchar(45) NOT NULL,
  `URL` varchar(200) NOT NULL,
  `imageID` varchar(200) NOT NULL,
  PRIMARY KEY (`idProduct`),
  UNIQUE KEY `Name_UNIQUE` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('1a9b5188-f473-48c1-072d-8c8fd374380c','Image2','wqewqewq','214','asdsadas','https://res.cloudinary.com/hiqgsdump/image/upload/v1538428440/st4dlys2dpvcuh00cef2.pdf','st4dlys2dpvcuh00cef2'),('d6a31ce7-3c14-4270-fe2c-ecaed12a199c','Test','A test product','12.5','Denim','',''),('e0f1b840-1e46-4333-0e3c-6a23e367e53f','Pillow','No description','15','Cloth','','');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote`
--

DROP TABLE IF EXISTS `quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `idUser` varchar(50) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `createDate` datetime NOT NULL,
  `Type` varchar(45) NOT NULL,
  `Auth0` varchar(200) NOT NULL,
  `Blocked` tinyint(4) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('30b4a5b0-ea2e-422a-2250-f6a9bfca3ae7','Employee','employee@company.com','2018-09-01 08:12:12','Employee','',0),('6eecbc32-e6ec-49e7-43de-955851e5c648','Kevin Salamanca','kevin@reponic.org','2018-08-26 00:00:00','Admin','',0),('7253ca8a-1ca2-45af-838a-cd83aa701d01','New User','user@user.com','2018-10-03 09:28:22','Employee','auth0|5bb4c3f8a66ec32ded87a135',1),('99022d89-728c-49ba-24a8-e9ef9b61f377','Apple','apple@correo.com','2018-09-15 16:47:35','Employee','auth0|5b9d6fe772d4bb47f9a7ed9b',1),('c4b07a00-a1e0-4e4d-2493-b3181a3bc4ec','Decoaries Admin','admin@decosoftware.com','2018-10-10 17:39:01','Admin','auth0|5bbe7176f31d5e27930be00e',0);
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

-- Dump completed on 2018-10-10 17:40:32
