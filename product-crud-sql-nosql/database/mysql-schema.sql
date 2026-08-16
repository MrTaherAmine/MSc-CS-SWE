-- MySQL Product table equivalent to the Mongoose Product schema.

CREATE DATABASE IF NOT EXISTS product_crud_checkpoint;
USE product_crud_checkpoint;

CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NULL,
    inStock BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    CONSTRAINT chk_product_price CHECK (price >= 0)
);

-- Optional example:
-- INSERT INTO products (name, price, category, inStock)
-- VALUES ('Mechanical Keyboard', 129.90, 'Accessories', TRUE);
