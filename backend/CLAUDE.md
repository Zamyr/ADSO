# Notas de Desarrollo - Backend API

## ✅ PROYECTO COMPLETADO - 11 de noviembre de 2025

## 🔍 Consultas y Problemas Resueltos

Este archivo documenta dudas específicas, errores encontrados y consultas realizadas durante el desarrollo.

**Resultado final:** 23/23 tests pasando | Integración Frontend-Backend funcionando

---

## ❓ Consulta 1: Consistencia arquitectónica Frontend-Backend

**Pregunta:** "Implementé Repository Pattern en el frontend con TypeScript. ¿Cómo mantengo la misma arquitectura en el backend pero adaptada a las necesidades del servidor (conexión a BD, manejo de transacciones)?"

**Decisión tomada:**
- Mantener Repository Pattern para consistencia
- Agregar capa de Controllers para lógica de negocio (separar de routes)
- Singleton para pool de conexiones MySQL (evitar múltiples instancias)

**Implementado:** ✅ Estructura de carpetas con separación clara de responsabilidades

---

## ❓ Consulta 2: ¿mysql2 o Sequelize?

**Contexto:** No estoy seguro si usar un ORM completo o queries directas

**Pregunta:** "Para un proyecto pequeño (4 endpoints CRUD), ¿vale la pena Sequelize o mejor mysql2 directo?"

**Respuesta útil:** mysql2 es suficiente. Sequelize agrega complejidad innecesaria para este caso. Puedo usar Promises con `.promise()`.

**Decisión:** Usar mysql2 con promises

---

## ❓ Consulta 3: Connection Pooling con mysql2

**Problema:** ¿Usar `mysql2/promise` directamente o crear un Singleton con pool de conexiones?

**Pregunta específica:** "Para un API REST con múltiples requests concurrentes, ¿es mejor usar un pool de conexiones compartido (Singleton) o crear conexiones on-demand?"

**Respuesta consultada:** Pool de conexiones es más eficiente:
```javascript
import mysql from 'mysql2/promise';

class Database {
  static instance;
  constructor() {
    this.pool = mysql.createPool({ /* config */ });
  }
  static getInstance() { /* singleton */ }
}
```

**Por implementar:** Pendiente en paso 9

---

## 🐛 Error 1: Jest con ES Modules

**Problema encontrado:** Al correr `npm test` me da error: "Cannot use import statement outside a module"

**Pregunta:** "¿Cómo configuro Jest para que funcione con ES6 modules en Node.js?"

**Solución aplicada:**
1. En `package.json` agregué: `"type": "module"`
2. Comando de test: `node --experimental-vm-modules node_modules/jest/bin/jest.js`
3. En `jest.config.js`: `transform: {}` (sin transformaciones)

**Estado:** ✅ Resuelto

---

## ❓ Consulta 4: Testing de base de datos en TDD

**Problema:** Al hacer TDD con una base de datos real, ¿cómo evitar que los tests interfieran entre sí?

**Pregunta:** "¿Uso base de datos en memoria (sqlite) para tests o una instancia separada de MySQL? ¿Cómo manejo rollback después de cada test?"

**Estrategia decidida:**
1. Base de datos de prueba separada (`DB_NAME_TEST`)
2. Limpiar tablas con `TRUNCATE` antes de cada test suite
3. Usar transacciones con rollback para tests unitarios
4. Supertest para tests de integración sin levantar servidor

**Estado:** Por aplicar en fase de testing

---

## 🐛 Error 2: Conexión a MySQL en Docker

**Problema:** Error "ECONNREFUSED 127.0.0.1:3306" al conectar desde Node.js

**Pregunta:** "¿Por qué no puedo conectarme a MySQL en Docker?"

**Debugging realizado:**
1. Verificar que el contenedor esté corriendo: `docker ps`
2. Revisar puerto expuesto: debe ser `3306:3306`
3. Usar `host: 'localhost'` (no '127.0.0.1')
4. Verificar credenciales en `.env`

**Pendiente:** Configurar Docker Compose

---

## ❓ Consulta 5: Validaciones en Express

**Problema:** No quiero validar manualmente en cada controller

**Pregunta:** "¿Cómo valido request body en Express de forma limpia?"

**Respuesta útil:** express-validator permite validar en las rutas:
```javascript
import { body, validationResult } from 'express-validator';

router.post('/profiles',
  body('email').isEmail(),
  body('username').isLength({ min: 3 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    // continuar
  }
);
```

**Estado:** Por implementar

---

## 📚 Recursos Consultados

**Documentación oficial:**
- Express.js docs para routing y middleware
- MySQL2 docs para sintaxis de queries con promises
- Express Validator docs para ejemplos de validación

**Stack Overflow:**
- "How to use ES modules with Jest" (problema de imports)
- "MySQL connection pooling best practices"
- "Express error handling middleware pattern"

---

## ✅ Checklist de Progreso

**Setup completado:**
- [x] npm init y package.json configurado
- [x] Dependencias instaladas (express, mysql2, dotenv, cors)
- [x] DevDependencies instaladas (jest, supertest, nodemon)
- [x] Jest configurado con ES modules
- [x] Estructura de carpetas creada
- [x] Variables de entorno (.env y .env.example)

**Pendiente:**
- [x] Schema SQL para tabla profiles ✅
- [x] Docker Compose para MySQL ✅
- [x] Singleton para conexión DB ✅
- [x] Repository Pattern implementation ✅
- [x] Tests para Repository (6 tests pasando) ✅
- [x] Controller con validaciones (7 tests pasando) ✅
- [x] Routes y Express app ✅
- [x] Tests de integración (10 tests pasando) ✅
- [x] Conectar con frontend ✅

---

## 💭 Notas Personales

- TDD fue más lento al inicio pero ahorró debugging después ✅
- Repository Pattern funcionó excelente - código más limpio y testeable
- `.env` agregado a `.gitignore` correctamente
- mysql2 fue la decisión correcta: simplicidad sin overhead de ORM
- Custom mocks funcionaron mejor que jest.fn() con ES modules
- Timestamps únicos en tests evitaron conflictos de duplicados
- Singleton Pattern garantizó una única instancia del pool de conexiones

---

## 🎯 Decisiones Técnicas Finales

**Arquitectura:**
- Repository Pattern para acceso a datos
- Singleton Pattern para Database connection pool
- MVC con separación clara (Routes → Controller → Repository)
- Middleware de validación con express-validator
- Manejo centralizado de errores

**Testing:**
- 23 tests totales (100% cobertura de funcionalidad)
- TDD Red-Green-Refactor aplicado consistentemente
- Integration tests con supertest (sin server.listen())
- Unit tests con custom mocks para ES modules

**Integración:**
- CORS configurado para localhost:3000
- API REST en localhost:4000
- Docker Compose para MySQL 8.0
- Comando unificado `npm start` para desarrollo completo

---

**Última actualización:** 11 de noviembre de 2025  
**Estado actual:** Setup completado, comenzando fase de base de datos
