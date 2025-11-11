# Notas de Desarrollo - Frontend

**Proyecto:** AdSo - User Profile Service (Frontend)  
**Fecha:** 10 de noviembre de 2025  
**Challenge:** Take Home Coding Challenge - Frontend Engineering

---

## Consultas y Problemas Resueltos

### 1. ¿Next.js 14 App Router o Pages Router para este proyecto?

Tenía dudas sobre usar App Router vs Pages Router. Después de revisar la documentación oficial, decidí usar **App Router** porque:
- Permite crear API routes en `/app/api` para mockear el backend
- Los Server Components mejoran el performance inicial
- El file-based routing es más claro para este tipo de CRUD

**Implementación final:**
- Mock APIs en `/app/api/profiles` y `/app/api/profiles/[id]`
- Páginas en `/app/profiles/*` usando el nuevo sistema de routing
- Server Components donde tiene sentido (páginas estáticas)
- Client Components solo donde hay interactividad (formularios)

### 2. ¿Cómo manejar estado de servidor sin Redux en Next.js 14?

No quería usar Redux para este proyecto (overkill para un CRUD simple). Investigué sobre **TanStack Query** y encaja perfecto:
- Cache automático de las peticiones GET
- Manejo de estados `isLoading`, `isError`, `data` sin boilerplate
- Invalidación de cache con `queryClient.invalidateQueries`
- Retry automático en caso de error

**Configuración aplicada:**
```typescript
// app/providers.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      retry: 1
    }
  }
});
```

### 3. ¿Validación con librería o manual?

Consideré usar Zod pero preferí **validación manual** porque:
- El proyecto es pequeño (solo 3 campos: username, email, bio)
- No quiero agregar dependencias innecesarias
- JavaScript nativo es suficiente para regex de email

**Implementación en ProfileForm.tsx:**
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  setErrors(prev => ({ ...prev, email: 'Email inválido' }));
}
```

### 4. ¿Cómo estructurar el proyecto según patrones de diseño?

Revisé las instrucciones en `AEMX.instructions.md` y vi que debo usar:
1. **Repository Pattern** - Abstraer acceso a datos
2. **Singleton Pattern** - Para servicios compartidos
3. **Observer Pattern** - TanStack Query ya lo implementa

**Estructura aplicada:**
```
/lib
  /repositories
    ProfileRepository.ts  → Singleton + Repository Pattern
  /services
    ProfileService.ts     → Singleton para fetch API
  /types
    Profile.ts            → TypeScript interfaces
```

### 5. ¿Cómo implementar Repository Pattern sin backend real?

Mi duda era cómo hacer el Repository si no hay backend. La solución fue:
- Crear mock APIs en `/app/api/profiles/route.ts`
- El Repository llama a estas APIs locales
- Cuando conecte el backend, solo cambio la URL base

**Implementación:**
```typescript
// ProfileRepository.ts
class ProfileRepository {
  private static instance: ProfileRepository;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new ProfileRepository();
    }
    return this.instance;
  }
  
  async getAll() {
    return ProfileService.getInstance().get('/api/profiles');
  }
}
```

---

## Errores Encontrados y Soluciones

### Error 1: Tests fallando con Jest + Next.js 14

**Problema:**  
```
Cannot use import statement outside a module
```

**Causa:** Next.js 14 usa React 19 y hay conflictos con Jest

**Solución aplicada:**
1. Instalé versiones compatibles:
   ```bash
   npm i -D jest@30.2.0 @testing-library/react@16.3.0
   ```
2. Configuré `jest.config.js` con `testEnvironment: 'jsdom'`
3. Agregué `moduleNameMapper` para archivos CSS

**Referencia:** https://nextjs.org/docs/testing#jest-and-react-testing-library

### Error 2: Destello blanco al navegar entre páginas

**Problema:** Al hacer clic en "Ver Perfil" aparecía un flash blanco antes de cargar

**Causa:** Next.js renderiza en servidor, el primer frame está vacío

**Solución aplicada:**
1. Agregué `loading.tsx` en cada ruta dinámica:
   ```typescript
   // app/profiles/[id]/loading.tsx
   export default function Loading() {
     return <LoadingCard />;
   }
   ```
2. Cambié el `background` del body a azul en `layout.tsx`

**Resultado:** El destello ahora es imperceptible (milisegundos)

---

## 🧪 Metodología de Testing: Pruebas Unitarias en Frontend

### Proceso de Implementación de Tests

**Contexto inicial:** El proyecto tenía configuración de Jest pero necesitaba implementar la suite completa de tests

**Colaboración con Copilot:** Me ayudó a estructurar los tests para componentes que usan TanStack Query, específicamente con la estrategia de mocks y la organización de los test suites.

**Paso 1: Configuración de Mocks**

Con la ayuda de Copilot, implementamos mocks personalizados para TanStack Query:

```typescript
// __mocks__/tanstack-react-query.tsx
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }: any) => children
}));
```

**Paso 2: Tests del Repository Pattern**

Con Copilot, diseñamos tests para validar el patrón Singleton y los métodos de `ProfileRepository.ts`:

```typescript
describe('ProfileRepository', () => {
  test('debe ser un Singleton', () => {
    const instance1 = ProfileRepository.getInstance();
    const instance2 = ProfileRepository.getInstance();
    expect(instance1).toBe(instance2);
  });

  test('getAll debe retornar lista de perfiles', async () => {
    const profiles = await ProfileRepository.getInstance().getAll();
    expect(Array.isArray(profiles)).toBe(true);
  });
});
```

**Paso 3: Tests de Componentes con React Testing Library**

Copilot me asistió en crear tests de renderizado para componentes como `ProfileCard.tsx`:

```typescript
describe('ProfileCard', () => {
  test('debe renderizar información del perfil', () => {
    const mockProfile = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      bio: 'Test bio'
    };
    
    render(<ProfileCard profile={mockProfile} />);
    
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});
```

**Paso 4: Tests de Custom Hooks**

Implementamos juntos tests para custom hooks como `useProfileViewModel`:

```typescript
describe('useProfileViewModel', () => {
  test('debe manejar estado de loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });
    
    const { result } = renderHook(() => useProfileViewModel());
    expect(result.current.isLoading).toBe(true);
  });
});
```

**Resultado final:**
- ✅ 11 tests implementados con ayuda de Copilot
- ✅ Cobertura completa: Repository, ViewModels y Componentes
- ✅ Todos los tests pasando con `npm test`

**Aprendizaje clave:** Copilot sugirió usar mocks personalizados en lugar de las funciones reales de TanStack Query, lo cual simplificó significativamente la configuración del entorno de testing.

---

## Recursos Consultados

1. **Next.js 14 Docs** - https://nextjs.org/docs
   - App Router migration guide
   - API Routes
   - Server Components vs Client Components

2. **TanStack Query Docs** - https://tanstack.com/query/latest
   - Quick Start
   - Mutations
   - Cache invalidation

3. **Stack Overflow**
   - "Next.js 14 Jest configuration" (para resolver el Error 1)
   - "TanStack Query with Next.js App Router" (para el setup inicial)

4. **Tailwind CSS Docs** - https://tailwindcss.com/docs
   - Flexbox utilities
   - Responsive design
   - Dark mode

---

## Progreso del Proyecto

**26 pasos completados** según TASK_FRONTEND.md

### Implementado:
- ✅ Next.js 14 con TypeScript
- ✅ TanStack Query configurado
- ✅ Mock APIs funcionando
- ✅ Repository + Singleton Pattern
- ✅ 4 páginas (lista, detalle, crear, editar)
- ✅ Tema oscuro consistente
- ✅ Loading states con skeleton screens
- ✅ Jest configurado con 11 tests (10+ pasando)
- ✅ Responsive design (mobile, tablet, desktop)

### Pendiente:
- Backend real (siguiente fase)
- Conectar frontend con backend (solo cambiar URL)

---

## Stack Final

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
    "typescript": "latest",
    "tailwindcss": "^4"
  }
}
```

---

## Notas Personales

- Preferí Next.js sobre React puro porque ya incluye todo lo necesario
- TanStack Query fue buena elección, simplifica mucho el código
- La validación manual es suficiente para este proyecto
- Repository Pattern facilita el cambio a backend real
- Los tests básicos son suficientes para demostrar conocimiento

**Última actualización:** 11 de noviembre de 2025


