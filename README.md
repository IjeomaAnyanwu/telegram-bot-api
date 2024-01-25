# Telegram Bot API

This API facilitates the integration with the Telegram API for managing bots through a backend system. The backend system registers bots, stores messages and user data, and facilitates the retrieval and sending of messages in response.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [1. Create Telegram Bot](#1-create-telegram-bot)
  - [2. Get Users Information](#2-get-users-information)
  - [3. Get Messages List](#3-get-messages-list)
  - [4. Send Message from Bot](#4-send-message-from-bot)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/IjeomaAnyanwu/telegram-bot-api.git
   ```
2. Install dependencies
   cd telegram-bot
   npm install

   Ensure you have the following dependencies installed:

   body-parse, dotenv, express, nodemon, pg, sequelize, telegram, tsc, typescript, @types/dotenv, @types/express, @types/node, @types/sequelize, ts-node
   Use the following command to install them:

   npm install body-parser dotenv express nodemon pg sequelize telegram tsc typescript @types/dotenv @types/express @types/node @types/sequelize ts-node --save

   Set up environment variables by creating a .env file in the root directory. Use the following template and replace placeholder values:

   API_ID=your_telegram_api_id
   API_HASH=your_telegram_api_hash
   STRING_SESSION=your_telegram_string_session
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token

## RUNNING THE PROJECT

To run the Telegram Bot API, use the following command:
npm start

## API ENDPOINTS

API Endpoints

1. Create Telegram Bot

Endpoint: POST /api/bot
Description: Creates and starts a Telegram bot.

REQUEST PARAMETER
botToken (string): The token of the Telegram bot.

RESPONSE
200 OK: The bot is successfully created, and the token is obtained

    {
        "botToken": "TELEGRAM_BOT_TOKEN"
    }

500 Internal Server Error: Internal server error.

2. GET USER INFORMATION
   Endpoint: GET /api/user/:username
   Description: Provides information about users interacting with the bot.

   RESPONSE: 200 OK - JSON with user list information.

{
"userId": 123,
"username": "user123",
"firstName": "John",
"lastName": "Doe"
},

3.  Get Messages List
    Endpoint: GET /api/message
    Description: Provides a list of messages from users to the bot.
    Response: JSON with a list of messages.

        [

    {
    "messageId": 1,
    "userId": 123,
    "text": "Hello, bot!"
    },
    {
    "messageId": 2,
    "userId": 456,
    "text": "How are you?"
    }
    ]

        4.  Send Message from Bot
            Endpoint: POST /api/message

            Request Parameters:
            userId (number, required): The user's identifier to whom the message will be sent.
            text (string, required): The text of the message to be sent to the user.
            Response:
            200 OK: The message is successfully sent to the user.

            {
                "message": "Message successfully sent to the user"
            }

            400 Bad Request: Validation error in the request (e.g., missing user identifier or message text).

            {
                "error": "Bad Request - Missing user identifier or message text"
            }

## CONTRIBUTING

Feel free to contribute to the project. Create a pull request with your changes.
