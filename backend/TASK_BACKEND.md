# 📋 TASK_BACKEND - Lista de Pasos (TDD)

## ✅ Estado: PENDIENTE

**Metodología:** Test-Driven Development (Red-Green-Refactor)

---

## 🎯 Fase 1: Setup Inicial del Proyecto

- [ ] **Paso 1**: Inicializar proyecto Node.js con npm init
- [ ] **Paso 2**: Instalar dependencias base (express, mysql2, dotenv, cors)
- [ ] **Paso 3**: Instalar dependencias de desarrollo (nodemon, jest, supertest, @types/jest)
- [ ] **Paso 4**: Configurar Jest (jest.config.js)
- [ ] **Paso 5**: Crear estructura de carpetas base (src, tests, database)
- [ ] **Paso 6**: Configurar .env y .env.example

---

## 🎯 Fase 2: Base de Datos MySQL

- [ ] **Paso 7**: Crear archivo schema.sql con tabla profiles
- [ ] **Paso 8**: Configurar Docker Compose para MySQL
- [ ] **Paso 9**: Crear archivo de configuración database.js (Singleton)
- [ ] **Paso 10**: Probar conexión a MySQL y crear DB de prueba

---

## 🎯 Fase 3: Repository Pattern (TDD)

- [ ] **Paso 11**: 🔴 Escribir tests para ProfileRepository.getAll()
- [ ] **Paso 12**: 🟢 Implementar ProfileRepository (Singleton) y getAll()
- [ ] **Paso 13**: 🔴 Escribir tests para ProfileRepository.getById()
- [ ] **Paso 14**: 🟢 Implementar getById()
- [ ] **Paso 15**: 🔴 Escribir tests para ProfileRepository.create()
- [ ] **Paso 16**: 🟢 Implementar create()
- [ ] **Paso 17**: 🔴 Escribir tests para ProfileRepository.update()
- [ ] **Paso 18**: 🟢 Implementar update()
- [ ] **Paso 19**: 🔵 Refactorizar Repository y agregar manejo de errores

---

## 🎯 Fase 4: Controllers (TDD)

- [ ] **Paso 20**: 🔴 Escribir tests para ProfileController.getAllProfiles()
- [ ] **Paso 21**: 🟢 Implementar ProfileController.getAllProfiles()
- [ ] **Paso 22**: 🔴 Escribir tests para ProfileController.getProfileById()
- [ ] **Paso 23**: 🟢 Implementar getProfileById()
- [ ] **Paso 24**: 🔴 Escribir tests para ProfileController.createProfile()
- [ ] **Paso 25**: 🟢 Implementar createProfile() con validaciones
- [ ] **Paso 26**: 🔴 Escribir tests para ProfileController.updateProfile()
- [ ] **Paso 27**: 🟢 Implementar updateProfile() con validaciones
- [ ] **Paso 28**: 🔵 Crear middleware de manejo de errores

---

## 🎯 Fase 5: Routes y Express (TDD)

- [ ] **Paso 29**: 🔴 Escribir tests de integración para GET /api/profiles
- [ ] **Paso 30**: 🟢 Definir rutas en profileRoutes.js
- [ ] **Paso 31**: 🟢 Configurar app.js (Express, CORS, middlewares)
- [ ] **Paso 32**: 🔴 Escribir tests para POST /api/profiles
- [ ] **Paso 33**: 🟢 Vincular ruta POST con controller
- [ ] **Paso 34**: 🔴 Escribir tests para GET /api/profiles/:id
- [ ] **Paso 35**: 🟢 Vincular ruta GET by ID
- [ ] **Paso 36**: 🔴 Escribir tests para PATCH /api/profiles/:id
- [ ] **Paso 37**: 🟢 Vincular ruta PATCH
- [ ] **Paso 38**: 🟢 Crear server.js y probar con nodemon
- [ ] **Paso 39**: 🔵 Verificar que todos los tests pasen

---

## 🎯 Fase 6: Integración con Frontend

- [ ] **Paso 40**: Actualizar .env con puerto 4000
- [ ] **Paso 41**: Probar endpoints con Frontend en localhost:3000
- [ ] **Paso 42**: Ajustar respuestas de API si es necesario
- [ ] **Paso 43**: Verificar flujo completo CRUD Frontend-Backend
- [ ] **Paso 44**: 🔴 Escribir tests de integración completos

---

## 🎯 Fase 7: Documentación y Finalización

- [ ] **Paso 45**: Crear README.md del backend
- [ ] **Paso 46**: Actualizar CLAUDE.md con decisiones finales
- [ ] **Paso 47**: Crear instrucciones de deployment
- [ ] **Paso 48**: Verificar cobertura de tests (objetivo: 80%+)
- [ ] **Paso 49**: Commit y push final

---

## 📝 Notas sobre TDD

- 🔴 **Red**: Test falla (funcionalidad no existe)
- 🟢 **Green**: Implementar código mínimo para pasar test
- 🔵 **Refactor**: Mejorar código sin romper tests
- Cada paso espera confirmación antes de continuar
- Los tests se escriben ANTES de la implementación
- Se siguen los patrones: Repository, Singleton, MVC
- Docker usado solo para MySQL
- Frontend ya está completo y listo para conectar

---

## 🔗 Conexión con Frontend

**Frontend esperando en:**
- URL base: `http://localhost:4000/api` (configurable en .env)
- Endpoints definidos en ProfileRepository.ts

**Backend debe responder:**
```json
GET /api/profiles → [ { id, username, email, bio, created_at } ]
GET /api/profiles/:id → { id, username, email, bio, created_at }
POST /api/profiles → { id: newId }
PATCH /api/profiles/:id → { message: "Profile updated" }
```

---

**Inicio:** 11 de noviembre de 2025
