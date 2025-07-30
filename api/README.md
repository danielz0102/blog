# Blog API

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](#)
[![Node.js](https://img.shields.io/badge/Node.js->=18-3c873a?style=flat-square)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![License](https://img.shields.io/badge/License-ISC-yellow?style=flat-square)](#)

A modern, layered RESTful API for blog management built with Express.js, Prisma ORM, and PostgreSQL. Features JWT authentication, role-based authorization, and comprehensive validation with Zod schemas.

[Getting Started](#getting-started) • [API Reference](#api-reference) • [Development](#development) • [Database](#database) • [Architecture](#architecture)

## Overview

This blog API implements a clean layered architecture with strict separation of concerns: **Routes → Middlewares → Controllers → Models → Database**. The application supports user management, blog posts with draft functionality, and a commenting system with proper authentication and authorization.

### Key Features

- **Modern Architecture**: Layered Express.js application with ES modules and path aliases
- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Data Validation**: Comprehensive request validation using Zod schemas
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **Draft System**: Posts can be saved as drafts (admin-only visibility)
- **Comment System**: Users can comment on published posts
- **Admin Controls**: Administrative privileges for content management

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org) database
- [pnpm](https://pnpm.io) package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/danielz0102/blog-api.git
   cd blog-api
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Configure the following variables in `.env`:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"
   JWT_SECRET="your-secret-key"
   PORT=3000
   NODE_ENV=development
   SALT=10
   ```

4. Set up the database:

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev --name "initial_migration"

   # Seed the database (optional)
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

The API will be available at `http://localhost:3000`.

## API Reference

### Authentication

All authenticated endpoints require a `Authorization: Bearer <token>` header.

### Users

| Method | Endpoint          | Description         | Auth Required | Admin Only |
| ------ | ----------------- | ------------------- | ------------- | ---------- |
| `POST` | `/users/register` | Register a new user | ❌            | ❌         |
| `POST` | `/users/login`    | Login user          | ❌            | ❌         |
| `GET`  | `/users/profile`  | Get user profile    | ✅            | ❌         |

### Posts

| Method   | Endpoint        | Description         | Auth Required | Admin Only |
| -------- | --------------- | ------------------- | ------------- | ---------- |
| `GET`    | `/posts`        | Get published posts | ❌            | ❌         |
| `GET`    | `/posts/drafts` | Get draft posts     | ✅            | ✅         |
| `GET`    | `/posts/:id`    | Get specific post   | ❌            | ❌         |
| `POST`   | `/posts`        | Create new post     | ✅            | ✅         |
| `PUT`    | `/posts/:id`    | Update post         | ✅            | ✅         |
| `DELETE` | `/posts/:id`    | Delete post         | ✅            | ✅         |

### Comments

| Method   | Endpoint        | Description             | Auth Required | Admin Only |
| -------- | --------------- | ----------------------- | ------------- | ---------- |
| `GET`    | `/comments`     | Get comments for a post | ❌            | ❌         |
| `POST`   | `/comments`     | Create new comment      | ✅            | ❌         |
| `PUT`    | `/comments/:id` | Update comment          | ✅            | ✅         |
| `DELETE` | `/comments/:id` | Delete comment          | ✅            | ✅         |

### Query Parameters

- **Posts**: `?page=1&limit=10&search=term` - Pagination and search
- **Comments**: `?postId=uuid` - Filter comments by post

## Development

### Available Scripts

```bash
pnpm dev         # Start development server with auto-reload
pnpm start       # Start production server
pnpm lint        # Run ESLint
pnpm format      # Format code with Prettier
```

### Database Commands

```bash
# View and edit data in browser
npx prisma studio

# Create and apply new migration
npx prisma migrate dev --name "description"

# Reset database (development only)
npx prisma migrate reset

# Check migration status
npx prisma migrate status

# Generate Prisma client after schema changes
npx prisma generate
```

### Project Structure

```
blog-api/
├── app.js                 # Application entry point
├── config/                # Configuration files
├── controllers/           # Business logic layer
├── middlewares/           # Express middlewares
├── models/                # Database operations layer
├── routes/                # API route definitions
├── lib/                   # Utilities and schemas
│   └── schemas/           # Zod validation schemas
└── prisma/                # Database schema and migrations
```

## Database

The application uses PostgreSQL with Prisma ORM. The database schema includes:

- **Users**: Authentication and user profiles with admin roles
- **Posts**: Blog posts with draft/published status
- **Comments**: User comments linked to posts

### Entity Relationships

```
Users (1) ←→ (M) Comments
Posts (1) ←→ (M) Comments
```

All entities use UUID primary keys for better security and distribution.

## Architecture

### Layered Architecture

The application follows a strict layered architecture pattern:

1. **Routes**: Define API endpoints and apply middlewares
2. **Middlewares**: Handle cross-cutting concerns (auth, validation, etc.)
3. **Controllers**: Process requests and coordinate business logic
4. **Models**: Encapsulate database operations
5. **Database**: Prisma ORM with PostgreSQL

### Key Patterns

- **Path Aliases**: Clean imports using `#controllers/`, `#models/`, etc.
- **Middleware Chain**: `onlyAdmin → validate → controller`
- **Error Handling**: Global error handler with consistent response format
- **Validation**: Zod schemas for type-safe request validation

### Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-based Access**: Admin-only operations for content management
- **Input Validation**: Comprehensive request validation and sanitization

## Example Usage

### Register and Login

```bash
# Register a new user
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securepassword123"}'

# Login
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securepassword123"}'
```

### Create a Post (Admin Only)

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my blog post...",
    "isDraft": false
  }'
```

### Get Published Posts

```bash
curl http://localhost:3000/posts?page=1&limit=5
```

> [!NOTE]
> Draft posts are only visible to administrators. Regular users can only see published posts through the public endpoints.

## Troubleshooting

### Common Issues

- **Database Connection**: Ensure PostgreSQL is running and `DATABASE_URL` is correct
- **Migration Errors**: Run `npx prisma migrate reset` in development to reset the database
- **Authentication Issues**: Verify `JWT_SECRET` is set and tokens are valid
- **Port Conflicts**: Change the `PORT` environment variable if 3000 is in use

For more detailed information, check the [architecture documentation](.github/copilot-instructions.md) and the [data model documentation](docs/DATA_MODEL.md).
