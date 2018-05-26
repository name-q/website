/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : qone

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2018-05-26 21:23:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for aboutus_table
-- ----------------------------
DROP TABLE IF EXISTS `aboutus_table`;
CREATE TABLE `aboutus_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `pic_src` varchar(300) NOT NULL,
  `href` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of aboutus_table
-- ----------------------------

-- ----------------------------
-- Table structure for ad_super
-- ----------------------------
DROP TABLE IF EXISTS `ad_super`;
CREATE TABLE `ad_super` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `memorandum` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ad_super
-- ----------------------------
INSERT INTO `ad_super` VALUES ('1', 'qy', '01e243149988618d1a5573f742424456', 'default qy 123456');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL COMMENT '大标题',
  `description` varchar(300) NOT NULL COMMENT '描述文字',
  `href` varchar(300) NOT NULL COMMENT '点击链接',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------

-- ----------------------------
-- Table structure for blog_table
-- ----------------------------
DROP TABLE IF EXISTS `blog_table`;
CREATE TABLE `blog_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `pic_src` varchar(300) NOT NULL,
  `pic_big_src` varchar(300) NOT NULL,
  `summary` varchar(500) NOT NULL,
  `content` text NOT NULL,
  `post_time` int(11) NOT NULL,
  `author` varchar(32) NOT NULL,
  `n_view` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_table
-- ----------------------------

-- ----------------------------
-- Table structure for contact_table
-- ----------------------------
DROP TABLE IF EXISTS `contact_table`;
CREATE TABLE `contact_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `fax` varchar(20) NOT NULL,
  `email` varchar(64) NOT NULL,
  `weibo` varchar(40) NOT NULL,
  `wx` varchar(40) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contact_table
-- ----------------------------

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '标题',
  `description` varchar(300) NOT NULL COMMENT '评价详情',
  `src` varchar(300) NOT NULL COMMENT '用户头像',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of evaluate
-- ----------------------------
INSERT INTO `evaluate` VALUES ('7', '1', '1', '/use_upload/de09aa6128db445d40ed9b92b30965af.jpg');
INSERT INTO `evaluate` VALUES ('8', '1', '1', '/use_upload/9fba44b8579b4eb2f07f842d2d11b96b.jpg');

-- ----------------------------
-- Table structure for intro_table
-- ----------------------------
DROP TABLE IF EXISTS `intro_table`;
CREATE TABLE `intro_table` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '大标题',
  `description` varchar(200) NOT NULL COMMENT '描述文字',
  `href` varchar(300) NOT NULL COMMENT '点击链接',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of intro_table
-- ----------------------------

-- ----------------------------
-- Table structure for msg_table
-- ----------------------------
DROP TABLE IF EXISTS `msg_table`;
CREATE TABLE `msg_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `email` varchar(64) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `subject` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of msg_table
-- ----------------------------

-- ----------------------------
-- Table structure for news_table
-- ----------------------------
DROP TABLE IF EXISTS `news_table`;
CREATE TABLE `news_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL COMMENT '标题',
  `summary` varchar(500) NOT NULL COMMENT '简介',
  `ico_src` varchar(300) NOT NULL COMMENT '产品小图标',
  `big_pic_src` varchar(300) NOT NULL COMMENT '详情大图',
  `content` text NOT NULL COMMENT '内容',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news_table
-- ----------------------------
