# Cheffest Backend Documentation

## Overview
Cheffest Backend is the server-side application that powers the Cheffest platform, handling authentication, user management, product listings, orders, and cart functionality. It is built using **Hono.js**, **TypeScript**, and **PostgreSQL** with **Prisma ORM**.

## Features
- User authentication (JWT-based)
- Product listing and categorization
- Cart and order management
- Secure API endpoints
- Middleware support for logging, authentication, and validation
- CORS enabled

## Tech Stack
- **Framework:** Hono.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Render.com
- **Testing:** Jest
- **Caching:** Redis (optional for performance optimization)

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS version)
- **Bun** (for runtime efficiency)
- **PostgreSQL**
- **Prisma CLI**

### Clone the Repository
```sh
git clone https://github.com/yourusername/cheffest-backend.git
cd cheffest-backend
```

### Install Dependencies
```sh
bun install
```

### Setup Environment Variables
Create a `.env` file and configure the following:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/cheffest
JWT_SECRET=your_jwt_secret
VITE_API_URL=http://localhost:3000
```

### Migrate Database
```sh
bun prisma migrate dev --name init
```

### Start the Server
```sh
bun run dev
```
The server will be running at `http://localhost:3000`.

## API Endpoints

### Authentication
#### Register a new user
```http
POST /auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

#### Login
```http
POST /auth/login
```
**Response:**
```json
{
  "token": "your_jwt_token"
}
```

### Products
#### Get all products
```http
GET /products
```

#### Get a product by ID
```http
GET /products/:id
```

### Cart
#### Add item to cart
```http
POST /cart/:productId
```
**Request Body:**
```json
{
  "sum": 1
}
```

### Orders
#### Place an order
```http
POST /orders
```

## Middleware
- **CORS**: Enabled via `cors()` middleware
- **JWT Authentication**: Applied to protected routes
- **Error Handling**: Centralized error handling for API consistency

## Deployment

### Build and Run in Production
```sh
bun run build
bun start
```

### Deploy to Render
1. Push your code to GitHub.
2. Connect the repository to Render.com.
3. Set up environment variables in Render.
4. Deploy and monitor logs.

## Testing
Run unit tests with Jest:
```sh
bun test
```

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---
Feel free to update this documentation as the project evolves. 🚀

