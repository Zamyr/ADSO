# Estrategia de Escalamiento Horizontal

## Implementación Actual

**Capacidad de una sola instancia:**
- 10-20 peticiones/segundo
- Connection pool: 10 conexiones concurrentes a MySQL
- API stateless (sin almacenamiento de sesiones)
- Lista para escalamiento horizontal

**Arquitectura:**
```
Cliente → Servidor Express → Base de Datos MySQL
          (Puerto 4000)       (Puerto 3306)
```

---

## Escalando a 1,000 req/seg

### 1. Capa de Aplicación

**Desplegar 100 instancias detrás de un balanceador de carga:**

```
                         ┌─> Instancia Backend 1:4000
                         ├─> Instancia Backend 2:4000
Cliente → Load Balancer  ├─> Instancia Backend 3:4000
          (NGINX/ALB)    ├─> ...
                         └─> Instancia Backend 100:4000
```

**Configuración:**
- Cada instancia: capacidad de 10 req/seg
- Total: 100 instancias × 10 = 1,000 req/seg
- Auto-scaling: CPU > 70% → agregar instancias
- Health checks: `GET /health` cada 30s

**Ejemplo de configuración NGINX:**
```nginx
upstream backend {
    least_conn;
    server backend1:4000 max_fails=3 fail_timeout=30s;
    server backend2:4000 max_fails=3 fail_timeout=30s;
    # ... 100 instancias
}

server {
    listen 80;
    
    location /api {
        proxy_pass http://backend;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

---

### 2. Capa de Base de Datos

**Configuración Master-Replica:**

```
                       ┌─> Replica Lectura 1 (peticiones GET)
Instancias Backend →   ├─> Replica Lectura 2 (peticiones GET)
                       ├─> Replica Lectura 3 (peticiones GET)
                       └─> Master (escrituras POST/PATCH)
```

**Distribución de consultas:**
- GET /api/profiles → Replicas de lectura (80% del tráfico)
- GET /api/profile/:id → Replicas de lectura (10% del tráfico)
- POST /api/profiles → Solo Master (5% del tráfico)
- PATCH /api/profile/:id → Solo Master (5% del tráfico)

**Connection Pooling:**
- 100 instancias × 10 conexiones = 1,000 conexiones totales
- Master: maneja 100-200 conexiones (escrituras)
- Cada replica: maneja 300-400 conexiones (lecturas)

**Implementación:**
```javascript
// config/database.js
const masterPool = mysql.createPool({
  host: process.env.DB_MASTER_HOST,
  connectionLimit: 10
});

const replicaPool = mysql.createPool({
  host: process.env.DB_REPLICA_HOST,
  connectionLimit: 10
});

export { masterPool, replicaPool };
```

---

### 3. Capa de Caché (Redis)

**Estrategia de caché:**

```
Cliente → Load Balancer → Backend → Caché Redis
                                   ↓ (si no existe)
                                Base de Datos MySQL
```

**Qué cachear:**
- `GET /api/profiles` → TTL: 60 segundos
- `GET /api/profile/:id` → TTL: 300 segundos (5 min)
- Invalidar en: operaciones POST, PATCH

**Impacto esperado:**
- 70% de tasa de acierto en caché
- Reduce carga de base de datos de 800 a 240 req/seg
- Tiempo de respuesta: 5ms (Redis) vs 50ms (MySQL)

**Implementación:**
```javascript
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  maxRetriesPerRequest: 3
});

async function getProfileById(id) {
  const cached = await redis.get(`profile:${id}`);
  if (cached) return JSON.parse(cached);
  
  const profile = await pool.query('SELECT * FROM profiles WHERE id = ?', [id]);
  await redis.setex(`profile:${id}`, 300, JSON.stringify(profile));
  return profile;
}
```

---

### 4. Monitoreo y Observabilidad

**Métricas a rastrear:**
- Tasa de peticiones (req/seg por instancia)
- Tiempo de respuesta (p50, p95, p99)
- Tasa de errores (respuestas 5xx)
- Uso del connection pool de base de datos
- Tasa de acierto/fallo de caché

**Herramientas:**
- **Prometheus** + Grafana para métricas
- **AWS CloudWatch** para infraestructura
- **Datadog APM** para tracing
- **PagerDuty** para alertas

**Endpoint de Health Check:**
```javascript
// routes/health.js
router.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'healthy', timestamp: new Date() });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});
```

---

### 5. Seguridad y Rate Limiting

**Capas de protección:**

```javascript
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Limitación de tasa
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // 100 peticiones por IP
  message: 'Demasiadas peticiones'
});

app.use('/api', limiter);
app.use(helmet()); // Headers de seguridad
```

**Protección contra DDoS:**
- AWS WAF o Cloudflare
- Lista blanca de IPs para endpoints de admin
- Límites de tamaño de petición (100KB máx)

---

## Estimación de Costos (AWS)

| Recurso | Especificación | Costo Mensual |
|---------|----------------|---------------|
| Instancias EC2 | t3.medium × 100 | $3,000 |
| RDS MySQL | db.r5.xlarge (Master) | $500 |
| Réplicas de Lectura RDS | db.r5.large × 3 | $750 |
| ElastiCache Redis | cache.r6g.large | $300 |
| Application Load Balancer | - | $100 |
| CloudWatch | Logs + Métricas | $150 |
| **Total** | - | **~$4,800/mes** |

---

## Benchmarks de Rendimiento

**Instancia Única (Actual):**
- Peticiones/seg: 10-20
- Tiempo de respuesta promedio: 50ms
- Tiempo de respuesta P95: 100ms

**100 Instancias + Redis (Objetivo):**
- Peticiones/seg: 1,000+
- Tiempo de respuesta promedio: 15ms (70% cacheado)
- Tiempo de respuesta P95: 80ms

---

## Plan de Migración

### Fase 1: Base de Datos (Semana 1)
1. Configurar replicación master-replica en MySQL
2. Probar separación de lectura/escritura
3. Actualizar configuración del connection pool

### Fase 2: Caché (Semana 2)
4. Desplegar cluster de Redis
5. Implementar capa de caché
6. Monitorear tasa de acierto de caché

### Fase 3: Load Balancer (Semana 3)
7. Configurar NGINX/ALB
8. Desplegar 10 instancias para pruebas
9. Ejecutar pruebas de carga (Artillery/k6)

### Fase 4: Auto-scaling (Semana 4)
10. Configurar reglas de auto-scaling
11. Configurar dashboards de monitoreo
12. Despliegue a producción

---

## Preguntas para Product Owners

1. **Patrones de Tráfico:** ¿Cuáles son las horas pico? ¿Necesitamos capacidad de ráfaga?
2. **Crecimiento de Datos:** ¿Tasa esperada de creación de perfiles? ¿Necesidades de almacenamiento?
3. **Distribución Geográfica:** ¿Necesitamos despliegue multi-región?
4. **Requisitos de SLA:** ¿Uptime objetivo? (99.9% = 43 min de caída/mes)
5. **Restricciones de Presupuesto:** ¿Cuál es el costo de infraestructura aceptable?
6. **Cumplimiento:** ¿Requisitos de residencia de datos (GDPR, CCPA)?

---

## Selección de Tecnologías

### ¿Por qué NGINX sobre AWS ALB?
- **Pros:** Menor costo, más control, mejor rendimiento
- **Contras:** Requiere administración, sin integración nativa con AWS
- **Decisión:** Usar ALB por simplicidad, cambiar a NGINX si el costo se vuelve problema

### ¿Por qué Redis sobre Memcached?
- **Pros:** Persistencia, estructuras de datos, pub/sub
- **Contras:** Mayor uso de memoria
- **Decisión:** Redis por flexibilidad en características futuras

### ¿Por qué MySQL sobre PostgreSQL?
- **Ya implementado:** Costo de migración muy alto
- **Rendimiento:** Suficiente para el caso de uso
- **Decisión:** Mantener MySQL, optimizar con índices y réplicas

---

## Mejoras Futuras

1. **API GraphQL:** Reducir sobre-fetching para clientes móviles
2. **Actualizaciones Event-Driven:** Usar Kafka para notificaciones de cambios de perfil
3. **Integración CDN:** Cachear imágenes estáticas de perfil (si se agregan)
4. **Sharding de Base de Datos:** Dividir perfiles por rangos de user_id (si > 100M usuarios)
5. **Service Mesh:** Implementar Istio para gestión avanzada de tráfico
