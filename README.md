# YourCarYourWay Chat Application (PoC)

## Description

This repository contains a proof of concept (PoC) for the chat functionality of the YourCarYourWay project. The PoC demonstrates real-time communication between a support agent and multiple clients using WebSocket technology. The application is composed of two main parts:

- **Frontend (a simple page written with JavaScript)**: A simple chat interface allowing users (clients and support agents) to send and receive messages.
- **Backend (Spring Boot)**: A WebSocket server handling real-time message transmission between users.

This PoC is designed to showcase the core functionality of the chat system without implementing other features such as users filter, private conversations, authentication, persistent storage, or comprehensive security measures.

## Project Structure

```
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── (Spring Boot backend code)
│   │   └── resources/
│   │       └── static/
│   │           └── (JavaScript frontend code)
└── README.md
    └── (this file)

```

## Technologies Used

- **Frontend**: JavaScript, HTML, CSS
- **Backend**: Spring Boot
- **WebSocket**: STOMP over WebSocket
- **Build Tools**: Maven

## Setup Instructions

### Prerequisites

- Java 21 or higher
- Maven 3.9.4 or higher

### Setup and Installation
1. Clone the repository
```bash
git clone https://github.com/davipro34/YourCarYourWay_Chat.git
```
```bash
cd YourCarYourWay_Chat
```

2. Build the project

```bash
mvn clean install
```

### Running the application

1. Run the following commands:

```bash
mvn spring-boot:run
```

2. Access the application:  
Open your web browser and navigate to http://localhost:8080. Enter a username to join the chat room.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
