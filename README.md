# Trail Guide

Trail Guide is a full-stack backend recap project from the **neuefische Advanced Software Development with AI Bootcamp**.

The project combines concepts from the backend module into one Express application:

- Express routing and middleware
- MVC architecture
- Nunjucks server-side rendering
- SQLite database integration
- REST API development
- HTML form-based administration

The application provides three interfaces backed by the same database and model layer:

- **Public website** — browse hiking trails and regions
- **Admin panel** — manage trails through HTML forms
- **REST API** — access and modify trail data programmatically

## Tech Stack

- Node.js
- TypeScript
- Express 5
- Nunjucks
- SQLite
- Pico.css
- Bun
- ESLint
- Prettier

## Features

### Public Website

Visitors can:

- View all available trails
- View trail details
- Browse regions
- View trails by region

Pages are rendered server-side using Nunjucks templates and share a common layout.

### Admin Panel

Administrators can manage trails through a browser interface:

- List trails
- Create trails
- Edit trails
- Delete trails

The admin interface uses HTML forms and redirects after successful operations.

### REST API

The API is available under `/api`.

Implemented endpoints include:

- Read trails and regions
- Filter trails
- Create trails
- Update trails
- Delete trails

Write operations are protected with an API key header.

## Database

The application uses SQLite with a one-to-many relationship:

```
regions
  |
  | 1:n
  |
trails
```

Trail queries use SQL joins to include region information together with trail data.

## Project Structure

```
.
├── .github/          # Issue/PR templates, CI workflows
├── data/             # SQLite database + seed script
├── public/           # Static assets (CSS, images, favicon)
├── src/
│   ├── app.ts         # Express app entry point
│   ├── controllers/    # Route handlers (admin/public)
│   ├── db/             # Database connection
│   ├── middleware/     # Express middleware (logging, etc.)
│   ├── models/         # Data access layer (trails, regions)
│   ├── routes/         # Route definitions
│   └── views/          # Nunjucks templates (layouts, partials, pages)
└── tsconfig.json
```

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Seed the database:

```bash
npm run db:seed
```

## Environment Variables

The application expects:

```
PORT=3000
DB_PATH=./data/trail-guide.db
API_KEY=your-secret-key
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server with Bun watch mode |
| `npm run build` | Build production bundle |
| `npm run start` | Run production build |
| `npm run db:seed` | Seed SQLite database |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run format:check` | Check formatting with Prettier |
| `npm run format:write` | Format files with Prettier |

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

## Learning Context

This project is a recap application combining the following backend concepts:

- Express application structure
- MVC separation
- Middleware lifecycle
- Database models
- SQL queries and relationships
- Server-side rendering
- API design
- Authentication middleware

It was built as part of the backend module of the neuefische Advanced Software Development with AI Bootcamp.
