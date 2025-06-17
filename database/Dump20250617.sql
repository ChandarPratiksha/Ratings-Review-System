-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: ratings_review_system
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  `product_name` varchar(150) NOT NULL,
  `product_img` varchar(255) DEFAULT NULL,
  `product_description` text,
  `prize` decimal(10,2) DEFAULT NULL,
  `orders_count` int DEFAULT '0',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Face_Product','Dot and Key Sunscreen','https://m.media-amazon.com/images/S/aplus-media-library-service-media/d84c7145-433e-47c3-a736-8680f87c4282.__CR0,0,970,600_PT0_SX970_V1___.jpg','Vitamin C + E Sunscreen is an SPF 50+ sunscreen that combines the benefits of Triple Vitamin C, Sicilian Blood Orange, and UV filters. It protects the skin from harmful UVA, UVB, and blue light rays while promoting a glowing and sun-protected skin.',499.00,0),(2,'Face_Product','Clean and Care Facewash','https://i5.walmartimages.com/seo/Clean-Clear-Foaming-Face-Wash-150ml_2ec7eba7-d726-4aed-ac3a-4b4e843a2a54_1.330879ddb4a5a011b8a75e7581b3aabe.jpeg','Reduces Pimples. Enriched with Vitamin C known to brighten skin\nNO ADDED PARABENS\nHas Brightening Ingredients\nReduce pimple causing germs from 1st wash*\nGentle enough to use every day for clean and clear skin that glows',105.00,0),(3,'Electronics','Wireless Bluetooth Headphones','https://i5.walmartimages.com/seo/Symphonized-Blast-Wireless-Bluetooth-Headphones-Mic-Over-Ear-Samsung-More-22-Playtime-Hours-Travel-Work-Deep-Bass-Noise-Isolation-Red_78ff8e5b-5570-4eb2-8ca0-422e4a64d51e.a392ad46e96f707de61a5547318e70d1.jpeg','High-quality wireless headphones with noise cancellation and 20-hour battery life.',2499.00,0),(4,'Home & Kitchen','Stainless Steel Water Bottle','https://m.media-amazon.com/images/I/61c-GtJ+0eL.jpg','durable construction, rust prevention, and insulation ',350.00,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating_review`
--

DROP TABLE IF EXISTS `rating_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating_review` (
  `rating_review_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `review` text,
  `img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rating_review_id`),
  UNIQUE KEY `unique_user_review` (`user_id`,`product_id`),
  KEY `fk_product` (`product_id`),
  CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `rating_review_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating_review`
--

LOCK TABLES `rating_review` WRITE;
/*!40000 ALTER TABLE `rating_review` DISABLE KEYS */;
INSERT INTO `rating_review` VALUES (3,3,2,4,'good quality','','2025-06-17 10:05:39'),(4,1,3,1,'bad','','2025-06-17 10:59:55'),(6,4,1,4,'Must Buy!!','https://th.bing.com/th/id/OIP.M1iFujg_oCaWmTA3L7Y2nAHaJQ?r=0&rs=1&pid=ImgDetMain','2025-06-17 13:54:37');
/*!40000 ALTER TABLE `rating_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Pratiksha_Chandar','pratiksha@gmail.com','p@123','2025-06-16 10:34:02'),(2,'Aditya','aditya@gmail.com','a@123','2025-06-16 10:34:02'),(3,'Meera','meera@gmail.com','m@123','2025-06-16 10:34:02'),(4,'Rohit','rohit@gmail.com','r@123','2025-06-16 10:34:02'),(5,'Sana','sana@gmail.com','s@123','2025-06-16 10:34:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17 20:16:12
