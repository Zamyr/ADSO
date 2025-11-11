# AdSo - User Profile Management System

Full-stack application for managing user profiles built with Next.js 16, Express.js, and MySQL.

## 🚀 Quick Start (Desarrollo)

### Prerequisitos
- **Docker Desktop** (corriendo)
- **Node.js** 18+ (recomendado: v20 o v22) - opcional
- **npm** 10+ - opcional

---

## Opción 1: Todo en Docker (Recomendado para Testing)

```bash
# Un solo comando inicia todo
docker compose up --scale backend=3 -d
```

Esto inicia:
- ✅ Frontend en puerto 3000 (Next.js dev mode)
- ✅ MySQL en puerto 3306
- ✅ 3 instancias del backend (escalamiento horizontal)
- ✅ NGINX load balancer en puerto 8080

**URLs:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api`

⚠️ **Nota:** Next.js en modo desarrollo (`npm run dev`) dentro de Docker consume **muchos recursos** (CPU y RAM) y es más lento que correrlo localmente. Esta opción es útil para testing rápido o demos, pero no recomendada para desarrollo activo.

---

## Opción 2: Frontend Local + Backend en Docker (Recomendado para Desarrollo)

### Paso 1: Iniciar Backend en Docker

```bash
# Comenta el servicio 'frontend' en docker-compose.yml
# Luego ejecuta:
docker compose up --scale backend=3 -d
```

### Paso 2: Iniciar Frontend Localmente

```bash
cd frontend
npm install
npm run dev
```

**Ventajas:**
- ⚡ Hot reload instantáneo
- 🚀 Mucho más rápido
- 💻 Menor consumo de recursos
- 🔧 Mejor experiencia de desarrollo

---

## 🐳 Comandos Docker

```bash
# Iniciar todo (frontend + backend)
docker compose up --scale backend=3 -d

# Iniciar solo backend (sin frontend)
# Primero comenta el servicio 'frontend' en docker-compose.yml
docker compose up --scale backend=3 -d

# Iniciar backend (escalado a 5 instancias)
docker compose up --scale backend=5 -d

# Ver logs
docker compose logs -f backend
docker compose logs -f frontend

# Detener todo
docker compose down

# Ver contenedores corriendo
docker ps
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
