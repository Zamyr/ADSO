# Frontend - AdSo User Profile Management

Interfaz de usuario para gestión de perfiles de usuario construida con Next.js 14, TypeScript y TanStack Query.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Estado del Servidor:** TanStack Query (React Query)
- **Testing:** Jest + React Testing Library
- **Patrones:** Repository Pattern, Singleton Pattern

## 📋 Prerrequisitos

- Node.js 18+ (recomendado: v20 o v22)
- npm 10+

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Zamyr/ADSO.git
cd ADSO/frontend

# Instalar dependencias
npm install
```

## 🏃 Ejecución

### Opción 1: Desarrollo Local (⚡ Recomendado)
```bash
# Asegúrate de que el backend esté corriendo en Docker
cd ../
docker compose up --scale backend=3 -d

# Luego inicia el frontend en desarrollo
cd frontend
npm install  # Solo la primera vez
npm run dev
```
La aplicación estará disponible en: `http://localhost:3000`

**Ventajas:**
- ⚡ Hot reload instantáneo
- 🚀 Compilación mucho más rápida
- 💻 Menor consumo de recursos

**Nota:** El frontend se conecta al backend en `http://localhost:8080/api` (configurado en `.env.local`)

---

### Opción 2: Todo en Docker
```bash
# Desde la raíz del proyecto
docker compose up --scale backend=3 -d
```

⚠️ **Advertencia:** Next.js en modo desarrollo dentro de Docker consume **muchos recursos** (CPU y RAM) y es significativamente más lento. Esta opción es útil para testing rápido o demos, pero **NO recomendada para desarrollo activo**.

---

### Modo Producción
```bash
# Construir la aplicación
npm run build

# Iniciar servidor de producción
npm start
```

### Ejecutar Tests
```bash
# Ejecutar todos los tests
npm test

# Modo watch (desarrollo)
npm run test:watch

# Con cobertura
npm run test:coverage
```

## 🎨 Características

### Páginas Implementadas

1. **Home (`/`)**: Página de bienvenida con tema oscuro
2. **Lista de Perfiles (`/profiles`)**: Grid responsive de perfiles
3. **Detalle de Perfil (`/profiles/[id]`)**: Vista completa
4. **Crear Perfil (`/profiles/create`)**: Formulario de creación
5. **Editar Perfil (`/profiles/[id]/edit`)**: Formulario de edición

### Funcionalidades

- ✅ CRUD completo de perfiles
- ✅ Validación de formularios (manual)
- ✅ Estados de carga con skeleton screens
- ✅ Manejo de errores con retry
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Tema oscuro consistente
- ✅ Cards con altura uniforme
- ✅ Mock APIs integradas
- ✅ Tests unitarios (11 tests)
- ✅ Transiciones suaves entre páginas

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Modo watch
npm run test:watch

# Cobertura
npm run test:coverage
```

**Tests implementados:**
- ProfileCard: 4 tests (rendering, formateo de fechas, bio opcional, enlaces)
- ProfileForm: 7 tests (validaciones, submit, errores, estados)
- **Total:** 11 tests, 10+ pasando

## 🏗️ Arquitectura

### Patrones Implementados

- **Repository Pattern**: Abstracción de acceso a datos
- **Singleton Pattern**: Services y Repositories
- **Observer Pattern**: TanStack Query (automático)

### Estructura

```
UI → TanStack Query → Service → Repository → API
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 👥 Autor

**Zamyr** - [GitHub](https://github.com/Zamyr)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
