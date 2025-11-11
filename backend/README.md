# Backend - AdSo User Profile API

REST API para gestión de perfiles de usuario construida con Node.js, Express y MySQL.

## Stack Tecnológico

- **Runtime:** Node.js v21.7.3
- **Framework:** Express.js v5.1.0
- **Base de Datos:** MySQL 8.0 (Docker)
- **Testing:** Jest + Supertest
- **Validación:** express-validator
- **Patrones:** Repository Pattern, Singleton Pattern, TDD

## Prerrequisitos

- Node.js 18+
- Docker Desktop (corriendo)
- MySQL en Docker (puerto 3306)

## Instalación

```bash
cd backend
npm install
```

## Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=adso_profiles
DB_NAME_TEST=adso_profiles_test
PORT=4000
FRONTEND_URL=http://localhost:3000
```

## Ejecución

### Desarrollo
```bash
npm run dev
```
El servidor estará disponible en: `http://localhost:4000`

### Producción
```bash
npm start
```

### Tests
```bash
npm test
```

## Endpoints API

### GET /api/profiles
Obtiene todos los perfiles.

**Response:**
```json
{
  "profiles": [
    {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "bio": "Software engineer",
      "created_at": "2025-11-11T00:00:00.000Z",
      "updated_at": "2025-11-11T00:00:00.000Z"
    }
  ]
}
```

### GET /api/profile/:id
Obtiene un perfil por ID.

**Response:**
```json
{
  "profile": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "Software engineer",
    "created_at": "2025-11-11T00:00:00.000Z",
    "updated_at": "2025-11-11T00:00:00.000Z"
  }
}
```

### POST /api/profile
Crea un nuevo perfil.

**Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "bio": "Optional bio"
}
```

**Response:** 201 Created
```json
{
  "profile": {
    "id": 5,
    "username": "newuser",
    "email": "newuser@example.com",
    "bio": "Optional bio"
  }
}
```

### PATCH /api/profile/:id
Actualiza un perfil existente.

**Body:**
```json
{
  "username": "updateduser",
  "email": "updated@example.com",
  "bio": "Updated bio"
}
```

**Response:** 200 OK
```json
{
  "profile": {
    "id": 1,
    "username": "updateduser",
    "email": "updated@example.com",
    "bio": "Updated bio"
  }
}
```

## Arquitectura

```
src/
  config/
    database.js          # Singleton - Connection Pool
  repositories/
    ProfileRepository.js # Repository Pattern - Data Access
  controllers/
    ProfileController.js # Business Logic
  routes/
    profileRoutes.js     # Route Definitions
  middlewares/
    validators.js        # express-validator
    errorHandler.js      # Centralized Error Handling
  app.js                 # Express App Configuration
  server.js              # Server Entry Point
```

## Testing

```bash
npm test
```

**Cobertura:**
- 6 tests unitarios (ProfileRepository)
- 7 tests unitarios (ProfileController)
- 10 tests de integración (API Routes)
- **Total: 23 tests pasando**

## Base de Datos

La base de datos se inicializa automáticamente con Docker Compose (desde la raíz del proyecto):

```bash
docker compose up -d
```

**Tabla profiles:**
```sql
CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Validaciones

### POST /api/profile
- `username`: Requerido, 3-255 caracteres
- `email`: Requerido, formato de email válido
- `bio`: Opcional, máximo 1000 caracteres

### PATCH /api/profile/:id
- `id`: Debe ser un entero positivo
- `username`: Opcional, 3-255 caracteres
- `email`: Opcional, formato de email válido
- `bio`: Opcional, máximo 1000 caracteres

## Códigos de Estado HTTP

- `200 OK` - Operación exitosa
- `201 Created` - Recurso creado exitosamente
- `400 Bad Request` - Datos inválidos o duplicados
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

## Autor

**Zamyr** - [GitHub](https://github.com/Zamyr)
