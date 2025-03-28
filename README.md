Auth0 Authentication System

A React.js frontend with Auth0 authentication and Node.js backend that sends authentication tokens via email.

## Features

- Auth0 authentication in React.js
- Token validation in Node.js backend
- Email sending with Nodemailer
- Bootstrap UI

## Setup

### Prerequisites

- Node.js 14+
- Auth0 account
- Email service credentials (Gmail, SendGrid, etc.)

### Installation

1. Clone the repository
2. Set up frontend:
   ```bash
   cd client
   npm install
   cp .env.example .env.local

   Set up backend:

bash
Copy
cd server
npm install
cp .env.example .env
Configure Auth0 and email credentials in the respective .env files

Running Locally
Start backend:

bash
Copy
cd backend
node server.js
Start frontend:

bash
Copy
cd frontend
npm start
Visit http://localhost:3000

Configuration
Auth0
Create a Regular Web Application in Auth0

Configure:

Allowed Callback URLs: http://localhost:3000/api/auth/callback

Allowed Logout URLs: http://localhost:3000

Allowed Web Origins: http://localhost:3000


