START TRANSACTION;

-- ***** create new database *****
CREATE DATABASE WebDevelopment;

-- ***** create tables *****
USE WebDevelopment;

-- admin table
CREATE TABLE Admin
(
	admin_id VARCHAR(20) NOT NULL CHECK(admin_id != ''),
	admin_password VARCHAR(18) NOT NULL,
	
	PRIMARY KEY(admin_id)
);

-- customer table
CREATE TABLE Customer
(
	customer_id VARCHAR(20) NOT NULL check(customer_id != ''),
	customer_password VARCHAR(18) NOT NULL,
	customer_phone VARCHAR(15),
	customer_address VARCHAR(100),
	
	PRIMARY KEY(customer_id)
);

-- merchant table
CREATE TABLE Merchant
(
	merchant_id varchar(20) NOT NULL check(merchant_id != ''),
	merchant_password VARCHAR(18) NOT NULL,
	merchant_phone VARCHAR(15),
	merchant_description VARCHAR(100),
	
	PRIMARY KEY(merchant_id)
);

-- product table
CREATE TABLE Product
(
	product_id VARCHAR(20) NOT NULL CHECK(product_id != ''),
	merchant_id VARCHAR(20) NOT NULL,
	product_price FLOAT NOT NULL CHECK(product_price > 0),
	description VARCHAR(100),

	PRIMARY KEY(product_id),
	FOREIGN KEY(merchant_id) REFERENCES Merchant(merchant_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- order table
CREATE TABLE Orders
(
	order_id INT NOT NULL,
	customer_id VARCHAR(20) NOT NULL,
	image_path VARCHAR(50) NULL,	

	PRIMARY KEY(order_id),
	FOREIGN KEY(customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- order-product TABLE
CREATE TABLE Order_Product
(
	order_id INT NOT NULL,
	product_id VARCHAR(20) NOT NULL,

	PRIMARY KEY(order_id,product_id),
	FOREIGN KEY(order_id) REFERENCES Orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(product_id) REFERENCES Product(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- ***** init table ***
INSERT INTO Admin(admin_id, admin_password)
VALUES('admin','admin');

COMMIT;
