-- ExpertSoft Database
CREATE DATABASE expert_soft;
USE expert_soft;

-- Customers Table
CREATE TABLE customers (
id_customer INT AUTO_INCREMENT PRIMARY KEY,
customer_name VARCHAR (255) NOT NULL,
identity INT NOT NULL,
address VARCHAR (255) NOT NULL,
phone VARCHAR (255) NOT NULL,
email VARCHAR (255) UNIQUE NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

-- Bills Table
CREATE TABLE invoices (
id_invoice INT AUTO_INCREMENT PRIMARY KEY,
platform_used ENUM ('Nequi', 'Daviplata') DEFAULT NULL,
invoice_number VARCHAR (100) UNIQUE NOT NULL,
invoive_period DATE NOT NULL,
amount_paid INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Transactios Table
CREATE TABLE transactions (
id_transaction VARCHAR (100) PRIMARY KEY,
id_customer INT,
id_invoice INT,
date_and_time DATETIME NOT NULL,
amount INT NOT NULL,
state ENUM('Pendiente', 'Fallida', 'Completada') DEFAULT NULL,
transaction_type TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

FOREIGN KEY (id_customer) REFERENCES customers(id_customer) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (id_invoice) REFERENCES invoices(id_invoice) ON DELETE SET NULL ON UPDATE CASCADE
);