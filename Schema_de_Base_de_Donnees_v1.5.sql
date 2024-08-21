CREATE DATABASE IF NOT EXISTS YourCarYourWay;
USE YourCarYourWay;

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(100) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    birthDate DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    userType ENUM('client', 'support', 'commercial', 'admin') NOT NULL
);

CREATE TABLE Agency (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE Vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    dailyRate DOUBLE NOT NULL,
    agency_id INT,
    FOREIGN KEY (agency_id) REFERENCES Agency(id)
);

CREATE TABLE Payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DOUBLE NOT NULL,
    paymentDate DATE NOT NULL,
    method VARCHAR(50) NOT NULL
);

CREATE TABLE Reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    amount DOUBLE NOT NULL,
    status VARCHAR(50) NOT NULL,
    user_id INT,
    vehicle_id INT,
    agency_id INT,
    payment_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicle(id),
    FOREIGN KEY (agency_id) REFERENCES Agency(id),
    FOREIGN KEY (payment_id) REFERENCES Payment(id)
);

CREATE TABLE Conversation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('open', 'closed') NOT NULL
);

CREATE TABLE User_Conversation (
    user_id INT NOT NULL,
    conversation_id INT NOT NULL,
    PRIMARY KEY (user_id, conversation_id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (conversation_id) REFERENCES Conversation(id)
);

CREATE TABLE Message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    messageType ENUM('CHAT', 'LEAVE', 'JOIN') NOT NULL,
    sender_id INT,
    conversation_id INT NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES User(id),
    FOREIGN KEY (conversation_id) REFERENCES Conversation(id)
);
