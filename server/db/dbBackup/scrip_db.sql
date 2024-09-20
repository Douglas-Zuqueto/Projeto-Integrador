-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_ecommerce
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_ecommerce
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_ecommerce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `db_ecommerce` ;
-- -----------------------------------------------------
-- Table `db_ecommerce`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `db_ecommerce`.`compradores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`compradores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(45) NULL DEFAULT NULL,
  `cpf` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_ecommerce`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_ecommerce`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`produtos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `descricao_detalhada` TEXT NULL DEFAULT NULL,
  `imagem` VARCHAR(255) NULL DEFAULT NULL,
  `qnt_estoque` DECIMAL(10,2) NOT NULL,
  `categoria_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `categoria_id` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `produtos_ibfk_2`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `db_ecommerce`.`categorias` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_ecommerce`.`carrinho`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`carrinho` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comprador_id` INT NULL DEFAULT NULL,
  `produto_id` INT NULL DEFAULT NULL,
  `quantidade` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `comprador_id` (`comprador_id` ASC) VISIBLE,
  INDEX `produto_id` (`produto_id` ASC) VISIBLE,
  CONSTRAINT `carrinho_ibfk_1`
    FOREIGN KEY (`comprador_id`)
    REFERENCES `db_ecommerce`.`compradores` (`id`),
  CONSTRAINT `carrinho_ibfk_2`
    FOREIGN KEY (`produto_id`)
    REFERENCES `db_ecommerce`.`produtos` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `db_ecommerce`.`cartoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`cartoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comprador_id` INT NULL DEFAULT NULL,
  `tipo` ENUM('credito', 'debito') NOT NULL,
  `nome_titular` VARCHAR(255) NOT NULL,
  `numero_cartao` VARCHAR(20) NOT NULL,
  `validade` DATE NOT NULL,
  `cvv` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `comprador_id` (`comprador_id` ASC) VISIBLE,
  CONSTRAINT `cartoes_ibfk_1`
    FOREIGN KEY (`comprador_id`)
    REFERENCES `db_ecommerce`.`compradores` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `db_ecommerce`.`chats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`chats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comprador_id` INT NULL DEFAULT NULL,
  `data_inicio` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `comprador_id` (`comprador_id` ASC) VISIBLE,
  CONSTRAINT `chats_ibfk_1`
    FOREIGN KEY (`comprador_id`)
    REFERENCES `db_ecommerce`.`compradores` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `db_ecommerce`.`cupons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`cupons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(50) NOT NULL,
  `desconto` DECIMAL(5,2) NOT NULL,
  `data_validade` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `codigo` (`codigo` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `db_ecommerce`.`enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`enderecos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comprador_id` INT NULL DEFAULT NULL,
  `endereco` VARCHAR(255) NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  `estado` VARCHAR(100) NOT NULL,
  `cep` VARCHAR(20) NOT NULL,
  `pais` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `comprador_id` (`comprador_id` ASC) VISIBLE,
  CONSTRAINT `enderecos_ibfk_1`
    FOREIGN KEY (`comprador_id`)
    REFERENCES `db_ecommerce`.`compradores` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_ecommerce`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comprador_id` INT NULL DEFAULT NULL,
  `data_pedido` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(10,2) NULL DEFAULT NULL,
  `forma_pagamento` VARCHAR(50) NULL DEFAULT NULL,
  `status` VARCHAR(50) NULL DEFAULT 'pendente',
  `endereco_id` INT NULL DEFAULT NULL,
  `cupom_id` INT NULL DEFAULT NULL,
  `frete` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `comprador_id` (`comprador_id` ASC) VISIBLE,
  INDEX `endereco_id` (`endereco_id` ASC) VISIBLE,
  INDEX `cupom_id` (`cupom_id` ASC) VISIBLE,
  CONSTRAINT `pedidos_ibfk_1`
    FOREIGN KEY (`comprador_id`)
    REFERENCES `db_ecommerce`.`compradores` (`id`),
  CONSTRAINT `pedidos_ibfk_2`
    FOREIGN KEY (`endereco_id`)
    REFERENCES `db_ecommerce`.`enderecos` (`id`),
  CONSTRAINT `pedidos_ibfk_3`
    FOREIGN KEY (`cupom_id`)
    REFERENCES `db_ecommerce`.`cupons` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_ecommerce`.`historico_pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`historico_pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pedido_id` INT NULL DEFAULT NULL,
  `status` VARCHAR(50) NULL DEFAULT NULL,
  `data_status` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `pedido_id` (`pedido_id` ASC) VISIBLE,
  CONSTRAINT `historico_pedidos_ibfk_1`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `db_ecommerce`.`pedidos` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_ecommerce`.`itens_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`itens_pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pedido_id` INT NULL DEFAULT NULL,
  `produto_id` INT NULL DEFAULT NULL,
  `quantidade` DECIMAL(10,2) NOT NULL,
  `preco_unitario` DECIMAL(10,2) NOT NULL,
  `desconto` DECIMAL(5,2) NOT NULL DEFAULT '0.00',
  `total` DECIMAL(10,2) GENERATED ALWAYS AS ((`quantidade` * (`preco_unitario` - ((`preco_unitario` * `desconto`) / 100)))) STORED,
  PRIMARY KEY (`id`),
  INDEX `pedido_id` (`pedido_id` ASC) VISIBLE,
  INDEX `produto_id` (`produto_id` ASC) VISIBLE,
  CONSTRAINT `itens_pedido_ibfk_1`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `db_ecommerce`.`pedidos` (`id`),
  CONSTRAINT `itens_pedido_ibfk_2`
    FOREIGN KEY (`produto_id`)
    REFERENCES `db_ecommerce`.`produtos` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_ecommerce`.`mensagens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`mensagens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `chat_id` INT NULL DEFAULT NULL,
  `remetente` ENUM('comprador', 'admin') NOT NULL,
  `mensagem` TEXT NOT NULL,
  `data_envio` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `chat_id` (`chat_id` ASC) VISIBLE,
  CONSTRAINT `mensagens_ibfk_1`
    FOREIGN KEY (`chat_id`)
    REFERENCES `db_ecommerce`.`chats` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_ecommerce`.`promocoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ecommerce`.`promocoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `produto_id` INT NULL DEFAULT NULL,
  `desconto` DECIMAL(5,2) NOT NULL,
  `data_inicio` DATE NOT NULL,
  `data_fim` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `produto_id` (`produto_id` ASC) VISIBLE,
  CONSTRAINT `promocoes_ibfk_1`
    FOREIGN KEY (`produto_id`)
    REFERENCES `db_ecommerce`.`produtos` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
