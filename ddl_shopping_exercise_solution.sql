-- =========================================
-- RELATIONAL DATABASES - DDL CHECKPOINT
-- Complete SQL Solution (Oracle)
-- =========================================

-- =========================================
-- 1. CREATE TABLES
-- =========================================

-- CUSTOMER TABLE
CREATE TABLE Customer (
    Customer_id VARCHAR2(20) PRIMARY KEY,
    Customer_Name VARCHAR2(20) NOT NULL,
    Customer_Tel NUMBER
);

-- PRODUCT TABLE
CREATE TABLE Product (
    Product_id VARCHAR2(20) PRIMARY KEY,
    Product_name VARCHAR2(20) NOT NULL,
    Price NUMBER
);

-- ORDERS TABLE
CREATE TABLE Orders (
    Customer_id VARCHAR2(20),
    Product_id VARCHAR2(20),
    Quantity NUMBER,
    Total_amount NUMBER,
    
    -- Composite Primary Key
    CONSTRAINT pk_orders PRIMARY KEY (Customer_id, Product_id),
    
    -- Foreign Keys
    CONSTRAINT fk_orders_customer FOREIGN KEY (Customer_id)
        REFERENCES Customer(Customer_id),
        
    CONSTRAINT fk_orders_product FOREIGN KEY (Product_id)
        REFERENCES Product(Product_id)
);

-- =========================================
-- 2. ALTER TABLE - ADD CATEGORY TO PRODUCT
-- =========================================

ALTER TABLE Product 
ADD Category VARCHAR2(20);

-- =========================================
-- 3. ALTER TABLE - ADD ORDER DATE WITH DEFAULT SYSDATE
-- =========================================

ALTER TABLE Orders 
ADD OrderDate DATE DEFAULT SYSDATE;

-- =========================================
-- END OF SCRIPT
-- =========================================