CREATE TABLE IF NOT EXISTS USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO USERS (username, email)
VALUES 
("example", "example@example.com"),
("Thomas A. Anderson", "neo@matrix.com");