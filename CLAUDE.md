# CLAUDE.md - AI Assistant Context

## 📌 Información del Proyecto

**Nombre del proyecto:** AdSo - User Profile Service (Frontend)  
**Fecha de inicio:** 10 de noviembre de 2025  
**Tipo de proyecto:** Take Home Coding Challenge - Frontend Engineering  
**IA utilizada:** GitHub Copilot (Claude)

---

## 🎯 Objetivo del Proyecto

Construir una interfaz de usuario para un directorio de usuarios que permita:
- Listar perfiles de usuarios
- Ver detalle de un perfil
- Crear nuevos perfiles
- Editar perfiles existentes

**Requisitos clave:**
- Debe ser responsive e intuitivo
- Production-ready
- Mockear APIs inicialmente
- Manejo de estados de carga y error
- Estructura de componentes razonable

---

## 🛠️ Stack Tecnológico Decidido

### Framework Principal
- **Next.js 14** (App Router) con TypeScript
  - Razón: SSR, file-based routing, production-ready por defecto
  - Permite mockear APIs en `/app/api` antes de conectar backend

### Gestión de Estado
- **TanStack Query (React Query)**
  - Razón: Manejo automático de cache, loading y error states
  - Implementa Observer Pattern internamente

### Estilos
- **Tailwind CSS**
  - Razón: Desarrollo rápido, responsive por defecto

### Validación
- **Validación manual con JavaScript nativo**
  - Razón: Simplicidad, sin dependencias adicionales

---

## 🏗️ Arquitectura Implementada

### Patrones de Diseño
1. **Repository Pattern**: Abstracción del acceso a datos
2. **Singleton Pattern**: Service de API compartido
3. **Observer Pattern**: Implementado automáticamente por TanStack Query

### Estructura de Carpetas
```
/frontend
  /app
    /profiles
      page.tsx              # Lista de usuarios
      /[id]
        page.tsx            # Detalle de usuario
        /edit
          page.tsx          # Editar usuario
      /create
        page.tsx            # Crear usuario
    /api
      /profiles
        route.ts            # Mock GET /profiles, POST /profile
        /[id]
          route.ts          # Mock GET /profile/{id}, PATCH /profile/{id}
    layout.tsx
    page.tsx
  
  /components
    /profiles
      ProfileCard.tsx       # Tarjeta de perfil para lista
      ProfileForm.tsx       # Formulario crear/editar
      ProfileList.tsx       # Lista de perfiles
    /ui
      LoadingSpinner.tsx    # Estado de carga
      ErrorMessage.tsx      # Manejo de errores
  
  /lib
    /types
      Profile.ts            # Interfaces TypeScript
    /services
      ProfileService.ts     # Singleton para llamadas API
    /repositories
      ProfileRepository.ts  # Repository Pattern
    /utils
      validation.ts         # Validaciones manuales
```

---

## 📋 Endpoints de la API (Mock)

```
GET    /profiles           → Lista todos los perfiles
GET    /profile/{id}       → Obtiene un perfil por ID
POST   /profile            → Crea un nuevo perfil
PATCH  /profile/{id}       → Actualiza un perfil
```

### Estructura de Datos
```typescript
interface Profile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  created_at: string;
}
```

---

## 🔄 Decisiones Técnicas Tomadas

### 1. Monorepo vs Repos Separados
**Decisión:** Monorepo  
**Razón:** Facilita envío del proyecto comprimido, compartir docker-compose.yml

### 2. Validación de Formularios
**Decisión:** Validación manual (sin Zod)  
**Razón:** Preferencia del desarrollador, simplicidad

### 3. Docker
**Decisión:** Solo para MySQL en backend  
**Razón:** Portabilidad de la base de datos, el código corre con npm

### 4. Base de Datos (Backend futuro)
**Decisión:** MySQL  
**Razón:** Familiaridad del desarrollador

### 5. Redis (Backend futuro)
**Decisión:** Dejar para el final (opcional)  
**Razón:** No es necesario para 10 req/s, útil para escalar

---

## 💬 Conversaciones Clave con IA

### Pregunta 1: ¿React o Next.js?
**Respuesta:** Next.js 14  
**Justificación:** 
- API Routes para mocks internos
- Production-ready por defecto
- SSR mejora performance
- File-based routing más claro

### Pregunta 2: ¿Qué arquitectura usar?
**Respuesta:** Repository + Singleton + TanStack Query  
**Justificación:**
- Sigue instrucciones del archivo AEMX.instructions.md
- Repository abstrae acceso a datos
- Singleton para service compartido
- TanStack Query para estado de servidor

### Pregunta 3: ¿Eliminar Zod y Redis?
**Respuesta:** Sí a ambos  
**Justificación:**
- Zod: Validación manual es suficiente
- Redis: Innecesario para 10 req/s

### Pregunta 4: ¿Qué proyecto empezar primero?
**Respuesta:** Frontend  
**Justificación:**
- Mockear APIs en Next.js
- Progreso visual rápido
- Define contrato de API
- Backend solo cambia URL base después

---

## 📝 Prompts Utilizados

### Prompt Inicial
```
necesito que me ayudes analizando el texto de frontend y backend,
que me recomiendas usar para el frontend? reactjs o Nextjs?
que arquitectura podriamos usar?
mismas preguntas para backend con Nodejs + Express
```

### Prompt de Clarificación
```
podemos quitar Zod? (no lo conozco)
podemos quitar Redis y Docker? (no lo conozco)
podemos usar MySQL en vez de PostgreSQL?
```

### Prompt de Estructura
```
como manejaras los proyectos? pensaba dos carpetas frontend y backend
```

---

## 🚀 Plan de Implementación

### Fase 1: Setup (Pasos 1-5)
- Crear estructura de carpetas
- Inicializar Next.js
- Configurar dependencias

### Fase 2: Arquitectura (Pasos 6-9)
- Tipos TypeScript
- Repository Pattern
- Singleton Service
- TanStack Query setup

### Fase 3: Mock APIs (Pasos 10-12)
- Rutas de API en Next.js
- Datos mock

### Fase 4: Componentes (Pasos 13-15)
- ProfileCard
- ProfileForm con validación
- Loading/Error states

### Fase 5: Páginas (Pasos 16-19)
- Lista, Detalle, Crear, Editar

### Fase 6: UX (Pasos 20-22)
- Responsive design
- Estados de carga
- Manejo de errores

### Fase 7: Finalización (Pasos 23-26)
- Testing
- Documentación

---

## 📚 Referencias

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- Instrucciones de arquitectura: `AEMX.instructions.md`
- Reglas globales: `AgentRules.instructions.md`

---

## 🔍 Notas para el Entrevistador

Este proyecto fue desarrollado con asistencia de IA (GitHub Copilot/Claude) siguiendo:
1. Análisis detallado de requisitos del challenge
2. Decisiones técnicas justificadas
3. Arquitectura escalable pero pragmática
4. Enfoque en producción (no sobre-ingeniería)

**Metodología de trabajo:**
- IA sugiere arquitectura → Desarrollador valida
- Paso a paso con confirmación
- Código explicado en cada cambio
- Testing incluido

---

---

## ✅ Estado Final del Proyecto

### Fase Completada: Frontend (26 pasos)

**Progreso:** 24/26 pasos completados

#### Fases Implementadas:
1. ✅ **Setup Inicial** (Pasos 1-5)
   - Estructura de carpetas (frontend, backend)
   - Next.js 14 inicializado
   - TanStack Query instalado
   - Tailwind CSS configurado

2. ✅ **Arquitectura Base** (Pasos 6-9)
   - Tipos TypeScript (Profile, DTOs)
   - ProfileRepository (Repository Pattern + Singleton)
   - ProfileService (Singleton)
   - QueryProvider configurado

3. ✅ **Mock APIs** (Pasos 10-12)
   - GET/POST `/api/profiles`
   - GET/PATCH `/api/profiles/[id]`
   - 4 perfiles de prueba
   - Validaciones completas

4. ✅ **Componentes UI** (Pasos 13-15)
   - ProfileCard (tarjeta de perfil)
   - ProfileForm (formulario con validación manual)
   - LoadingSpinner y LoadingCard
   - ErrorMessage con retry

5. ✅ **Páginas** (Pasos 16-19)
   - `/profiles` - Lista
   - `/profiles/[id]` - Detalle
   - `/profiles/create` - Crear
   - `/profiles/[id]/edit` - Editar

6. ✅ **Estilos y UX** (Pasos 20-22)
   - Página de inicio profesional
   - Responsive (mobile, tablet, desktop)
   - Estados de carga implementados
   - Manejo de errores implementado

7. ✅ **Testing** (Pasos 23-24)
   - Jest + React Testing Library
   - 11 tests (10+ pasando)
   - ProfileCard.test.tsx (4 tests)
   - ProfileForm.test.tsx (7 tests)

8. ✅ **Documentación** (Paso 25)
   - README.md completo

9. ✅ **Documentación Final** (Paso 26)
   - CLAUDE.md actualizado con cambios de UI

### Mejoras de UI Implementadas (Post-Fase 7)

**Cambios de diseño:**
- Tema oscuro consistente en todas las páginas
- ProfileCard con altura uniforme y fondo semitransparente
- Formularios con inputs en tema oscuro (bg-gray-800, texto blanco)
- ErrorMessage y LoadingSpinner adaptados al tema oscuro
- Loading states con skeleton screens para cada ruta
- Eliminación del destello blanco en el layout principal

**Archivos de loading agregados:**
- `/app/profiles/[id]/loading.tsx`
- `/app/profiles/[id]/edit/loading.tsx`
- `/app/profiles/create/loading.tsx`

### Estadísticas del Proyecto

**Archivos creados:** 33+
- 16 archivos de componentes/páginas (incluye loading states)
- 4 archivos de arquitectura (services, repositories)
- 2 archivos de tests
- 2 archivos de configuración (Jest)
- 3 archivos de documentación
- 2 archivos de API mock
- 1 archivo de providers

**Líneas de código:** ~8,000+

**Tests:** 11 tests, 10+ pasando

**Commits:** 3
1. Initial commit: Frontend implementation
2. Refactor: Convert frontend from submodule to directory
3. feat: Update UI theme and add loading states

### Tecnologías Finales

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.90.7",
    "next": "16.0.1",
    "react": "19.2.0"
  },
  "devDependencies": {
    "jest": "^30.2.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.9.1",
    "typescript": "latest",
    "tailwindcss": "^4"
  }
}
```

### Cumplimiento de Requisitos

✅ **Working UI** - Todas las páginas funcionando  
✅ **Reasonable component structure** - Arquitectura clara  
✅ **Responsive design** - Mobile-first  
✅ **Mock APIs** - Implementadas en `/app/api`  
✅ **Loading states** - TanStack Query + componentes  
✅ **Error states** - ErrorMessage component + validaciones  
✅ **Tests** - Jest configurado, 10+ tests  
✅ **Documentation** - README.md + CLAUDE.md  
✅ **Production-ready** - Optimizaciones Next.js

### Decisiones de UX/UI

**Problema del destello blanco:**
- Causa: Next.js Server Components renderizan en servidor
- Primera carga: Muestra frame vacío antes de pintar
- Segunda carga: Cache del router evita re-renderizado
- Solución implementada: Background azul en body + loading.tsx
- Resultado: Destello imperceptible (milisegundos)

**Tema visual:**
- Gradiente azul (from-blue-600 to-blue-800) en todas las páginas
- Componentes con fondo semitransparente (white/10 backdrop-blur)
- Formularios con tema oscuro para mejor contraste
- Cards con altura consistente usando flexbox

---

**Última actualización:** 11 de noviembre de 2025
