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

- Java and Maven installed for the backend.

### Running the application

Navigate to the `back` directory and run the following commands:

```bash
cd back
mvn clean install
mvn spring-boot:run
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
