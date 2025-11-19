Notes API

A simple RESTful API for creating, reading, updating, and deleting notes. Built with Node.js, Express, and PostgreSQL.

Features

User authentication with JSON Web Tokens (JWT)

Create, view, update, and delete notes

PostgreSQL database integration

Secure environment variable configuration

Tech Stack

Node.js

Express

PostgreSQL

JWT (for authentication)

Requirements

Node.js and npm installed

PostgreSQL running locally or a hosted PostgreSQL service

A .env file containing:

PORT=3000
DATABASE_URL=<your connection string>
JWT_SECRET=<your secret>

Getting Started
Clone the repository
git clone <your-repo-url>
cd <project-folder>

Install dependencies
npm install

Set up environment variables

Create a .env file in the root directory and fill in the required values.

Start the server
npm start

The server will run on http://localhost:3000 unless specified otherwise.

API Endpoints
Authentication

POST /api/auth/register — register a new user

POST /api/auth/login — log in and receive a JWT token

Notes

All notes routes require authentication (send token via Authorization header).

GET /api/notes — get all notes for the authenticated user

POST /api/notes — create a new note

GET /api/notes/:id — get a single note

PUT /api/notes/:id — update a note

DELETE /api/notes/:id — delete a note

Database Schema
users
column type
id SERIAL PRIMARY KEY
username VARCHAR(255)
password TEXT
notes
column type
id SERIAL PRIMARY KEY
user_id INTEGER NOT NULL
title VARCHAR(255)
content TEXT
License

MIT License.
