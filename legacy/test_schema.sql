CREATE SCHEMA IF NOT EXISTS my_schema;
USE my_schema;

CREATE TABLE IF NOT EXISTS mytable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    age INT
);

INSERT INTO mytable (name, age) VALUES ('Austin Adair', 27);

SELECT * FROM mytable;