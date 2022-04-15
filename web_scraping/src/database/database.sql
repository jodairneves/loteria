-- -----------------------------------------------------
-- Schema loteria
-- -----------------------------------------------------
CREATE DATABASE loteria;

-- -----------------------------------------------------
-- TABLES
-- -----------------------------------------------------
-- Table `loteria`.`lotofacil`
-- -----------------------------------------------------
CREATE TABLE lotofacil (
	concurso INTEGER PRIMARY KEY NOT NULL,
    data_concurso TIMESTAMP NOT NULL,
    num_01 INTEGER NOT NULL,
    num_02 INTEGER NOT NULL,
    num_03 INTEGER NOT NULL,
    num_04 INTEGER NOT NULL,
    num_05 INTEGER NOT NULL,
    num_06 INTEGER NOT NULL,
    num_07 INTEGER NOT NULL,
    num_08 INTEGER NOT NULL,
    num_09 INTEGER NOT NULL,
    num_10 INTEGER NOT NULL,
    num_11 INTEGER NOT NULL,
    num_12 INTEGER NOT NULL,
    num_13 INTEGER NOT NULL,
    num_14 INTEGER NOT NULL,
    num_15 INTEGER NOT NULL    
);