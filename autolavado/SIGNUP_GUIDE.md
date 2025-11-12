# 📋 Guía de Registro y Autenticación

## Descripción General

Se ha creado un nuevo sistema completo de registro de usuarios que se integra con la autenticación existente. Las credenciales se guardan en **localStorage** para mantener la sesión activa.

## ✨ Características Implementadas

### 1. **Nueva Vista de Registro (`SignupView.vue`)**
   - Formulario completo con validación en tiempo real
   - Campos requeridos:
     - **Usuario**: Mínimo 3 caracteres, solo letras, números y guiones bajos
     - **Email**: Validación de formato
     - **Contraseña**: Mínimo 6 caracteres
     - **Confirmar Contraseña**: Debe coincidir con la contraseña
     - **Nombre Completo**: Opcional
   
   - Validaciones incluidas:
     - Validación de formato de email
     - Verificación de contraseñas coincidentes
     - Longitud mínima de contraseña
     - Formato válido de usuario

### 2. **Almacenamiento en localStorage**
   - Los datos del usuario se guardan automáticamente después del registro exitoso
   - Se guardan:
     - `idUsuario`: Identificador único del usuario
     - `idPerfil`: Tipo de perfil del usuario
     - `usuario`: Nombre de usuario
     - `email`: Email del usuario
   - Se guarda automáticamente el token JWT si el backend lo proporciona

### 3. **Integración con el Store Pinia (`auth.js`)**
   - El store `useAuthStore` gestiona:
     - Estado de sesión
     - Almacenamiento/lectura desde localStorage
     - Métodos de login y logout
     - Getters para verificar si hay sesión activa

### 4. **Rutas Actualizadas**
   - Se agregó la nueva ruta `/signup` que dirige a `SignupView.vue`
   - El link en `LoginView.vue` ahora dirige correctamente a `/signup`

## 🔧 Estructura de la Aplicación

```
src/
├── views/
│   ├── LoginView.vue        ← Login (actualizado con link a signup)
│   └── SignupView.vue       ← Nuevo: Registro de usuarios
├── stores/
│   └── auth.js              ← Store Pinia (sin cambios necesarios)
└── router/
    └── index.js             ← Router actualizado con ruta /signup
```

## 📡 Endpoints del Backend Requeridos

### 1. **Registro de Usuarios**
```
POST /api/login/signup
Body: {
  "usuario": "string",
  "email": "string",
  "password": "string",
  "nombre_completo": "string (opcional)"
}

Response exitosa (200/201): {
  "success": true,
  "idUsuario": "integer",
  "idPerfil": "integer",
  "token": "string (opcional)"
}

Response de error (409): {
  "detail": "El usuario o email ya existe"
}
```

### 2. **Login (ya existente)**
```
POST /api/login/login
Body: {
  "usuario": "string",
  "password": "string"
}

Response: {
  "success": true,
  "idUsuario": "integer",
  "idPerfil": "integer",
  "mensaje": "string"
}
```

## 💾 Flujo de Datos en localStorage

```javascript
// Lo que se guarda en localStorage:
localStorage.getItem('user')
// Retorna: {
//   "idUsuario": 123,
//   "idPerfil": 1,
//   "usuario": "john_doe",
//   "email": "john@example.com"
// }

localStorage.getItem('token')
// Retorna: "eyJhbGciOiJIUzI1NiIs..." (si el backend lo proporciona)
```

## 🔐 Validaciones del Formulario

```javascript
// Usuario
- Mínimo 3 caracteres
- Solo letras, números y guiones bajos

// Email
- Formato válido: ejemplo@dominio.com

// Contraseña
- Mínimo 6 caracteres

// Confirmación
- Debe ser idéntica a la contraseña
```

## 🎨 Estilos

- Diseño moderno con gradientes
- Animaciones suaves
- Responsive para móviles
- Colores consistentes con el tema de la aplicación
- Feedback visual para errores y éxito

## 🚀 Cómo Usar

### Para el Usuario:
1. Ir a `/signup` o hacer clic en "Registrar" desde el login
2. Completar el formulario con sus datos
3. Las validaciones mostrarán errores en tiempo real
4. Al hacer clic en "Registrarse", se envían los datos al backend
5. Si es exitoso, se guarda en localStorage y se redirige a `/inicio`

### Para el Desarrollador:

```vue
// Importar el store en cualquier componente
import { useAuthStore } from "@/stores/auth"

// Obtener datos del usuario
const authStore = useAuthStore()
console.log(authStore.user)        // Objeto con datos del usuario
console.log(authStore.isLoggedIn)  // true/false
console.log(authStore.idUsuario)   // ID del usuario

// Para cerrar sesión
authStore.logout()  // Limpia localStorage y Pinia
```

## ⚙️ Configuración Necesaria

**Backend Python** debe tener un endpoint en:
```
http://127.0.0.1:8000/api/login/signup
```

Si tu backend está en otro puerto o URL, actualiza la URL en `SignupView.vue` línea ~108:
```javascript
const response = await axios.post(
  "http://127.0.0.1:8000/api/login/signup",  // ← Cambiar aquí
  { ... }
)
```

## 📝 Notas Importantes

1. **localStorage es vulnerable**: No guardes información sensible adicional
2. **Validación del lado del servidor**: Siempre valida los datos en el backend también
3. **Token JWT**: Si tu backend usa tokens, asegúrate de que el endpoint `/api/login/signup` los retorne
4. **HTTPS en Producción**: Usa HTTPS para proteger las credenciales en tránsito

## 🐛 Resolución de Problemas

### "No puedo registrarme"
- Verifica que el backend está corriendo en `http://127.0.0.1:8000`
- Revisa la consola del navegador (F12) para ver errores específicos

### "Los datos no se guardan en localStorage"
- Asegúrate de que el backend devuelve `"success": true`
- Verifica que la respuesta incluye `idUsuario` e `idPerfil`

### "El link de registro no funciona"
- Asegúrate de que las rutas están bien definidas en `router/index.js`
- Usa `<router-link>` en lugar de `<a href>`

---

**Creado**: 11 de noviembre de 2025
