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
INSERT INTO `client` VALUES ('1a4073fb-5ff7-4f49-3c91-0961492ec873','Order Client','client@order.com','F','Active','2018-10-10 17:47:09','24ce4242-debf-4b73-9edb-1276a1bf7e43','6eecbc32-e6ec-49e7-43de-955851e5c648');
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
INSERT INTO `company` VALUES ('24ce4242-debf-4b73-9edb-1276a1bf7e43','Another Company','www.newcompany.com','Web App','6eecbc32-e6ec-49e7-43de-955851e5c648');
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
  `idOrder` int(11) NOT NULL,
  `idProduct` varchar(50) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Color` varchar(100) NOT NULL,
  `ClothType` varchar(100) NOT NULL,
  PRIMARY KEY (`idOrderDetail`),
  KEY `fk_Order_has_Product_Product1_idx` (`idProduct`),
  KEY `fk_Order_has_Product_Order1_idx` (`idOrder`),
  CONSTRAINT `fk_Order_has_Product_Order1` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`idorder`),
  CONSTRAINT `fk_Order_has_Product_Product1` FOREIGN KEY (`idProduct`) REFERENCES `product` (`idproduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES ('61dc268c-0591-4879-c3ab-0fc0a71c6f56',2,'a06feb06-bba7-4757-f567-e9bba020b5ba',3,'22','222'),('9c6687f8-6412-4e61-82ec-61d744d1c4b9',1,'589df45e-9148-4d01-47ea-ceb16c538fea',3,'dfds','adasd');
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orders` (
  `idOrder` int(11) NOT NULL AUTO_INCREMENT,
  `OrderDate` date NOT NULL,
  `Price` float NOT NULL,
  `Status` varchar(45) NOT NULL,
  `Observations` varchar(45) DEFAULT NULL,
  `idClient` varchar(50) NOT NULL,
  `Reason` varchar(200) DEFAULT NULL,
  `Deleted` tinyint(4) NOT NULL,
  `createdBy` varchar(50) NOT NULL,
  `modifiedBy` varchar(50) NOT NULL,
  PRIMARY KEY (`idOrder`),
  UNIQUE KEY `idOrder_UNIQUE` (`idOrder`),
  KEY `fk_Order_Client1_idx` (`idClient`) /*!80000 INVISIBLE */,
  KEY `fk_Order_User1_idx` (`createdBy`),
  KEY `fk_Order_User2_idx` (`modifiedBy`),
  CONSTRAINT `fk_Order_Client1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idclient`),
  CONSTRAINT `fk_Order_User1` FOREIGN KEY (`createdBy`) REFERENCES `user` (`iduser`),
  CONSTRAINT `fk_Order_User2` FOREIGN KEY (`modifiedBy`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2018-10-31',56,'Denied','Lel','1a4073fb-5ff7-4f49-3c91-0961492ec873','Lol lel',1,'c4b07a00-a1e0-4e4d-2493-b3181a3bc4ec','c4b07a00-a1e0-4e4d-2493-b3181a3bc4ec'),(2,'2018-10-31',121,'Completed',NULL,'1a4073fb-5ff7-4f49-3c91-0961492ec873',NULL,0,'c4b07a00-a1e0-4e4d-2493-b3181a3bc4ec','c4b07a00-a1e0-4e4d-2493-b3181a3bc4ec');
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
  `Size` varchar(100) NOT NULL,
  `URL` varchar(200) DEFAULT NULL,
  `imageID` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('589df45e-9148-4d01-47ea-ceb16c538fea','Test Product','product with image','11','https://res.cloudinary.com/hiqgsdump/image/upload/v1539207967/s9v6j83ophu86o5qb94w.jpg','s9v6j83ophu86o5qb94w'),('a06feb06-bba7-4757-f567-e9bba020b5ba','Image','New description','19','https://res.cloudinary.com/hiqgsdump/image/upload/v1540514216/e1kipjk86mbxxfaoxif8.png','e1kipjk86mbxxfaoxif8');
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
INSERT INTO `user` VALUES ('6eecbc32-e6ec-49e7-43de-955851e5c648','Kevin Salamanca','kevin@reponic.org','2018-08-26 00:00:00','Admin','',0),('c4b07a00-a1e0-4e4d-2493-b3181a3bc4ec','Decoaries Admin','admin@decosoftware.com','2018-10-10 17:39:01','Admin','auth0|5bbe7176f31d5e27930be00e',0);
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

-- Dump completed on 2018-11-27 12:26:57
