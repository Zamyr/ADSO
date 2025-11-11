# AdSo - User Profile Management System

Full-stack application for managing user profiles built with Next.js 14, Express.js, and MySQL.

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** (running)
- **Node.js** 18+ (v20 or v22 recommended)
- **npm** 10+

### One Command Setup

```bash
npm start
```

This will:
1. Install all dependencies (frontend + backend)
2. Start MySQL in Docker
3. Run frontend (http://localhost:3000) and backend (http://localhost:4000)
4. Frontend connects automatically to backend API

**Note:** The first run may take 2-3 minutes to install all dependencies.

### Manual Setup

```bash
# Install dependencies
npm run install:all

# Start MySQL
npm run docker:up

# Run both servers
npm run dev
```

## 📦 Project Structure

```
AdSo/
├── frontend/          # Next.js 14 app
├── backend/           # Express.js API
├── docker-compose.yml # MySQL configuration
└── package.json       # Root scripts
```

## 🛠️ Available Commands

### Root Commands
```bash
npm start              # Install & run everything
npm run dev            # Run frontend + backend + MySQL
npm run install:all    # Install all dependencies
npm run docker:up      # Start MySQL container
npm run docker:down    # Stop MySQL container
npm run docker:logs    # View MySQL logs
npm test:frontend      # Run frontend tests
npm test:backend       # Run backend tests
```

### Frontend (Next.js)
```bash
cd frontend
npm run dev            # Development server (port 3000)
npm run build          # Production build
npm test               # Run tests
```

### Backend (Express)
```bash
cd backend
npm run dev            # Development server (port 4000)
npm test               # Run tests
```

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **MySQL:** localhost:3306

## 🏗️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TanStack Query
- Tailwind CSS
- Jest + React Testing Library

### Backend
- Node.js + Express.js
- MySQL 8.0
- Jest + Supertest
- Repository Pattern
- Singleton Pattern

## 📚 Documentation

- [Frontend README](./frontend/README.md)
- [Backend Documentation](./backend/CLAUDE.md)
- [Frontend Documentation](./frontend/CLAUDE.md)

## 🧪 Testing

```bash
# Frontend tests (11 tests)
npm run test:frontend

# Backend tests (TDD implementation)
npm run test:backend
```

## 🐳 Docker

The project uses Docker only for MySQL to ensure consistency across environments.

```bash
# Start
docker compose up -d

# Stop
docker compose down

# Stop and remove data
docker compose down -v
```

## 🔧 Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=adso_profiles
PORT=4000
FRONTEND_URL=http://localhost:3000
```

## 👥 Author

**Zamyr** - [GitHub](https://github.com/Zamyr)

## 📝 License

MIT
