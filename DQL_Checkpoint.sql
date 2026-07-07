/*
Data Query Language (DQL) Checkpoint
Relational Model:

Customer(Customer_id, customer_Name, customer_Tel)
Product(Product_id, product_name, category, Price)
Orders(Customer_id, Product_id, OrderDate, quantity, total_amount)

Note:
- Backticks are used around `Orders` because ORDER/ORDERS can sometimes cause naming conflicts
  depending on the SQL environment.
- These queries are written for MySQL.
*/

-- 1. Display all the data of customers
SELECT *
FROM Customer;


-- 2. Display the product_name and category for products whose price is between 5000 and 10000
SELECT 
    product_name,
    category
FROM Product
WHERE Price BETWEEN 5000 AND 10000;


-- 3. Display all the data of products sorted in descending order of price
SELECT *
FROM Product
ORDER BY Price DESC;


-- 4. Display the total number of orders, the average amount,
--    the highest total amount and the lowest total amount
SELECT 
    COUNT(*) AS total_number_of_orders,
    AVG(total_amount) AS average_amount,
    MAX(total_amount) AS highest_total_amount,
    MIN(total_amount) AS lowest_total_amount
FROM `Orders`;


-- 5. For each product_id, display the number of orders
SELECT 
    Product_id,
    COUNT(*) AS number_of_orders
FROM `Orders`
GROUP BY Product_id;


-- 6. Display the customer_id which has more than 2 orders
SELECT 
    Customer_id
FROM `Orders`
GROUP BY Customer_id
HAVING COUNT(*) > 2;


-- 7. For each month of the 2020 year, display the number of orders
SELECT 
    MONTH(OrderDate) AS order_month,
    COUNT(*) AS number_of_orders
FROM `Orders`
WHERE YEAR(OrderDate) = 2020
GROUP BY MONTH(OrderDate)
ORDER BY order_month;


-- 8. For each order, display the product_name, the customer_name and the date of the order
SELECT 
    p.product_name,
    c.customer_Name,
    o.OrderDate
FROM `Orders` o
JOIN Product p
    ON o.Product_id = p.Product_id
JOIN Customer c
    ON o.Customer_id = c.Customer_id;


-- 9. Display all the orders made three months ago
-- This version displays orders from the calendar month that was exactly three months before today.
SELECT *
FROM `Orders`
WHERE YEAR(OrderDate) = YEAR(DATE_SUB(CURDATE(), INTERVAL 3 MONTH))
  AND MONTH(OrderDate) = MONTH(DATE_SUB(CURDATE(), INTERVAL 3 MONTH));


-- Alternative interpretation for question 9:
-- If the requirement means "orders made during the last three months", use this instead:
-- SELECT *
-- FROM `Orders`
-- WHERE OrderDate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH);


-- 10. Display customers who have never ordered a product
SELECT 
    c.Customer_id
FROM Customer c
LEFT JOIN `Orders` o
    ON c.Customer_id = o.Customer_id
WHERE o.Customer_id IS NULL;
