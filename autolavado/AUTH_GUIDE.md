# 📱 Guía de Autenticación con localStorage

## 🎯 Resumen

Se han actualizado las vistas de **LoginView** y **SignupView** para funcionar completamente con **localStorage**, sin necesidad de backend. Todos los datos de usuarios se guardan localmente en el navegador.

---

## ✨ Características Implementadas

### 1. **Registro de Usuarios (SignupView.vue)**

**Flujo de registro:**
1. El usuario ingresa sus datos (usuario, email, contraseña, etc.)
2. Se validan los datos en el cliente
3. Se verifica que el usuario y email NO existan ya
4. Se crea un nuevo usuario con un ID único
5. Se guarda en localStorage bajo la clave `"usuarios"` (array JSON)
6. Se hace login automático
7. Se redirige a `/inicio`

**Validaciones:**
- ✅ Usuario: Mínimo 3 caracteres, sin caracteres especiales
- ✅ Email: Formato válido y único
- ✅ Contraseña: Mínimo 6 caracteres
- ✅ Confirmación: Debe coincidir
- ✅ Duplicidad: No permite usuarios o emails duplicados

**Datos guardados en localStorage:**
```javascript
{
  "usuarios": [
    {
      "idUsuario": 1,
      "idPerfil": 1,
      "usuario": "john_doe",
      "email": "john@example.com",
      "password": "password123",
      "fullName": "John Doe",
      "fechaRegistro": "2025-11-11T10:30:00.000Z"
    }
  ]
}
```

---

### 2. **Login de Usuarios (LoginView.vue)**

**Flujo de login:**
1. El usuario ingresa su usuario y contraseña
2. Se busca en localStorage si existe un usuario con esas credenciales
3. Si existe y la contraseña es correcta → Login exitoso
4. Se guarda el usuario actual en el store Pinia
5. Se redirige a `/inicio`
6. Si no existe o la contraseña es incorrecta → Mostrar error

---

### 3. **Almacenamiento en localStorage**

**Ubicación:** `window.localStorage`

**Clave usuarios:** `"usuarios"` (contiene array de todos los usuarios registrados)

**Clave usuario actual:** En el store Pinia, se guarda:
```javascript
localStorage.getItem('user') 
// Retorna el usuario logeado actualmente
```

---

## 🔄 Estructura de Datos

### Array de usuarios registrados
```json
{
  "usuarios": [
    {
      "idUsuario": 1,
      "idPerfil": 1,
      "usuario": "usuario1",
      "email": "usuario1@example.com",
      "password": "pass123",
      "fullName": "Nombre Usuario 1",
      "fechaRegistro": "2025-11-11T10:30:00.000Z"
    },
    {
      "idUsuario": 2,
      "idPerfil": 1,
      "usuario": "usuario2",
      "email": "usuario2@example.com",
      "password": "pass456",
      "fullName": "Nombre Usuario 2",
      "fechaRegistro": "2025-11-11T11:00:00.000Z"
    }
  ]
}
```

### Usuario actual logeado (en Pinia store)
```json
{
  "user": {
    "idUsuario": 1,
    "idPerfil": 1,
    "usuario": "usuario1",
    "email": "usuario1@example.com"
  }
}
```

---

## 🚀 Cómo Usar

### Para el Usuario Final:

**Registro:**
1. Haz clic en "Registrar" en LoginView
2. Completa el formulario
3. Haz clic en "Registrarse"
4. Se redirige automáticamente a `/inicio` con sesión iniciada

**Login:**
1. Ingresa tu usuario y contraseña
2. Haz clic en "Entrar"
3. Si son correctos, se redirige a `/inicio`

### Para el Desarrollador:

**Obtener datos del usuario actual:**
```javascript
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()
console.log(authStore.user)        // Objeto con datos del usuario
console.log(authStore.isLoggedIn)  // true/false
console.log(authStore.idUsuario)   // ID del usuario
```

**Obtener lista de TODOS los usuarios registrados:**
```javascript
const usuariosJSON = localStorage.getItem("usuarios")
const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : []
console.log(usuarios)  // Array de todos los usuarios
```

**Cerrar sesión:**
```javascript
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()
authStore.logout()  // Limpia localStorage y Pinia
```

**Buscar un usuario específico:**
```javascript
const usuariosJSON = localStorage.getItem("usuarios")
const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : []

const usuarioEncontrado = usuarios.find(u => u.usuario === "john_doe")
console.log(usuarioEncontrado)
```

---

## 📋 Ver Usuarios Registrados en el Navegador

**Opción 1: Por consola (F12)**
```javascript
// Abre la consola del navegador (F12) y ejecuta:
JSON.parse(localStorage.getItem("usuarios"))
```

**Opción 2: Aplicación > Storage (DevTools)**
1. Abre DevTools (F12)
2. Ve a la pestaña "Application" o "Storage"
3. En el menú izquierdo, ve a "Local Storage"
4. Selecciona tu dominio (http://localhost:8080)
5. Busca la clave `"usuarios"`

---

## ⚡ Características de los Componentes

### LoginView.vue
- ✅ Validación de credenciales locales
- ✅ Búsqueda de usuarios en localStorage
- ✅ Manejo de errores claros
- ✅ Delay simulado (800ms) para UX realista
- ✅ Link a SignupView

### SignupView.vue
- ✅ Validación en tiempo real
- ✅ Verificación de duplicidad (usuario y email)
- ✅ Generación automática de ID
- ✅ Guardado en localStorage
- ✅ Login automático después del registro
- ✅ Fecha de registro automática
- ✅ Diseño moderno y responsivo

---

## 🔐 Notas Importantes

⚠️ **Sobre la seguridad:**
- Las contraseñas se guardan en TEXTO PLANO en localStorage (NO recomendado para producción)
- Para producción: Implementar hashing de contraseñas
- localStorage es accesible desde cualquier script en la página

⚠️ **Límites de localStorage:**
- Máximo ~5-10 MB por origen
- Los datos persisten hasta que el usuario limpie el navegador
- Sincrónico (puede ralentizar la app con muchos datos)

✅ **Buenas prácticas aplicadas:**
- Validación de datos en cliente
- Duplicidad prevención
- IDs únicos incrementales
- Timestamps de registro
- Estructura de datos organizada

---

## 🧪 Test

**Caso 1: Registro exitoso**
```
1. Ir a /signup
2. Usuario: "test_user"
3. Email: "test@example.com"
4. Contraseña: "123456"
5. Confirmar: "123456"
6. Click "Registrarse"
→ Debería redirigir a /inicio con sesión activa
```

**Caso 2: Login exitoso**
```
1. Ir a /login
2. Usuario: "test_user"
3. Contraseña: "123456"
4. Click "Entrar"
→ Debería redirigir a /inicio
```

**Caso 3: Registro duplicado**
```
1. Intentar registrar con usuario "test_user" nuevamente
→ Debería mostrar error "Este usuario ya existe"
```

**Caso 4: Login incorrecto**
```
1. Ir a /login
2. Usuario: "test_user"
3. Contraseña: "000000"
4. Click "Entrar"
→ Debería mostrar error "Usuario o contraseña incorrectos"
```

---

## 📁 Archivos Modificados

- `src/views/LoginView.vue` - Actualizado para usar localStorage
- `src/views/SignupView.vue` - Actualizado para usar localStorage
- `src/router/index.js` - Ruta `/signup` agregada
- `src/stores/auth.js` - Sin cambios (ya soporta localStorage)

---

**Versión:** 1.0 - Sin Backend  
**Fecha:** 11 de noviembre de 2025
