DROP DATABASE IF EXISTS simpleRPG_DB;
CREATE DATABASE simpleRPG_DB;
USE simpleRPG_DB;

CREATE TABLE characters (
  char_id INT NOT NULL AUTO_INCREMENT,
  char_name VARCHAR(128) NOT NULL,
  char_level INT NOT NULL DEFAULT 1,
  char_class VARCHAR(32) NOT NULL,
  char_hp INT NOT NULL,
  char_mana INT NOT NULL,
  char_offense INT NOT NULL,
  char_defense INT NOT NULL,
  char_speed INT NOT NULL,
  char_luck INT NOT NULL,
  char_intelligence INT NOT NULL,
  char_status BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (char_id)
);
